# Greenware — the design

## The business and who visits

**Turning Room Pottery Studio** is a fictional one-teacher pottery studio in Asheville's River
Arts District: a single daylit workroom with a wheel, a long wedging table, banding wheels,
shelves of drying pots and a small kiln in the back room. It teaches **private, one-to-one
lessons for adults** — first lessons on the wheel and by hand, longer wheel and handbuilding
lessons, and sessions to trim and glaze the pieces students have made.

The people who arrive on the page are mostly **curious beginners** ("Can I try this with no
experience?", "Which one — the wheel or handbuilding?", "Can I take it home today?",
"What does it cost, and what's extra?") and **returning learners** who want the next lesson or
need to trim and glaze a piece. Most are deciding on a phone. The site answers those questions
in the order they come up, and is honest about the one thing pottery websites often blur:
**a lesson ends with wet clay, not a finished mug.**

## The concept — Greenware

*Greenware* is the potter's word for clay that has been shaped but not yet fired. It is exactly
what a student leaves behind at the end of a lesson. The design is built on the stages a piece
passes through — **wet clay → leather-hard → bone dry → bisque → glazed** — and on the honesty of
saying which of those stages the booking covers (only the first).

- **The stage line** is the one ornament: five short bars in the colours clay actually turns —
  dark wet grey, a leather-hard buff, pale bone-dry, bisque white (with a fine edge) and the glaze
  colour. It appears small in every section label, along the top of the *Start here* card and
  along the foot of the booking sheet's header, and at full size in *Clay to kiln*, where each
  stage wears its own bar under its photograph. It is information before it is decoration.
- No pottery icons, clay-splat textures, wheel clip-art, hand-drawn squiggles or gradients.

## Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f6f4ef` bisque white | The page — the colour of fired, unglazed clay and of the workshop's white shelves |
| `--oat` | `#ebe6dd` slip | The first-lesson band, the booking summary |
| `--forest` | `#2a2b28` wet-clay charcoal | The studio band, the booking sheet's header, the footer |
| `--ink` | `#1f2220` | Text (15.3:1 on the page) |
| `--accent` | `#1d5c5a` celadon teal (owner-editable) | Buttons, italic highlights, selected choices, the booking band — like one glaze used across the studio; always carries white text (7.4:1) |
| `--accent-glow` | pale celadon from the accent | Highlights and focus on charcoal |
| `--stage-1…5` | wet · leather-hard · bone dry · bisque · glazed | The stage line only |

Why not brown? Brown-on-beige is the default "pottery" look and it fails twice: it is low in
contrast and it looks like every other craft template. The photographs (a cool, daylit workshop
with white shelving and teal steel tables) suggested a lighter, cleaner palette: bisque and slip
for warmth, charcoal for weight, and one glaze colour that echoes the teal of the workshop's
tables and banding wheel. Every text/background pair is at least 4.5:1 (rendered audit: lowest
5.14:1). The editor refuses a brand colour that would not carry white text at 4.5:1.

## Typography

- **Besley** (headings, figures, italic highlights) — a sturdy, soft-shouldered serif with ball
  terminals and a lively italic. It feels thrown rather than drawn: confident, warm, a little
  hand-made, never precious. Weight 500.
- **Karla** (everything else) — a grotesque with slightly quirky, friendly forms that stays
  plain and very readable at small sizes on phones.
- Section labels are Karla capitals with tabular figures; the section number is Besley italic in
  the glaze colour. The owner can switch headings to Karla (Brand → Heading style).

## Photography

One Pexels shoot by Yan Krukau in **one** pottery workshop (see `PHOTOS.md`): hands centring clay
on the wheel, a cylinder being thrown, a pinched bowl on a banding wheel, wedging, mugs drying on
a radiator, bisque bowls, glazed ware on a shelf, a cracked unfired bowl, the windowsill, the
workroom, tools in mugs, finished shelves. One light, one room — the site shows a believable
studio rather than a collage. Hands and clay are the subject; faces are secondary. Photos are
square-cornered (they are documents of a working room). Every photo carries a "Sample" label
until replaced, and the studio section says they show another workshop.

## Composition, section by section

1. **First screen.** Left: the eyebrow (private pottery lessons · city), the headline *Your
   hands, some clay, and a teacher beside you.*, one paragraph, **Book a lesson** and **Lessons
   & prices**, today's hours. Right: hands centring clay, seen from above — the first thing a
   beginner learns, captioned as such. **"Never tried pottery? Start here."** — a white card
   with the stage line along its top, listing the two first lessons with their live length and
   price; on wide screens it rests on the photograph's lower corner so it is part of the first
   screen at every laptop size, with the hands clear above it. Phones: words and actions first,
   then the photo, then the card.
2. **The wheel, or your hands?** Two equal columns in the same order — photo, what it is, four
   short points, that technique's first lesson with its price, a button. Deliberately matched:
   it is a comparison, and neither is called easier.
3. **Lessons & prices.** Three plain facts (one booking = one private lesson · the time is your
   time at the wheel · paid at the studio), then the lessons in three kinds, each with a short
   note in a left column: **Start here** (on white with the glaze-colour edge), **Private
   lessons**, **Finishing & development**. Each row: name, an honest flag where it matters, what
   happens, **Level** and **Includes** lines, the session length and the price in Besley
   figures, "Firing & glazing extra, per piece kept" under shaping lessons, and Book. Then **What
   a lesson includes**: ticked items in the lesson price beside what is arranged after (the
   per-piece firing fee, trimming, pieces you don't keep).
4. **Your first lesson** (slip band). The intro and both first-lesson buttons beside a photo of
   wedging; five numbered steps across; four quick answers in white cards (experience, *will I
   make a finished mug?*, *can I take it home today?*, who lessons are for); what to wear and
   bring.
5. **From wet clay to your shelf.** Five photographed stages in a row (a swipe rail on phones),
   each with its own stage-colour bar. A bracket in the glaze colour over the first stage reads
   *Your lesson — the part you book*; a grey one over the other four reads *Afterwards, at the
   studio — over the following weeks*. Below: the ruled white box **Your booking reserves the
   lesson — not a kiln** (no fixed ready date), *Not every piece makes it* with a photo of a
   cracked bowl, said kindly, and *Collecting your pieces* — arranged personally.
6. **The studio** (charcoal band). The text beside a wide photograph, three upright frames with
   captions, the "another workshop" note, four facts (one student at a time, wet cleaning for
   dust, the kiln in the back room, ask about access) — practices described, nothing certified.
7. **Good to know** (sample policies, labelled), the glaze-colour **booking band**, **Find the
   studio**, the charcoal footer with the owner login.

## Booking

The shared booking flow in a bisque sheet over the page with a charcoal header and the stage line
along its foot (full screen on phones). Lessons are grouped as on the page with the same lengths,
prices, levels and inclusions; the summary shows the lesson, its session length, price, *Paid at
the studio, not online* and *Firing & glazing arranged after the lesson*. The notes field is
**About your pottery experience (optional)**. Every request is confirmed by the teacher:
"Request received — we'll review your session and confirm the time shortly." The done step says
the booking is one private lesson, that the pieces are fired afterwards with no kiln or ready date
reserved, and that collection is arranged personally.

## Interaction and motion

The first screen settles in once (a short rise; the photo eases from 103 %). Nothing else
animates on scroll. Buttons are round-ended, like a rolled coil; controls are 44 px or larger;
focus is a 2 px ring in the glaze colour (pale celadon on charcoal). `prefers-reduced-motion`
removes all motion. Horizontal rails (clay stages, studio frames) scroll-snap on phones and become
grids from tablet up.

## Why it suits a pottery studio

It sells the experience honestly. A beginner sees in the first screen that no experience is
needed, what the first lesson costs and how long it is; can choose a technique without jargon;
knows what the price covers and what costs extra; and understands — before booking — that they'll
leave with wet clay and collect a fired piece weeks later, if it survives. That honesty is what a
good independent teacher already says at the wheel; the design gives it a shape: the stage line.
