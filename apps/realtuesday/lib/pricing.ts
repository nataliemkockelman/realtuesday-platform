/**
 * Pricing data — single source of truth for the /pricing page.
 *
 * Copy is verbatim from docs/site-copy-v2.md (PRICING section). The page maps
 * over PRICING_SECTIONS and renders each tier through <PricingTier />, so the
 * tiers are data, not hardcoded blocks.
 */

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  /** Small meta line under the price (audit only). */
  subline?: string;
  /** Bullet list of what's included (audit only). */
  bullets?: string[];
}

export interface PricingSection {
  id: string;
  /** H2 for the section. */
  heading: string;
  /** Intro paragraph(s) above the tiers. */
  body?: string[];
  tiers: PricingTier[];
  /** Trailing note paragraph under the tiers. */
  note?: string;
  /** Graphics-spec slot id, if the section carries an image (audit = IMG-08). */
  imageSlot?: string;
  /** Optional section-level CTA. */
  cta?: { label: string; href: string };
}

export const PRICING_SECTIONS: PricingSection[] = [
  {
    id: 'audit',
    heading: 'start with the audit.',
    body: [
      'Two weeks. We go into your operation and come back with a map: where the manual work actually lives, what it\u2019s costing you in hours and dollars, and what\u2019s worth automating first — ranked, with a build estimate on each one.',
      'You get the document either way. You\u2019re not committing to anything past it.',
    ],
    tiers: [
      {
        name: 'operations audit',
        price: 'from $2,500',
        subline: 'two weeks · fixed scope · full fee credited toward any build you approve',
        description: '',
        bullets: [
          'process map of where the time goes',
          'cost of the manual work, in hours and dollars',
          'ranked list of what to fix first',
          'build estimate on each recommendation',
          'a walkthrough call, not just a PDF',
        ],
      },
    ],
    imageSlot: 'IMG-08',
    cta: { label: 'book an audit →', href: '/contact' },
  },
  {
    id: 'builds',
    heading: 'then we build it.',
    tiers: [
      {
        name: 'single workflow',
        price: '$3,500–7,500',
        description:
          'One process, end to end. Two systems that don\u2019t talk, now talking. The report that took four hours a month now takes zero.',
      },
      {
        name: 'multi-system build',
        price: '$8,000–18,000',
        description:
          'Several processes connected. Integrations across your stack, a reporting layer that pulls from all of it, dashboards your team actually opens.',
      },
      {
        name: 'custom platform',
        price: '$20,000–45,000',
        description:
          'An application, not an automation. Client portals, internal tools, intake systems — real authentication, real database, payments if you need them.',
      },
    ],
    note: 'Every build includes documentation, a working handoff, and thirty days of support after launch. We don\u2019t disappear at go-live.',
  },
  {
    id: 'sales-systems',
    heading: 'and if the problem is pipeline.',
    body: [
      'Josh runs this side. Most companies don\u2019t have a sales problem, they have a sales process problem — no framework, no consistent tracking, and no idea which stage things die in.',
    ],
    tiers: [
      {
        name: 'sales framework',
        price: '$3,000–6,000',
        description:
          'The process itself. Stages, criteria, handoffs, what \u201cqualified\u201d actually means at your company.',
      },
      {
        name: 'sales tracking & automation',
        price: '$4,000–9,000',
        description: 'The measurement layer underneath it. Built by Natalie, designed by Josh.',
      },
      {
        name: 'fractional sales',
        price: '$3,000–6,000/mo',
        description: 'Josh embedded with your team. Pipeline, coaching, and the deals themselves.',
      },
    ],
  },
  {
    id: 'websites',
    heading: 'and if you just need a site.',
    tiers: [
      {
        name: 'marketing site',
        price: '$1,500–3,000',
        description: 'Up to five pages. Fast, and editable by you.',
      },
      {
        name: 'site with a CMS',
        price: '$5,000–10,000',
        description:
          'Content you control, integrations to your existing tools, structured so it can grow.',
      },
    ],
    note: 'If it needs logins, payments, or a database behind it, that\u2019s a platform build.',
  },
  {
    id: 'training',
    heading: 'or we teach your team to do it.',
    tiers: [
      {
        name: '1-on-1 session',
        price: '$450',
        description: 'Ninety minutes, one person, your actual workflows. Three-session pack, $1,200.',
      },
      {
        name: 'team masterclass',
        price: '$1,500–2,500',
        description: 'Live, for your whole team, built around how your company actually works.',
      },
      {
        name: 'custom skills',
        price: 'from $1,500',
        description:
          'We build reusable tools trained on your process, your templates, your standards. Your team runs them.',
      },
    ],
  },
  {
    id: 'ongoing',
    heading: 'or keep us on.',
    tiers: [
      {
        name: 'care & maintenance',
        price: '$500–1,500/mo',
        description:
          'For what we\u2019ve already built. Hosting, monitoring, small changes, someone to call.',
      },
      {
        name: 'fractional ops',
        price: '$2,000–3,500/mo',
        description:
          'Roughly 10–15 hours. Ongoing automation, reporting, and the next thing on your audit list.',
      },
      {
        name: 'embedded ops',
        price: '$4,000–7,500/mo',
        description: 'Roughly 25–40 hours. Functionally your operations lead.',
      },
    ],
    note: 'Every retainer has defined hours and scope, in writing. Past it, $175/hour. Ten percent off if you prepay the year. No surprises in either direction.',
  },
];

export interface PricingFaq {
  question: string;
  answer: string;
}

export const PRICING_FAQ: PricingFaq[] = [
  {
    question: 'why does the audit cost money?',
    answer:
      'Because free work gets treated like free advice. It\u2019s a real deliverable that stands on its own — plenty of people take it and implement it themselves. If you build with us, the fee comes off the top.',
  },
  {
    question: 'can you just give me a quote?',
    answer:
      'Not an honest one. Every operation we\u2019ve walked into had a different problem than the one described on the intro call. The audit exists so the number we give you is real.',
  },
  {
    question: 'what if it\u2019s more than I can spend?',
    answer:
      'Then we cut scope, not price. We\u2019d rather build the one thing that matters than a discounted version of everything.',
  },
  {
    question: 'do you work with our existing tools?',
    answer:
      'Usually. We build around what you already pay for. Rip-and-replace is expensive and your team hates it.',
  },
  {
    question: 'who actually does the work?',
    answer:
      'Us. Natalie builds, Josh runs the sales side, and that\u2019s the entire company. No account manager, no junior handoff, no offshore team.',
  },
  {
    question: 'how fast can you start?',
    answer: 'Depends what\u2019s in front of us. Ask.',
  },
];
