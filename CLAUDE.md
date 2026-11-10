# Ceramics & Pottery Studio "Greenware" Starter — project rules

A one-page booking website for an independent pottery teacher, shipped as **Turning Room
Pottery Studio** (a fictional one-teacher studio in the River Arts District, Asheville, North
Carolina: first lessons on the wheel and in handbuilding, private wheel and handbuilding
lessons, trimming and glazing sessions — all one to one, in the studio) for the owner to make
their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt that
personalizes it. Built around **@profitstudio/booking-engine** **2.0.0-beta.3** (pinned; lock
in `booking-engine.lock.json`). The engine owns booking; this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`.
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll review your session and confirm the time shortly.", confirmed →
  "Your lesson is booked."). Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.

## What the engine does not do — never fake it

**One booking = one private session for one person with one teacher, in the studio, on one
calendar.** Its length is the session — the time at the wheel or the table — never the time until
a piece is finished. A lesson ends with shaped, wet clay: drying, trimming, bisque firing, glazing,
the glaze firing and collection happen afterwards, over days and weeks, on the studio's own kiln
schedule, arranged by the teacher personally and settled at the studio. A booking never reserves a
kiln, a finished piece or a ready date, and not every piece survives drying and firing. Lesson
prices are per session and paid at the studio. A new booking feature needs a new engine version —
never custom database code or browser-side logic in this project:

- group workshops with seats, several teachers, several wheels with their own availability,
  separate equipment reservations;
- recurring lessons, prepaid packages, courses, memberships, enrolment tracking;
- kiln scheduling, firing status, finished-piece tracking, storage, pickup notifications,
  guaranteed ready dates;
- clay or material inventory, automatic material or firing fees, deposits, checkout or any online
  payment;
- customer pottery portfolios, image uploads, children's or party bookings, guardian consent.

The booking notes field is **About your pottery experience (optional)**: first time or not, what
they'd like to make, experience with clay. Never ask for health or other sensitive details in the
form. Proposed engine work: `docs/ENGINE-PROPOSAL-ceramics-studio.md` in the Niche Pack workspace.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample lessons, hours, policies; "students"/"lessons") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Kinds (Start here · Private lessons · Finishing & development, from the name, then the description), techniques (wheel · hand), roles (first · trim · glaze · lesson), the two first lessons (`firstLesson`), length and price terms, "Level:" / "Includes:" parsing, duration labels | `src/lib/services.ts` |
| What the owner can edit (texts, every section photo, Start here, the two techniques, the three booking facts and kind notes, what a lesson includes and the firing policy, the first lesson's steps, answers and what to wear, the first-lesson service names, the five clay stages with photos, the booking box, not every piece, collection, the studio's four photos and facts, FAQ, logo, brand colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero `#top` with Start here, Techniques `#techniques`, Lessons `#lessons`, FirstLesson `#first-lesson`, Kiln `#clay-to-kiln`, Studio `#studio`, GoodToKnow, Visit, Footer; `SectionMark` the number · stage line · name label; `Frame` a photo with caption and Sample tag; `Emphasis` renders the owner's `*highlight*` in italics); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Lessons, prices, durations,
  hours, the address, phone and email are NOT content: they come from the engine. The engine does not allow
  default images inside list fields — that is why each stage and studio photo is its own image field.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. A lesson row's Book passes
  that lesson's engine id; Start here, the technique columns and the first-lesson buttons pass
  `firstLesson(services, 'wheel' | 'hand', values['first.wheelService' | 'first.handService'])`.
- **Which lessons are the first lessons:** the engine gives services no build-time-stable key (only a
  database id), so `firstLesson()` takes (1) the lesson named in Website → Your first lesson (exact name,
  case/space-insensitive), else (2) the first lesson whose name says first / intro / taster / beginner and
  the technique (wheel / throw — handbuilding / pinch / coil / slab), else (3) none. App calls
  `setFirstLessonNames()` so kinds and labels follow the same choice. With none (deleted, hidden, renamed
  without updating that field) Start here leaves it out (or disappears), the buttons say "Book a lesson" and
  open the booking with nothing chosen, and no stale name, length or price is shown — never an unrelated
  lesson, never a stored price. Keep `concepts/ceramics-studio-greenware/first-lesson-identity.mjs` passing.
- **Kinds and roles:** `kindOf()` reads the NAME (then the description) against `RULES` (first match wins:
  start → finish → lesson; no match → "More sessions"). Keep
  `concepts/ceramics-studio-greenware/kinds.test.mjs` (Niche Pack workspace) passing.
- **Lengths and prices:** always from the engine (`timeTerms`, `priceTerms`). Never hard-code a lesson,
  length, price or id in copy (FAQ answers included). The firing fee is the owner's own policy text, never
  computed. Never suggest anything is paid online, never show a payment success.
- **Clay to kiln:** wherever a lesson is offered or booked (Start here, rows, the summary, the done step,
  clay to kiln) keep it clear that the booking is the session; that pieces are dried, fired and glazed
  afterwards with no fixed ready date; that collection is arranged personally; that not every piece survives.
  Never imply firing status, tracking, notifications or a kiln reservation.
- **Sample photos:** every photo carries a "Sample" label until the owner replaces that field (`ownerFields`);
  the studio says the photographs show another pottery workshop (and, in preview and the Live Demo, that the
  studio is fictional). Never present a stock photo's potter as the teacher or a student, never name them;
  never present the pictured pottery as students' work; never invent a name, qualifications, years of
  experience, exhibitions, awards, testimonials, reviews, safety certifications or accessibility features.
- **Default photos:** add your own variants to `public/photos/`, keep the default `src` in `site.ts` equal to a
  key in `photoVariants.ts`, record the source in `PHOTOS.md`. If the first-screen default changes, update the
  `<link rel="preload">` in `index.html` (`imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Policies:** Good to know shows a "Sample policies" label until the owner edits `faq.items`. Dust and kiln
  answers describe practice, never guarantee safety.
- **Copy:** warm, plain, first person ("I'll show you…"); encouraging and realistic; adults; no pressure, no
  "best studio in town". Only lessons the owner really offers.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1. The brand colour is owner-editable
  and always carries white text (`--on-accent`); on charcoal use `--accent-glow`. Photographs are square-cornered.
- **Composition:** calm and practical (DESIGN.md → Layout). New sections open with `.section-head`
  (SectionMark + h2 + intro). The stage line (`.stage-line`, `--staff`) stays the one ornament — no pottery
  icons, clay-splat textures, brush clip-art or gradients.
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5191 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
