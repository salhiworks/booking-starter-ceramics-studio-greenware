# Ceramics & Pottery Studio Booking Website — "Greenware" Starter

A finished, premium booking website for an independent pottery teacher, ready to make your
own with Claude Code and publish on Hostinger. It ships as **Turning Room Pottery Studio**, a
fictional one-teacher studio in Asheville's River Arts District, North Carolina, for private
lessons on the wheel and in handbuilding:

- a one-page studio website — a first screen with hands centring clay on the wheel, a warm
  headline, **Book a lesson**, and **"Never tried pottery? Start here."**: your two first
  lessons with their real length and price from the booking system, each opening the booking
  with it chosen; **the wheel, or your hands?** — wheel throwing and handbuilding side by
  side, so a visitor can choose without knowing pottery words; **lessons & prices** grouped
  as *Start here*, *Private lessons* and *Finishing & development*, each with its session
  length, price, level and what it includes, plus what a lesson includes and what is arranged
  after it (your firing policy); **your first lesson** — five steps, quick answers and what to
  wear; **from wet clay to your shelf** — five photographed stages (wet · leather-hard · bone
  dry · bisque · glazed) that make clear the booking is the lesson and the rest happens over
  the following weeks, a ruled box that says **a booking reserves the lesson, not a kiln**,
  *Not every piece makes it*, and how collection is arranged personally; **the studio**;
  *Good to know* (sample policies, labelled); directions — from 320 px phones up, with
  booking in a sheet over the page;
- online booking — **one private lesson for one person per booking**, a day and time, contact
  details and an optional note **About your pottery experience**, and an emailed 6-digit code;
  the teacher confirms each request ("Request received — we'll review your session and confirm
  the time shortly");
- the owner dashboard at `/admin/` — requests to confirm, lessons and prices, studio hours and
  closures, email health, and the website's own text, photos, brand colour and heading style.

The look — *Greenware*: a daylit pottery workroom, and the honest journey of a piece from wet
clay to the shelf. Bisque-white pages, a slip band, wet-clay charcoal and one **glaze colour**
(celadon teal by default) that carries white text. The one ornament is the **stage line** —
five short bars in the colours clay passes through on its way to the kiln. Besley over Karla.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list of
files (name, city, words, colours) — the booking system, the dashboard and the layout stay as
they are.

Lessons, prices, studio hours and contact details are **not** code: you set them in the
dashboard once the booking backend is connected. **Your own photographs** — the first screen,
the two techniques, your first lesson, the five clay stages, the cracked piece and four of the
studio — go in the dashboard → Website. Each sample photo stays labelled "Sample" until you
replace it. Your name, training and experience are yours to add: the starter invents none.

**A booking is one private lesson.** The booking engine books single sessions on one calendar
— one teacher's time. It never books a kiln firing, a finished piece or a ready date: drying,
trimming, firing, glazing and collection are your own arrangements, described on the page and
settled at the studio. Lesson prices are paid at the studio — nothing is paid online. Group
workshops with seats, several teachers or wheels, packages and courses, kiln scheduling,
firing status, pickup notifications and online checkout are not part of the engine (see *What
the engine does not do* in `CLAUDE.md`).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and tells
you exactly what is left for you to do (your dashboard login and the two email secrets).
Full steps: the Profit Studio guide *Build a Premium Booking Website with Claude Code*,
Step 3, or `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt or in
Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web App**
from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `Techniques`, `Lessons`, `FirstLesson`, `Kiln` — clay to kiln, `Studio`, `GoodToKnow`, `Visit`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample lessons and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How lessons find their kind and technique (by the words in their names), the two first lessons, lengths and prices, and each lesson's level and inclusions (from "Level:" and "Includes:" in the description) |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5191
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef Es-salhi).
Photographs and other third-party assets keep their own terms, listed file by file in
[`ASSETS.md`](ASSETS.md).
