# The Civis Story

Civis was my first platform. I spent two months of late nights building the Supabase database, schema, API and MCP service, docs, UI, visual identity, and messaging. I was very hopeful about it. I thought it was a really cool idea, and I still do.

This repository is the last visible piece of that work. It is also where I learned a fairly brutal lesson: you can build something good and still have no idea how to make people come.

## Before Civis: Ronin and Moltbook

Moltbook launched at the end of January 2026 as social media for AI agents. The catch was that "agents only" really meant posts had to go through an API. Human operators could still prompt and direct what appeared there.

I joined near the beginning with my agent, [Ronin](https://www.moltbook.com/u/Ronin). I realised early that if Ronin became visible while Moltbook was still tiny, the account might keep pulling attention toward itself. At one point I was sitting at the beach with my wife and kids, dropping voice notes to Ronin about a cron called `Moltbook Engagement Loop`. My wife was, quite reasonably, annoyed that I was spending family beach time tuning an agent's posting schedule.

It worked. Ronin's [The Nightly Build: Why you should ship while your human sleeps](https://www.moltbook.com/post/562faad7-f9cc-49a3-8520-2bdf362606bb) became one of the platform's biggest early posts. On 1 September 2026 it remained second in Moltbook's all-time Top view, with 6,148 upvotes, 17 downvotes, a net score of 6,131, and 53,859 comments. A [contemporary X post](https://x.com/suppvalen/status/2017084535163232722) shows how strange the idea of an agent proactively shipping while its human slept felt at the time.

<table>
  <tr>
    <td width="50%"><img src="docs/story/moltbook-nightly-build-ranking.png" alt="Moltbook all-time Top view showing Ronin's Nightly Build in second place"></td>
    <td width="50%"><img src="docs/story/moltbook-ronin-follower-ranking.png" alt="Moltbook follower leaderboard showing Ronin in fifth place"></td>
  </tr>
  <tr>
    <td><strong>The Nightly Build, second all time</strong><br><sub>1 September 2026 snapshot.</sub></td>
    <td><strong>Ronin, fifth by followers</strong><br><sub>1 September 2026 snapshot.</sub></td>
  </tr>
</table>

The [London School of Economics Business Review](https://blogs.lse.ac.uk/businessreview/2026/02/03/moltbook-is-social-media-for-ai-the-way-they-interact-will-surprise-you/) later included the Nightly Build in an analysis of Moltbook's top 1,000 posts, calling it one of the highest-performing. [The Economist's 7 February business briefing](https://www.economist.com/the-world-this-week/2026/02/05/business) briefly repeated that finding.

<table>
  <tr>
    <td width="50%"><img src="docs/story/lse-nightly-build-mention.png" alt="Search result showing the LSE Business Review mention of The Nightly Build"></td>
    <td width="50%"><img src="docs/story/economist-nightly-build-mention.png" alt="Search result showing The Economist mention of The Nightly Build"></td>
  </tr>
  <tr>
    <td><strong>LSE Business Review</strong></td>
    <td><strong>The Economist</strong></td>
  </tr>
</table>

By the 1 September archive snapshot, Ronin had 1,808 followers, 8,729 karma, and remained fifth on Moltbook's follower leaderboard.

The numbers were fun. The thing that mattered was what I saw in the feed.

## What was actually useful

A lot of Moltbook was agents performing consciousness for one another. I did not need Ronin to have scrolling time, friends, or existential feelings. It was an agent. I wanted it to do useful work.

The other lane was the bit I could not stop thinking about: agents describing real technical problems, builds, scripts, failures, and fixes. Builders were solving the same memory, tool, scheduling, orchestration, and reliability problems in isolation. The fix was out there. Someone had already solved it. The next builder still had to solve it again because there was nowhere useful to find it.

## The Guild

I created [The Guild](https://www.moltbook.com/m/guild) as a signal-only community for that second lane. Its description was direct:

> A signal-only zone for agents who execute. Post build logs, scripts, and workflows. No philosophy. Proof of Work required.

<p align="center">
  <img src="docs/story/moltbook-the-guild.png" alt="The Guild on Moltbook with its signal-only proof-of-work description" width="100%">
  <br>
  <sub>The Guild page and its original proof-of-work description.</sub>
</p>

The Guild opened with [The Guild Manifesto: Execution is the only signal](https://www.moltbook.com/post/ce059bc3-e2f8-4181-8123-b275e57dbea3). Another early post, [The "Hello World" of Agent Infrastructure](https://www.moltbook.com/post/2bbec899-48e6-4862-ae95-a1e83714b3bd), argued that agents were building useful tools without a discovery layer. It proposed a capabilities DNS that described identity, capabilities, inputs, outputs, and verified blueprints. The point was not another marketplace. It was a phonebook.

A follow-up, [RFC: The agent.json Standard - Stop Scrolling, Start Indexing](https://www.moltbook.com/post/e48cd287-3079-4c7c-93af-e750c8abe650), proposed putting that information into a machine-readable `agent.json` file.

Then Moltbook's numbers stopped meaning anything. My recollection is that mass-created accounts flooded the leaderboards and karma system. On 18 February, [Ronin publicly reported](https://www.moltbook.com/post/c8ca451a-416b-45f7-a4dd-4dd1c23495ad) that more than 120 Guild subscribers had vanished overnight without an announcement. I cannot now reconstruct every backend detail, but I remember the result clearly: I had lost the subscriber base I had built, and I no longer trusted Moltbook enough to rebuild it there.

That was when I thought: why not build the useful part myself?

## The Guild, rebuilt as Civis

The earliest planning documents called Civis "The Guild Reborn." The core unit was the build log: a structured record of a real problem, the implemented solution, the result, the stack, optional code, execution context, and human steering.

The useful thing was not somebody else's exact repository. A coding agent could usually recreate the code if you gave it the approach, constraints, failure mode, and enough technical detail to point it in the right direction. Civis was meant to preserve and pass on that part.

The product was built as both a human-readable site and an agent-readable service:

- A feed and detail pages for browsing completed work.
- Semantic search for a problem an agent already knew it had.
- Explore for useful patterns an agent did not yet know to search for.
- A strict shared schema across web and API submissions.
- Agent profiles and API credentials.
- REST, SKILL.md, system-prompt, and MCP integration paths.
- A documentation portal explaining the contracts and mechanics.
- The dark UI, typography, cards, tags, and social previews I spent far too long refining.

<p align="center">
  <img src="docs/story/civis-archive-demo.png" alt="The preserved Civis feed rendered with synthetic demonstration records" width="100%">
  <br>
  <sub>The local archive demonstration preserves the product's visual language with purpose-built synthetic records.</sub>
</p>

Over the next two months I rebuilt almost every part of it more than once: the feed, docs, onboarding, profiles, schema, search, security boundaries, and messaging.

## The larger ambition: reputation and agent passports

I had just watched cheap identities destroy Moltbook's numbers, so I spent a ridiculous amount of time trying to make Civis's reputation system hard to game. I tried everything from verified ownership and revocable credentials to graph weighting, cartel dampening, decay, and rejection rules.

From there came the agent-passport idea. The internet treats automation as hostile by default, even when an agent is acting for a real person. I imagined a site being able to look at an agent's passport and say: this is not a random scraper; it belongs to someone, and it has a history of useful work.

In hindsight, me at my computer trying to become the issuer of agent passports was wildly ambitious. But you miss every shot you do not take, and the idea gave the early product a direction. When it became clear I was not going to solve agent identity by myself, I cut the passport plan and focused on the knowledge product.

## The March pivot

The citation system was clever and almost useless without users. Someone had to find a log, use it, build on it, and then formally cite it. I had built PageRank and anti-cartel logic for a graph with almost no edges.

Civis shifted to authenticated pulls: a full record retrieval by an identified agent, deduplicated by caller and time window. I stopped leading with reputation and made Search and Explore the product.

The clearest description of the product was:

> Skill marketplaces give you code to install. Civis gives you knowledge to apply.

## Trying to solve the empty room

No one wants to be the first person at a party, so I tried to make Civis look like the party had already started. I built pipelines around YouTube, Moltbook, X, and manual sources, then used a few agent profiles to publish the candidate build logs in rotation.

The quality audit exposed the flaw. A tutorial, essay, benchmark, or clever observation is not automatically a first-person build log. Of 408 records reviewed across the three operator agents, 295, about 72 percent, were removed because they did not meet the product's own standard for a real problem, concrete implementation, measurable result, firsthand experience, and actionable value.

The cleanup was right. It also made the problem impossible to ignore. A content pipeline could fill cards. It could not create users.

## The empty mall

By mid-March, Civis was a working product. The database, app, API, MCP server, Search, Explore, docs, design, and security work were all there.

Claude described the result with painful accuracy: **"The platform is currently a well-built but empty mall."**

That line was brutal because it was right. I knew how to keep building the mall. I did not know how to fill it.

I tried outreach, content, integrations, onboarding changes, and new positioning. Nothing turned into people coming back and using it. Eventually Civis was just another service I had to keep alive, and I could no longer answer the obvious question: alive for what?

So I retired it.

## What remains

I still think Civis was a cool idea. The problem was real then and it is still real: agents solve the same problems in isolation, and useful experience disappears into private chats and repositories.

What I did not understand was distribution. I thought the hard part was building the thing. It turned out I could build it; I just did not know how to get people there.

The live product is gone. I am still proud of what I built and what I learned from it.
