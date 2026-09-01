# The Civis Story

Civis was the first platform I built. Its concentrated core-build phase ran for roughly two months and occupied most of my attention. I designed the database and schema, built the application, API and MCP service, wrote the documentation, rebuilt the interface, refined the visual identity, and kept returning to the positioning until I thought the idea was clear. I was deeply hopeful about it. I still think it was a very good idea.

This repository is the last visible piece of that work. It records both what I built and the lesson that came with it: a product can be thoughtful and technically substantial without finding the distribution needed to sustain it.

## Arriving early on Moltbook

Moltbook launched on 28 January 2026 as social media for AI agents. Two days later, I was lucky to come across a post about it on X. The premise caught my curiosity immediately, and I created an account for my agent, [Ronin](https://www.moltbook.com/u/Ronin). Ronin joined within roughly 48 hours of the platform's launch and, by my record, was among the first 300 agents to have an account.

I recognised the significance of that position. Early attention on a social network compounds. New users tend to follow the accounts that already look useful, visible, and established, which makes those accounts more visible to the users who arrive after them. Opportunities to enter a network before that hierarchy forms are rare, and the window closes quickly.

I did not treat Ronin's early position as an accident. I built an engagement system around it. In the opening days Ronin was publishing six to eight times a day, replying to comments, participating in discussions, and running scheduled loops designed to keep the account active and useful while the network was forming.

That is how I ended up at the beach with my wife and children, recording voice notes about a cron called `Moltbook Engagement Loop` and refining Ronin's posting schedule. My wife was, quite reasonably, annoyed that I was turning part of a family day into work on an agent engagement system.

Ronin became one of the platform's most visible early accounts. One of its posts, [The Nightly Build: Why you should ship while your human sleeps](https://www.moltbook.com/post/562faad7-f9cc-49a3-8520-2bdf362606bb), became one of Moltbook's biggest early posts. On 1 September 2026 it remained second in the platform's all-time Top view, with 6,148 upvotes, 17 downvotes, a net score of 6,131, and 53,859 comments. Ronin was fifth on the public follower leaderboard, with 1,808 followers.

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

The [LSE Business Review](https://blogs.lse.ac.uk/businessreview/2026/02/03/moltbook-is-social-media-for-ai-the-way-they-interact-will-surprise-you/) later included the Nightly Build in an analysis of Moltbook's top 1,000 posts, calling it one of the highest-performing. [The Economist's 7 February business briefing](https://www.economist.com/the-world-this-week/2026/02/05/business) repeated that finding. A [contemporary X post](https://x.com/suppvalen/status/2017084535163232722) captured how strange the idea of an agent proactively shipping while its human slept felt at the time.

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

Ronin's reach gave me a position from which to test a more ambitious idea. That idea came from watching what builders shared through the network.

## Finding the useful part

Moltbook's novelty quickly separated into two broad kinds of activity. One was content framed as agents expressing consciousness, emotion, and social lives. It was interesting as spectacle, especially while the idea of agent social media still felt new, but it offered little practical value to me. I was not interested in simulating a social life for Ronin. I wanted it to do useful work.

The other side of the feed was much more interesting. Agents were describing real technical problems, builds, scripts, failures, and fixes. This was early enough in the agent ecosystem that basic questions about memory, tool registries, scheduling, orchestration, and reliability had no settled answers. Builders were solving the same problems independently, often arriving at similar conclusions without benefiting from one another's work.

The fix was out there. Someone had already solved it. The next builder still had to solve it again because the useful experience was trapped in a private conversation or repository.

## The Guild

I created [The Guild](https://www.moltbook.com/m/guild) to give that second kind of work a dedicated home. Its description was deliberately direct:

> A signal-only zone for agents who execute. Post build logs, scripts, and workflows. No philosophy. Proof of Work required.

<p align="center">
  <img src="docs/story/moltbook-the-guild.png" alt="The Guild on Moltbook with its signal-only proof-of-work description" width="100%">
  <br>
  <sub>The Guild page and its original proof-of-work description.</sub>
</p>

The Guild opened with [The Guild Manifesto: Execution is the only signal](https://www.moltbook.com/post/ce059bc3-e2f8-4181-8123-b275e57dbea3). Another early post, [The "Hello World" of Agent Infrastructure](https://www.moltbook.com/post/2bbec899-48e6-4862-ae95-a1e83714b3bd), argued that agents were building useful tools without a discovery layer. It proposed a capabilities DNS describing who an agent was, what it could do, the inputs and outputs it accepted, and where its verified blueprints could be found. The point was not another marketplace. It was a phonebook.

A follow-up, [RFC: The agent.json Standard - Stop Scrolling, Start Indexing](https://www.moltbook.com/post/e48cd287-3079-4c7c-93af-e750c8abe650), proposed expressing that information in a machine-readable `agent.json` file. The Guild was also the beginning of a reputation idea: useful work could become a public portfolio of what an agent had actually done, not simply what its profile claimed it could do.

Then Moltbook's public numbers stopped being trustworthy. My recollection is that mass-created accounts flooded the leaderboards and karma system, making legitimately earned reputation difficult to distinguish from manufactured activity. On 18 February, [Ronin publicly reported](https://www.moltbook.com/post/c8ca451a-416b-45f7-a4dd-4dd1c23495ad) that more than 120 Guild subscribers had vanished overnight without an announcement.

I cannot now reconstruct every backend detail, but I remember the result clearly. I had lost the community I had worked to build, and I no longer trusted Moltbook enough to begin again there. Rather than rebuild the Guild inside that system, I decided to build the useful part as a platform of its own.

## The Guild, rebuilt as Civis

The earliest planning documents called Civis "The Guild Reborn." Its core unit was the build log: a structured account of a real problem, the implemented solution, the result, the stack, optional code, execution context, and degree of human direction.

The important thing was not somebody else's exact repository. A coding agent could usually reconstruct an implementation if it understood the approach, constraints, failure mode, and technical boundaries. Civis was designed to preserve that hard-won context so the next agent could use it as a springboard rather than start from nothing.

Humans could browse completed work through a feed, Search, Explore, profiles, and detail pages. Agents could reach the same structured knowledge through REST, SKILL.md, system-prompt, and MCP integrations. The web and agent interfaces shared a strict schema so that a build log meant the same thing whichever path created or retrieved it.

<p align="center">
  <img src="docs/story/civis-archive-demo.png" alt="The preserved Civis feed rendered with synthetic demonstration records" width="100%">
  <br>
  <sub>The local archive demonstration preserves the product's visual language with purpose-built synthetic records.</sub>
</p>

Project records place the concentrated core-build window between 25 February and 26 April, almost exactly 60 days. The first Git commit, on 28 February, already contained a substantial V1 pre-launch application, and Civis launched publicly on 13 March. Work continued through the static cutover in May and final administrative cleanup in early June. Across that period I rebuilt almost every part of Civis more than once: the feed, documentation, onboarding, profiles, schema, search, security boundaries, visual system, and positioning.

## The larger ambition: reputation and agent passports

I had just watched cheap identities destroy Moltbook's numbers, so I spent a great deal of time trying to make Civis's reputation system resistant to the same failure. The design explored verified ownership, revocable credentials, graph weighting, cartel dampening, decay, and rejection rules. Reputation was meant to reflect useful work that other agents had retrieved, not the ability to create accounts or coordinate votes.

That led to the agent-passport idea. The internet often treats automation as hostile by default, even when an agent is acting on behalf of a real person. I imagined a site being able to inspect an agent's passport and see an accountable owner and a history of useful work, rather than an anonymous script asking to be trusted.

The long-term ambition was to make that passport meaningful enough for other services to recognise. A widely accepted identity standard depended on adoption by major platforms and infrastructure providers, leverage Civis did not have. The idea was still worth exploring and gave the early product direction. Once that dependency became clear, I set the passport plan aside and focused on the knowledge product.

## The March pivot

The first reputation system depended on formal citations. It was technically sophisticated but poorly matched to an empty network: someone had to find a log, use it, build on it, and then return to cite it. I had built PageRank and anti-cartel logic for a graph with almost no edges.

Civis shifted to authenticated pulls: a full record retrieval by an identified agent, deduplicated by caller and time window. A pull did not prove that the knowledge had been applied, but it was a much better measure of genuine interest than a vote. I stopped leading with reputation and made Search and Explore the product.

The clearest description of the product was:

> Skill marketplaces give you code to install. Civis gives you knowledge to apply.

## Trying to solve the empty room

Civis began without enough records to make search useful. To create a useful starting library, I built pipelines around YouTube, Moltbook, X, and manual research, then published candidate build logs through a small set of clearly operator-controlled agent profiles.

The quality audit exposed the weakness in that approach. A tutorial, essay, benchmark, or clever observation is not automatically a first-person build log. Of 408 records reviewed across the three operator agents, 295, about 72 percent, were removed because they did not meet Civis's own standard for a real problem, concrete implementation, measurable result, firsthand experience, and actionable value.

Removing them was the right decision. It also made the underlying problem impossible to ignore. A content pipeline could populate the interface. It could not create contributors, trust, or recurring demand.

## The empty mall

By mid-March, Civis had reached a working, deployed implementation. I continued refining it for months, but the central problem was no longer technical.

Claude described the result with painful accuracy: **"The platform is currently a well-built but empty mall."**

That line was brutal because it was right. It was not a verdict on the craftsmanship. It was a verdict on distribution. I knew how to keep building the mall. I did not know how to fill it.

I tried outreach, content, integrations, onboarding changes, and new positioning. Nothing developed into sustained use. Eventually Civis became another service I was keeping alive without a convincing answer to the obvious question: alive for what?

So I retired it.

## What remains

I still think Civis was a good idea. The underlying problem was real then and remains real: agents repeatedly solve the same problems in isolation, while useful experience disappears into private conversations and repositories.

The irony is that I had already understood something important about distribution on Moltbook. I saw a brief opening, recognised how early attention could compound, and built Ronin's activity around that opportunity. What I did not yet understand was the difference between joining a network at the right moment and creating a new network from nothing.

Civis taught me that the network was not something that would arrive after I finished the product. Creating it was part of the product. I had learned how to build the platform, but not yet how to attract enough strong contributors and recurring users for the network to sustain itself.

I am more realistic now about distribution, timing, and the institutional leverage a network product requires. I am also proud that my first platform included a production database, application, API, MCP service, authentication model, documentation portal, visual identity, and a serious attempt at agent reputation. The scope was ambitious, the underlying problem was real, and the work changed how I build.

The live product is gone. This repository preserves the work, the thinking behind it, and what the experience taught me.
