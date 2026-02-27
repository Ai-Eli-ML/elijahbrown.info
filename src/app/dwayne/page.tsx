'use client';

import styles from './page.module.css';

export default function DwaynePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Lenny Williams — Artist Portfolio</h1>
          <p className={styles.subtitle}>Complete Research Package for Website Build</p>
        </header>

        <section className={styles.mainContent}>
          <div className={styles.card}>
            <h2>The Vision</h2>
            <p>
              A premium artist portfolio website for Lenny Williams — Grammy-nominated
              singer-songwriter whose voice has defined five decades of American soul music.
              From fronting Tower of Power during their golden era to crafting the timeless
              ballad &ldquo;Cause I Love You,&rdquo; Williams has built a legacy that bridges funk, R&amp;B,
              gospel, and hip-hop.
            </p>
            <p style={{ marginTop: '1rem' }}>
              At 81, he still performs 30+ shows a year, and his music continues to reach new
              generations through high-profile samples by Kanye West, Twista, and Young Jeezy.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Social Media &amp; Official Presence</h2>
            <ul>
              <li><a href="https://instagram.com/thereallennywilliams" target="_blank" rel="noopener noreferrer">Instagram — @thereallennywilliams (~72K followers)</a></li>
              <li><a href="https://x.com/lennywilliams" target="_blank" rel="noopener noreferrer">X/Twitter — @LennyWilliams</a></li>
              <li><a href="https://lennywilliams.com" target="_blank" rel="noopener noreferrer">Official Website — lennywilliams.com</a></li>
              <li><a href="https://lennywilliamsepk.com" target="_blank" rel="noopener noreferrer">Electronic Press Kit — lennywilliamsepk.com</a></li>
              <li><a href="https://open.spotify.com/artist/5VcrwzYyoX3WUTbkaqcIvN" target="_blank" rel="noopener noreferrer">Spotify — Full Catalog</a></li>
              <li><a href="https://music.apple.com/us/artist/lenny-williams/875829" target="_blank" rel="noopener noreferrer">Apple Music — Full Catalog</a></li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Career Timeline</h2>
            <table className={styles.timelineTable}>
              <thead>
                <tr><th>Year</th><th>Event</th></tr>
              </thead>
              <tbody>
                <tr><td>1945</td><td>Born in Little Rock, Arkansas</td></tr>
                <tr><td>~1946</td><td>Family relocates to Oakland, California</td></tr>
                <tr><td>Late 1960s</td><td>Signs with Fantasy Records — records &ldquo;Lisa&apos;s Gone&rdquo; and &ldquo;Feelin&apos; Blue&rdquo; (John Fogerty composition)</td></tr>
                <tr><td>Dec 1972</td><td>Joins Tower of Power, replacing Rick Stevens</td></tr>
                <tr><td>1973</td><td>Tower of Power self-titled album (Gold LP) — &ldquo;What Is Hip?&rdquo; &amp; &ldquo;So Very Hard to Go&rdquo;</td></tr>
                <tr><td>1974</td><td>Back to Oakland released — &ldquo;Don&apos;t Change Horses&rdquo; co-written with Johnny &ldquo;Guitar&rdquo; Watson</td></tr>
                <tr><td>1975</td><td>Signs with Motown — Rise Sleeping Beauty (original &ldquo;Cause I Love You&rdquo;)</td></tr>
                <tr><td>1977</td><td>Choosing You (Gold album) — #10 Billboard Disco chart</td></tr>
                <tr><td>1978</td><td>Spark of Love (Gold album) — re-recorded &ldquo;Cause I Love You&rdquo; becomes mega-hit</td></tr>
                <tr><td>2004</td><td>BMI Urban Award — &ldquo;Overnight Celebrity&rdquo; (Twista/Kanye West sample, $188K royalties)</td></tr>
                <tr><td>2012</td><td>Inducted into Arkansas Black Hall of Fame</td></tr>
                <tr><td>2017</td><td>Inducted into Rhythm &amp; Blues Hall of Fame (Detroit)</td></tr>
                <tr><td>2020</td><td>Fine released — 18th studio album (15 tracks, feat. Levi Seacer)</td></tr>
                <tr><td>2023</td><td>&ldquo;She Took My Drawers&rdquo; music video goes viral (grandson Dwayne Davis plays young Lenny)</td></tr>
                <tr><td>2026</td><td>Tour dates: Fayetteville (Mar 6), Charlotte (Mar 7), Jackson MS (Apr 26)</td></tr>
              </tbody>
            </table>
          </div>

          <div className={styles.card}>
            <h2>Discography Highlights</h2>
            <p><strong>Gold Albums:</strong></p>
            <ul>
              <li>Tower of Power (1973) — with Tower of Power</li>
              <li>Choosing You (1977) — ABC Records</li>
              <li>Spark of Love (1978) — ABC Records</li>
            </ul>
            <p style={{ marginTop: '1rem' }}><strong>18 solo studio albums</strong> spanning 1974–2020, plus 3 albums with Tower of Power. 100+ songs registered with BMI.</p>
          </div>

          <div className={styles.card}>
            <h2>Hip-Hop Sampling Legacy</h2>
            <p>
              &ldquo;Cause I Love You&rdquo; sampled by Twista (prod. Kanye West) for &ldquo;Overnight Celebrity&rdquo; (2004).
              Two royalty checks of $94,000 each. BMI Urban Award shared with Kanye West and Twista.
              Also sampled by Young Jeezy and other hip-hop artists.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Key Collaborations</h2>
            <ul>
              <li>Aretha Franklin, Alicia Keys, Al Green, Usher</li>
              <li>Sly Stone, Andre Crouch, Billy Preston, Larry Graham</li>
              <li>Snoop Dogg (&ldquo;I Love My Momma&rdquo; for HBO&apos;s Sharp Objects, 2018)</li>
              <li>Levi Seacer (Prince&apos;s guitarist — produced Fine album)</li>
              <li>Kenny G (saxophone collaboration)</li>
              <li>Johnny &ldquo;Guitar&rdquo; Watson (co-writer)</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Press Quotes</h2>
            <blockquote style={{ borderLeft: '3px solid #c084fc', paddingLeft: '1rem', margin: '0.5rem 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              &ldquo;When I leave, I want it to be beyond the expectation. &apos;I knew he was good, I didn&apos;t know he was that good. I felt something.&apos;&rdquo;
            </blockquote>
            <blockquote style={{ borderLeft: '3px solid #c084fc', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              &ldquo;If you&apos;re gonna try to make it in this business, you have to have some type of leadership skills, even if you&apos;re not leading nobody but yourself.&rdquo;
            </blockquote>
          </div>

          <div className={styles.card}>
            <h2>Website Sections Needed</h2>
            <ul>
              <li>Hero / Landing — Bio preview, streaming links, tour CTA</li>
              <li>Full Biography — Early life through present day</li>
              <li>Discography — 18 albums with cover art, streaming links</li>
              <li>Tour / Events — Upcoming dates, ticket links</li>
              <li>Gallery — Performance photos, album covers, awards</li>
              <li>Press / EPK — Quotes, press kit download</li>
              <li>Contact / Booking — Management contact form</li>
            </ul>
          </div>

          <h3 className={styles.wireframeSectionTitle}>Website Wireframes</h3>

          <div className={styles.card}>
            <h2>Design System</h2>
            <dl className={styles.designSpec}>
              <dt>Palette</dt>
              <dd>Black (#000) background, Gold (#D4AF37) accent, White text, Dark grey (#1a1a1a) cards</dd>
              <dt>Fonts</dt>
              <dd>Playfair Display (serif, display headings) + Inter (sans-serif, body)</dd>
              <dt>Inspiration</dt>
              <dd>Beyonce.com (minimal, photo-dominant) + Joann AI Portfolio (dark + neon accent)</dd>
            </dl>
          </div>

          <div className={styles.card}>
            <h2>Homepage — Desktop (1440px)</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  LENNY WILLIAMS          HOME  ABOUT  MUSIC  TIMELINE  GALLERY  CONTACT │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│              ┌─────────────────────────────┐                 │
│              │                             │                 │
│              │    [HERO: Full-viewport     │                 │
│              │     NYC Black Coat Photo]   │                 │
│              │                             │                 │
│              │     ─ ─ ─ ─ ─ ─ ─ ─        │                 │
│              │     LENNY WILLIAMS          │                 │
│              │     ═══════════════         │                 │
│              │     GRAMMY-NOMINATED •      │                 │
│              │     TOWER OF POWER •        │                 │
│              │     R&B LEGEND              │                 │
│              │                             │                 │
│              │         ↓ SCROLL            │                 │
│              └─────────────────────────────┘                 │
│                                                              │
│──────────── HORIZONTAL SCROLL GALLERY (Beyonce-style) ──────│
│                                                              │
│  ┌────────┐ ┌────────┐ ┌──────────────┐ ┌────────┐ ┌──────┐│
│  │ Photo  │ │ Photo  │ │  Photo       │ │ Photo  │ │Photo ││
│  │ 720px  │ │ 900px  │ │  1200px      │ │ 720px  │ │800px ││
│  │        │ │        │ │              │ │        │ │      ││
│  └────────┘ └────────┘ └──────────────┘ └────────┘ └──────┘│
│                                              ← swipe →      │
│                                                              │
│──────────── FEATURED SECTION ────────────────────────────────│
│                                                              │
│  ┌──────────────────────┐  ┌─────────────────────────────┐  │
│  │ [Spotify Embed]      │  │  "When I walk on that stage, │  │
│  │  Cause I Love You    │  │   I want to be illuminated"  │  │
│  │  ▶ ━━━━━━━━━━━━━     │  │         — Lenny Williams     │  │
│  └──────────────────────┘  └─────────────────────────────┘  │
│                                                              │
│──────────── STATS ───────────────────────────────────────────│
│                                                              │
│    50+ YEARS    │    16 ALBUMS    │   2x GOLD   │  HOF x2   │
│                                                              │
│  ┌─────────────────────┐  ┌──────────────────────┐          │
│  │  EXPLORE DISCOGRAPHY │  │  VIEW TIMELINE       │          │
│  └─────────────────────┘  └──────────────────────┘          │
│                                                              │
│──────────── FOOTER ──────────────────────────────────────────│
│  LENNY WILLIAMS    │  NAV LINKS    │  SOCIAL / STREAMING     │
│  ═══════════ (gold line) ═══════════════════════════════════ │
│  © 2026 Bridle     │  Home         │  IG  Spotify  Apple    │
│  Ridge Records     │  About...     │  X   Booking           │
│                    │               │  Site by Advancing Tech │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>About Page — Desktop</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  NAV BAR (fixed, mix-blend-difference)                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [70vh HERO: Standing Portrait, full-width]          │    │
│  │                                                      │    │
│  │          ABOUT LENNY                                 │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────┐  ┌──────────────────────────────┐   │
│  │                    │  │  "Love is what has gotten     │   │
│  │  [60% — Seated     │  │   me through all of these    │   │
│  │   Portrait Photo]  │  │   years."                    │   │
│  │                    │  │        — Lenny Williams       │   │
│  │                    │  │  ══════════════════════       │   │
│  │                    │  │  Leonard Charles "Lenny"      │   │
│  │                    │  │  Williams was born February   │   │
│  │                    │  │  16, 1945 in Little Rock...   │   │
│  │                    │  │                               │   │
│  │                    │  │  [Full 5-paragraph bio]       │   │
│  └────────────────────┘  └──────────────────────────────┘   │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ 50+     │ │ 16      │ │ 2x      │ │ HOF     │          │
│  │ YEARS   │ │ ALBUMS  │ │ GOLD    │ │ x2      │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                              │
│  ══════ AWARDS & RECOGNITION ══════                          │
│  • Arkansas Black Hall of Fame (2012)                        │
│  • Rhythm & Blues Hall of Fame (2017)                        │
│  • BMI Songwriters Award (2005)                              │
│  • Honorary Doctorate — Cal State                            │
│                                                              │
│  ──── LEGENDARY CONNECTIONS ────                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                          │
│  │Berry│ │Kanye│ │Snoop│ │MC   │                           │
│  │Gordy│ │West │ │Dogg │ │Hammer│                          │
│  └─────┘ └─────┘ └─────┘ └─────┘                          │
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Discography Page — Desktop</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  NAV BAR                                                     │
│                                                              │
│           DISCOGRAPHY                                        │
│           Five decades of soul, R&B, and funk                │
│                                                              │
│  ══════ SOLO ALBUMS ══════                                   │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ [Album Art]  │ │ [Album Art]  │ │ [Album Art]  │        │
│  │              │ │  ┌──────┐    │ │  ┌──────┐    │        │
│  │              │ │  │ GOLD │    │ │  │ GOLD │    │        │
│  │              │ │  └──────┘    │ │  └──────┘    │        │
│  │──────────────│ │──────────────│ │──────────────│        │
│  │ Rise Sleep.. │ │ Choosing You │ │ Spark of Love│        │
│  │ 1975 Motown  │ │ 1977 ABC     │ │ 1978 ABC     │        │
│  │              │ │ #10 Disco    │ │ "Cause I     │        │
│  │  HOVER:      │ │              │ │  Love You"   │        │
│  │  track list  │ │              │ │              │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Love Current │ │ Let's Do It  │ │ Still in the │        │
│  │ 1979         │ │ Today 1980   │ │ Game 2012    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ══════ TOWER OF POWER ══════ (dark card bg)                 │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Tower of     │ │ Back to      │ │ Urban        │        │
│  │ Power (1973) │ │ Oakland (74) │ │ Renewal (74) │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ══════ NOTABLE COLLABORATIONS ══════                        │
│  ┌────────────────────────┐ ┌────────────────────────┐      │
│  │ Kenny G — "Don't Make  │ │ Twista/Kanye — "Over-  │      │
│  │ Me Wait" — 1987        │ │ night Celebrity" — 2004│      │
│  │ #15 Hot 100            │ │ #6 Hot 100 (sample)    │      │
│  └────────────────────────┘ └────────────────────────┘      │
│                                                              │
│  [Spotify Artist Embed]                                      │
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Timeline Page — Desktop</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  NAV BAR                                                     │
│                                                              │
│           THE JOURNEY                                        │
│           Six decades of music, soul, and legacy             │
│                                                              │
│                    │ (gold line)                              │
│                    │                                         │
│  ┌─────────────┐   ●  1945                                  │
│  │ Born in      │   │                                        │
│  │ Little Rock  │   │                                        │
│  └─────────────┘   │                                         │
│                    │                                         │
│         1950s  ●   │   ┌─────────────┐                      │
│                │   │   │ Family moves│                       │
│                │   │   │ to Oakland  │                       │
│                    │   └─────────────┘                       │
│                    │                                         │
│  ┌─────────────┐   ●  1972                                  │
│  │ Joins Tower │   │                                        │
│  │ of Power    │   │                                        │
│  │ [Photo]     │   │                                        │
│  └─────────────┘   │                                         │
│                    │                                         │
│         1978   ●   │   ┌─────────────┐                      │
│                │   │   │ "Cause I    │                       │
│                │   │   │ Love You"   │                       │
│                │   │   │ goes GOLD   │                       │
│                    │   └─────────────┘                       │
│                    │                                         │
│       ... continues through 2026 ...                         │
│                    │                                         │
│                    ●  END                                    │
│           "Love is what has gotten me through"               │
│                                                              │
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Gallery Page — Desktop</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  NAV BAR                                                     │
│                                                              │
│           GALLERY                                            │
│                                                              │
│  [ALL] [PORTRAIT] [PERFORMANCE] [LEGENDS] [VINTAGE]         │
│   ^^^gold underline on active filter                         │
│                                                              │
│  ┌──────────────┐ ┌────────┐ ┌──────────────────────┐      │
│  │              │ │        │ │                      │      │
│  │  [Photo 1]   │ │[Pho 2] │ │  [Photo 3 — wide]   │      │
│  │  tall        │ │ square │ │                      │      │
│  │              │ │        │ │                      │      │
│  │              │ └────────┘ └──────────────────────┘      │
│  │              │ ┌────────────────────┐                    │
│  └──────────────┘ │  [Photo 4]         │                    │
│  ┌────────────┐   │                    │  ┌────────┐        │
│  │ [Photo 5]  │   └────────────────────┘  │[Pho 6] │        │
│  │            │   ┌────────┐ ┌──────────┐ │        │        │
│  └────────────┘   │[Pho 7] │ │[Photo 8] │ └────────┘        │
│                   └────────┘ └──────────┘                    │
│                                                              │
│  ← MASONRY GRID — varying heights, CSS columns →            │
│  Hover: caption overlay with name + description              │
│  Click: opens LIGHTBOX modal                                 │
│                                                              │
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Contact Page — Desktop</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────────────────────────────────────────────┐
│  NAV BAR                                                     │
│                                                              │
│           GET IN TOUCH                                       │
│                                                              │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │  BOOKING & PRESS    │  │  CONTACT FORM                │  │
│  │  ═══════════════    │  │                              │  │
│  │  For bookings,      │  │  Name: [__________________]  │  │
│  │  press inquiries,   │  │                              │  │
│  │  and appearances    │  │  Email: [_________________]  │  │
│  │                     │  │                              │  │
│  │  ┌───────────────┐  │  │  Subject: [▼ Booking______]  │  │
│  │  │ VIEW EPK →    │  │  │                              │  │
│  │  └───────────────┘  │  │  Message:                    │  │
│  │                     │  │  ┌────────────────────────┐  │  │
│  │  BRIDLE RIDGE       │  │  │                        │  │  │
│  │  RECORDS            │  │  │                        │  │  │
│  │  Lenny's own label  │  │  └────────────────────────┘  │  │
│  │                     │  │                              │  │
│  │  SOCIAL:            │  │  ┌──────────────────────┐    │  │
│  │  IG  X  FB          │  │  │   SEND MESSAGE →     │    │  │
│  │                     │  │  └──────────────────────┘    │  │
│  │  STREAMING:         │  │                              │  │
│  │  Spotify Apple      │  │                              │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
│                                                              │
│  FOOTER                                                      │
└──────────────────────────────────────────────────────────────┘`}</pre>
          </div>

          <h3 className={styles.wireframeSectionTitle}>Mobile Wireframes (375px)</h3>

          <div className={styles.card}>
            <h2>Homepage — Mobile</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────┐
│ ☰  LENNY WILLIAMS    │
│─────────────────────│
│                      │
│ ┌──────────────────┐ │
│ │                  │ │
│ │  [HERO PHOTO]    │ │
│ │  Full viewport   │ │
│ │                  │ │
│ │  LENNY           │ │
│ │  WILLIAMS        │ │
│ │  ═══════         │ │
│ │  GRAMMY-NOM •    │ │
│ │  TOWER OF POWER  │ │
│ │  • R&B LEGEND    │ │
│ │                  │ │
│ │      ↓           │ │
│ └──────────────────┘ │
│                      │
│ ← HORIZONTAL SCROLL →│
│ ┌─────┐┌─────┐┌────┐│
│ │Photo││Photo││Pho ││
│ └─────┘└─────┘└────┘│
│                      │
│ ┌──────────────────┐ │
│ │ [Spotify Embed]  │ │
│ │  Cause I Love U  │ │
│ └──────────────────┘ │
│                      │
│ "When I walk on      │
│  that stage, I want  │
│  to be illuminated"  │
│                      │
│ 50+ YEARS | 16 ALBUMS│
│ 2x GOLD   | HOF x2  │
│                      │
│ [EXPLORE DISCOGRAPHY]│
│ [VIEW TIMELINE      ]│
│                      │
│ FOOTER (stacked)     │
└──────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Navigation — Mobile (Hamburger Open)</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────┐
│ ✕  LENNY WILLIAMS    │
│                      │
│                      │
│      HOME            │
│      ────            │
│      ABOUT           │
│                      │
│      MUSIC           │
│                      │
│      TIMELINE        │
│                      │
│      GALLERY         │
│                      │
│      CONTACT         │
│                      │
│                      │
│   IG  Spotify  Apple │
│                      │
└──────────────────────┘
 (full-screen overlay,
  black bg, gold accent
  on active link)`}</pre>
          </div>

          <div className={styles.card}>
            <h2>About — Mobile</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────┐
│ ☰  LENNY WILLIAMS    │
│─────────────────────│
│                      │
│ ┌──────────────────┐ │
│ │ [HERO PORTRAIT]  │ │
│ │  50vh            │ │
│ │                  │ │
│ │  ABOUT LENNY     │ │
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │ [SEATED PHOTO]   │ │
│ │  Full width      │ │
│ └──────────────────┘ │
│                      │
│ "Love is what has    │
│  gotten me through"  │
│  — gold pull quote   │
│                      │
│ [Full bio text,      │
│  single column,      │
│  5 paragraphs]       │
│                      │
│ ┌────┐┌────┐        │
│ │50+ ││16  │        │
│ │YRS ││ALB │        │
│ └────┘└────┘        │
│ ┌────┐┌────┐        │
│ │GOLD││HOF │        │
│ │ x2 ││ x2 │        │
│ └────┘└────┘        │
│                      │
│ AWARDS (stacked)     │
│ CELEBRITIES (scroll) │
│ FOOTER               │
└──────────────────────┘`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Timeline — Mobile</h2>
            <pre className={styles.wireframe}>{`┌──────────────────────┐
│ ☰  LENNY WILLIAMS    │
│─────────────────────│
│                      │
│   THE JOURNEY        │
│                      │
│  │ (gold line, left) │
│  │                   │
│  ● 1945              │
│  │ ┌───────────────┐ │
│  │ │Born in Little  │ │
│  │ │Rock, Arkansas  │ │
│  │ └───────────────┘ │
│  │                   │
│  ● 1972              │
│  │ ┌───────────────┐ │
│  │ │Joins Tower of │ │
│  │ │Power          │ │
│  │ │[Photo]        │ │
│  │ └───────────────┘ │
│  │                   │
│  ● 1978              │
│  │ ┌───────────────┐ │
│  │ │Spark of Love  │ │
│  │ │goes GOLD      │ │
│  │ └───────────────┘ │
│  │                   │
│  ... continues ...   │
│                      │
│ FOOTER               │
└──────────────────────┘
 (single-column timeline
  on mobile — all entries
  right-aligned from the
  gold line on left edge)`}</pre>
          </div>

          <div className={styles.card}>
            <h2>Navigation Flow</h2>
            <pre className={styles.wireframe}>{`                    ┌──────────┐
            ┌───── │ HOMEPAGE │ ─────┐
            │      └────┬─────┘      │
            │           │            │
     ┌──────┴──┐  ┌─────┴────┐  ┌───┴──────┐
     │  ABOUT  │  │DISCOGRAPHY│  │ TIMELINE │
     └─────────┘  └──────────┘  └──────────┘
            │           │            │
     ┌──────┴──┐  ┌─────┴────┐
     │ GALLERY │  │ CONTACT  │
     └─────────┘  └──────────┘

  All pages accessible from fixed nav bar.
  Homepage has CTA links to Discography + Timeline.
  About page links to Gallery (celebrity photos).
  Contact has EPK external link.`}</pre>
          </div>

          <h3 className={styles.wireframeSectionTitle}>Documents</h3>

          <div className={styles.card}>
            <h2>Project Sing — Concept Document</h2>
            <p style={{ marginBottom: '1rem' }}>
              View the full project concept and planning document below.
            </p>
            <ul className={styles.linkList}>
              <li>
                <a href="https://cdn.discordapp.com/attachments/1460714637879410812/1477033204807368798/Project_Sing.pdf?ex=69a349dd&is=69a1f85d&hm=05cf5d75495ccbf403ac3ef4ea6ef99defbd4e757b482bc443652532308ede3a&" target="_blank" rel="noopener noreferrer">
                  Download Project Sing (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Quick Links</h2>
            <ul className={styles.linkList}>
              <li>
                <a href="https://lennywilliams.com" target="_blank" rel="noopener noreferrer">
                  Current Official Website
                </a>
              </li>
              <li>
                <a href="https://lennywilliamsepk.com" target="_blank" rel="noopener noreferrer">
                  Current EPK
                </a>
              </li>
              <li>
                <a href="https://instagram.com/thereallennywilliams" target="_blank" rel="noopener noreferrer">
                  Instagram (@thereallennywilliams)
                </a>
              </li>
              <li>
                <a href="https://www.kqed.org/arts/13953515/lenny-williams-she-took-my-drawers" target="_blank" rel="noopener noreferrer">
                  KQED Feature — &ldquo;She Took My Drawers&rdquo;
                </a>
              </li>
              <li>
                <a href="https://rollingout.com/2025/10/16/lenny-williams-talks-5-decades-of-rb/" target="_blank" rel="noopener noreferrer">
                  Rolling Out — 55 Years in R&amp;B
                </a>
              </li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Private Research — Advancing Technology</p>
        </footer>
      </div>
    </div>
  );
}
