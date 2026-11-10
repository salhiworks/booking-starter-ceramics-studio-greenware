# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code session
opened in this folder. It changes identity and words only, so it finishes in one short
session.

```text
Customize this ceramics & pottery studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
What I teach, my firing policy and my personality in a few words: <e.g. wheel and handbuilding for beginners, $12 per piece fired, calm and encouraging>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark and the line
   beside it, the line above the headline, headline, introduction, the "Start here" title and
   small print, the photo caption, the wheel and handbuilding texts and points, the lessons
   intro, the three "How booking works" facts, the three kind notes, what a lesson includes and
   what is arranged after it (MY firing policy and fees), the note about prices, the first
   lesson (intro, five steps, quick answers, what to wear), clay to kiln (intro, the five stage
   texts, the "booking reserves the lesson — not a kiln" box, not every piece makes it,
   collection), the studio text, captions and facts, Good to know answers (my real policies),
   the finding-us note and the search title and description. Keep field ids, types, limits and
   photos. Keep the sample photos (they stay labelled "Sample" until I upload my own).
   Headlines may set a few words in italics using *asterisks* — keep that style.
   Keep the honesty rules: one booking is one private lesson for one person; a booking never
   reserves a kiln, a finished piece or a ready date; pieces are dried, fired and glazed
   afterwards and collection is arranged personally; not every piece survives; nothing is paid
   online; no lesson lengths or prices written into the copy.
4. Only if celadon teal clearly doesn't fit my brand (otherwise skip this step): change the
   default of brand.accent in src/content/site.ts (a deep glaze colour that keeps white text at
   4.5:1 — iron red, cobalt, deep olive, tenmoku brown), the colours in src/admin-theme.css and
   the fill in public/favicon.svg.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent lessons, prices, opening hours, qualifications, years of experience, awards,
exhibitions, students' work, reviews or testimonials, safety certifications or accessibility
features I haven't told you about — lessons, prices and hours are set in the dashboard. When
done, run npm run build and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your lessons:** dashboard → Services. One booking is one private session in your studio.
  - **Kinds.** The page sorts lessons by the words in their names: *first / intro / taster /
    beginner* → **Start here**; *trim / refine / glaze / finish / decorate / consult /
    technique* → **Finishing & development**; *wheel / throwing / handbuilding / pinch / coil /
    slab / lesson / practice / session* → **Private lessons**. Otherwise the description
    decides, then "More sessions".
  - **The two first lessons.** A *Start here* lesson whose name also says *wheel* or *throw* is
    your first wheel lesson; one that says *handbuilding*, *pinch*, *coil* or *slab* is your
    first handbuilding lesson. "Start here" in the first screen, the two technique columns and
    the first-lesson buttons open the booking with them chosen and show their current length
    and price. **Renamed one so it no longer matches** (for example "Clay Day")? Type its exact
    new name in Website → Your first lesson → *Your first wheel lesson* / *Your first
    handbuilding lesson*. If a first lesson is hidden or deleted, its buttons simply say "Book a
    lesson" and open the full list — no stale name or price is ever shown.
  - **Trimming and glazing.** A name with *Trim* is labelled "For pieces kept from a wheel
    lesson"; one with *Glaz* "For your bisque-fired pieces".
  - **Price** is for the lesson, paid at the studio. Leave *Starting price* off unless it really
    varies (the page then says "from" and that it is confirmed before the session). A price of
    0 shows as "Free".
  - **Length** is the session itself — never the time until a piece is finished. The buffer
    after it is your time to clean the wheel and splash pan and reset the table.
- **Level and what's included:** end a description with `Level:` and `Includes:`, items
  separated by `·` — for example `Level: complete beginners · no experience needed. Includes:
  clay for the session · tools and an apron`. Only list what the lesson price really covers.
- **Your firing policy:** Website → Lessons & prices → *Arranged after the lesson* and the small
  line under shaping-lesson prices. Write your real per-piece fee and what it covers. Don't
  promise that every piece will be fired or ready by a date.
- **Your photographs:** dashboard → Website → Welcome (one upright 4:5 photo — hands and clay
  read best), Wheel or handbuilding (two upright), Your first lesson (upright), Clay to kiln
  (five squares, one per stage, plus the cracked piece), The studio (one wide, three upright).
  Remove a photo to show the section without it. Each stays labelled "Sample" until you
  replace it. Use photos of your own studio and work; ask permission before showing students.
- **Policies:** Good to know is labelled "Sample policies" until you edit it — write your own
  cancellation, firing, collection and accessibility answers. Describe dust and kiln practices
  as you really run them, without promising safety outcomes.
