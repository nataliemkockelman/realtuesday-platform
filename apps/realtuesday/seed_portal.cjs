// One-off: probe the portal Supabase DB and, if ready, seed a demo client + login.
// Safe to re-run (idempotent-ish). Uses service_role (bypasses RLS).
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envPath = '.env.local';
const env = Object.fromEntries(
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing SUPABASE URL or SERVICE_ROLE key in', envPath); process.exit(1); }

const db = createClient(url, key, { auth: { persistSession: false } });

const LOGIN_EMAIL = 'preview@arealtuesday.com';
const LOGIN_PASSWORD = 'Preview-RT-2026!';

(async () => {
  console.log('== Supabase host:', url.replace(/^https?:\/\//, '').split('.')[0]);

  // 1) Probe required tables
  const tables = ['clients', 'engagements', 'tasks', 'invoices', 'portal_users', 'portal_invites'];
  const missing = [];
  for (const t of tables) {
    const { error } = await db.from(t).select('id', { count: 'exact', head: true });
    if (error) missing.push(`${t} (${error.message})`);
  }
  if (missing.length) {
    console.log('\nSCHEMA NOT READY. Missing/unreadable tables:');
    missing.forEach((m) => console.log('  -', m));
    console.log('\n=> Need to run supabase/schema.sql then supabase/portal.sql in the SQL editor.');
    process.exit(2);
  }
  console.log('All portal tables exist. Seeding demo client + login...');

  // 2) Client (idempotent by email)
  let { data: client } = await db.from('clients').select('id').eq('email', LOGIN_EMAIL).maybeSingle();
  if (!client) {
    ({ data: client } = await db.from('clients')
      .insert({ name: 'Jordan Avery', company: 'Northwind Studio (demo)', email: LOGIN_EMAIL, status: 'active' })
      .select('id').single());
    console.log('  + created client', client.id);
  } else {
    console.log('  = client exists', client.id);
  }

  // 3) Engagement + tasks + invoice (only if none yet)
  const { data: engs } = await db.from('engagements').select('id').eq('client_id', client.id).limit(1);
  if (!engs || !engs.length) {
    const { data: eng } = await db.from('engagements').insert({
      client_id: client.id,
      name: 'Website & Brand Ops System',
      status: 'active',
      billing_type: 'fixed',
      quoted_amount_cents: 1800000,
      quoted_hours: 120,
      started_at: '2026-06-15',
    }).select('id').single();
    console.log('  + engagement', eng.id);

    await db.from('tasks').insert([
      { engagement_id: eng.id, title: 'Discovery workshop + brand audit', status: 'done', due_date: '2026-06-20' },
      { engagement_id: eng.id, title: 'Information architecture + wireframes', status: 'in_progress', due_date: '2026-08-05' },
      { engagement_id: eng.id, title: 'Build client portal + admin', status: 'todo', due_date: '2026-08-20' },
    ]);
    console.log('  + 3 tasks');

    await db.from('invoices').insert({
      client_id: client.id,
      engagement_id: eng.id,
      number: 'RT-0001',
      status: 'sent',
      amount_cents: 600000,
      issued_on: '2026-07-01',
      due_on: '2026-07-15',
    });
    console.log('  + invoice RT-0001 (sent)');
  } else {
    console.log('  = engagement/data already seeded');
  }

  // 4) Auth user (create pre-confirmed, or reset password if exists)
  let userId;
  const created = await db.auth.admin.createUser({ email: LOGIN_EMAIL, password: LOGIN_PASSWORD, email_confirm: true });
  if (created.error) {
    const { data: list } = await db.auth.admin.listUsers();
    const u = list.users.find((x) => (x.email || '').toLowerCase() === LOGIN_EMAIL);
    if (!u) { console.error('  ! could not create or find auth user:', created.error.message); process.exit(3); }
    userId = u.id;
    await db.auth.admin.updateUserById(userId, { password: LOGIN_PASSWORD, email_confirm: true });
    console.log('  = auth user exists, password reset', userId);
  } else {
    userId = created.data.user.id;
    console.log('  + auth user created', userId);
  }

  // 5) Link user -> client
  await db.from('portal_users').upsert({ user_id: userId, client_id: client.id }, { onConflict: 'user_id' });
  console.log('  + linked portal_users');

  console.log('\n================ CLIENT LOGIN READY ================');
  console.log('  URL:      http://localhost:3001/portal/login');
  console.log('  Email:    ' + LOGIN_EMAIL);
  console.log('  Password: ' + LOGIN_PASSWORD);
  console.log('====================================================');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
