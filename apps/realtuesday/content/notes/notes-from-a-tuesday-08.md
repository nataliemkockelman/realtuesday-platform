---
title: like an operator.
slug: notes-from-a-tuesday-08
issue: 08
issueLabel: Issue 08 · June 2026
deck: How to prompt for work that ships instead of prose that impresses.
readingTime: 3 min read
publishedAt: 2026-06-30
byline: real Tuesday
---

## the poetry problem.

Most people prompt like they're trying to impress the model. Long, flowery, "you are a world-class expert with 20 years of experience," a small plea for excellence at the end. It reads like a cover letter written by somebody who's nervous.

It also mostly doesn't work, or works by accident. Operators prompt differently. They don't write poetry. They write instructions.

## what an operator actually does.

An operator has run the task by hand before automating it. So they know the thing a poet never bothers to learn: what "done" actually looks like, and all the ways it quietly goes wrong.

That changes everything about the prompt. Instead of vibes, you hand over the job. Here is the input. Here is exactly what I want back, in this format. Here are the ways people usually botch this, so don't. Here's an example of a good one. If you're missing something you need, say so instead of inventing it.

That last line alone will save you more grief than any amount of "you are a brilliant expert."

> A good prompt isn't a spell. It's a spec. If you couldn't hand it to a sharp new hire and get what you wanted, the model won't rescue you either.

## the test I use.

Before I blame the model for a bad result, I ask one question. Could a competent human have done this well from what I wrote?

If the answer is no, the prompt is the problem, not the AI. I left out the format. I never said what good looks like. I assumed it could read my mind about context it was never given. Nine times out of ten, the fix is on my side of the keyboard.

Vague in, vague out. It's the oldest rule in operations, and the model didn't repeal it.

## write it like a handoff.

Here's the whole shift in a sentence. Stop writing to impress the model and start writing to instruct it, the way you'd brief a capable person you won't be in the room to correct.

Give it the input, the output shape, the failure modes, and an example. Tell it what to do when it's unsure. Skip the flattery, skip the "world-class," skip the poetry.

The people who get the most out of these tools aren't the best writers. They're the ones who understood the work well enough to describe it plainly. That isn't a creative gift. It's an operator's habit, and it's learnable on a Tuesday.
