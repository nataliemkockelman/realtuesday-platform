---
title: open the hood.
slug: notes-from-a-tuesday-06
issue: 06
issueLabel: Issue 06 · June 2026
deck: What "a fleet of AI agents" actually means once you stop selling it and start running it.
readingTime: 3 min read
publishedAt: 2026-06-16
byline: real Tuesday
---

## the brochure version.

"A fleet of AI agents." It sounds like a control room. Rows of little digital workers humming away, running your business while you sleep. It's a great line for a pitch deck, and it's doing a lot of quiet lying.

Let me tell you what's usually under the hood.

## what an agent actually is.

Strip the branding and an agent is a loop. It takes an instruction, calls a model, maybe reaches for a tool or two (search this, write to that, hit this API), looks at what came back, and decides whether it's finished or needs another pass. That's the whole thing. A loop with a little judgment bolted on.

A "fleet" is several of those loops, sometimes handing work to each other. One drafts, one checks, one files. It can be genuinely useful. It is not a robot workforce, and running it as if it were will cost you.

> An agent is a loop that can make decisions and use tools. Powerful, worth having, and nothing like the humming control room in the demo.

## where it gets real.

The moment you open the hood, the questions stop being futuristic and turn boringly operational.

What does it do when the tool it needs is down. What happens when it's confidently wrong, which it will be, and no human is in the loop to catch it. Who sees the bill when one of your little workers gets stuck and calls the model four thousand times in an afternoon. Where do the logs go when something breaks at 2am and you need to know what it actually did.

None of that shows up in the sizzle reel. All of it shows up in month two.

## the part that decides whether it works.

Here's what I've learned watching these things live and die. The model is the easy part. The hard part is everything around the loop: the guardrails, the place it's allowed to write to, the human checkpoint at the step that actually matters, the alarm when it goes sideways.

A good agent setup looks less like a sci-fi crew and more like a well-run kitchen. Clear stations, obvious handoffs, somebody tasting the food before it leaves. The magic isn't that a machine can cook. It's that it can cook the same dish, at the same quality, on an ordinary Tuesday, without burning the place down.

So when someone sells you a fleet, open the hood before you sign. Ask what each agent does when it fails. Ask where the human sits. If the answer is a shrug and another slide about the future, you're not buying an operation. You're buying a demo with a lot of moving parts to go wrong.

The agents are real. The fleet is real. Just make sure yours has brakes before you take your hands off the wheel.
