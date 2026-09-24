# Harvest manifest — React Digest #2370 'Write React. Ship direct DOM.' (2026-09-20, processed 2026-09-24)
issue: https://reactdigest.net/newsletters/2370-write-react-ship-direct-dom

Every external link from `harvest inventory` carries a disposition row below (coverage gate). This is the THIRD consecutive issue with the same measurement question for this source (#2360 and #2365 yielded zero keeps): #2370 originated ONE (translate-shield, first seen here); its other keep, Vidact, was first sighted on TWiR #296 and only re-sighted here — see the ledger for the origination-rate decision.

| item | disposition |
|---|---|
| [Write React. Ship direct DOM.](https://www.vidact.dev/) | kept → RB-E-REACT-CORE (experimental alternative-runtimes lead list). REOPENS the twir-296 too-early skip on its recorded terms: second sighting, an npm beta (0.2.0-beta.8 on the beta tag, MIT), and the author reports one production app (grep.codemod.com) on it. Read: a Rust compiler turning React-syntax components + hooks into direct DOM updates (components run once), an 8.1 kB gzipped counter claim, and unsupported React is a COMPILE ERROR rather than a fallback — a deliberate subset. No independent benchmark read, so it lands as an experimental lead, not a pick |
| [Amazon Developer Global Hackathon](https://fandf.co/45TUfLQ) | skipped: sponsor — hackathon promotion (tracking link) |
| [What browser translators do to a live DOM](https://github.com/alievdavlat/translate-shield/blob/main/research/article.md) | kept → RB-E-I18N reading. Article fetched and read directly: Chrome/Google-bundle/Yandex translators detach the text node (React's reference becomes an orphan, removeChild/insertBefore throw NotFoundError), Edge/Firefox rewrite in place; the pasted no-op crash guard freezes the UI; translate="no" held on every engine, class="notranslate" failed on Yandex. Caveats stated in the entry: single probe page for the flicker figure, Safari unmeasured, the author ships a 3★ competing library |
| [Native is now the future of mobile at Shopify](https://shopify.engineering/back-to-native) | already-held: RB-E-CROSSPLATFORM (and RB-E-AI-DEVTOOLS / RB-E-ANIMATION), kept 2026-09-21 |
| [What it actually takes to migrate Discord to React Native's new architecture](https://swmansion.com/blog/what-it-actually-takes-to-migrate-discord-to-react-native-s-new-architecture/) | already-held: RB-E-NATIVE |
| [Replay input after hydration](https://kurtextrem.de/posts/replay-input-after-hydration) | skipped: how-to — a single technique post: a useReplayPreHydrationInput() hook that detects the hydration pass with useSyncExternalStore, compares DOM values with React's and replays synthetic change events in a microtask batch (dated 2026-05-17 by the page; its claim that RN handles this natively was not verified). Reopen: React ships or documents built-in replay |
| [Ship React Apps Faster With AI (Prepathon'26)](https://www.vpdae.com/redirect/h109n24uos7lb620gqxq63rtcxz) | skipped: sponsor — event promotion behind a redirect |
| [The browser's main thread is expensive](https://kciter.so/posts/the-expensive-main-thread/en/) | skipped: how-to — the featured article of #2365, dispositioned in react-digest-2365.md |
| [Programming Digest](https://programmingdigest.net/) | skipped: off-scope — sibling newsletter cross-promotion (recurring every issue) |
| [Leadership in Tech](https://leadershipintech.com/) | skipped: off-scope — sibling newsletter cross-promotion (recurring every issue) |
| [C# Digest](https://csharpdigest.net/) | skipped: off-scope — sibling newsletter cross-promotion (recurring every issue) |
| [Bonobo Press](https://bonobopress.com/) | skipped: off-scope — publisher home page (recurring every issue) |
| [Advertise](https://bonobopress.com/media-kit) | skipped: sponsor — the publisher's media kit (recurring every issue) |
