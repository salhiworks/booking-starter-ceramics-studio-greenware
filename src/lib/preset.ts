import type { Preset } from '@profitstudio/booking-engine';

/**
 * Turning Room Pottery Studio's own preset (INTEGRATION.md §5): the sample
 * lessons, hours and policies preview mode shows, and the starter set the
 * dashboard offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * WHAT A BOOKING IS HERE. One booking = ONE private session for ONE person with
 * the studio's one teacher, in the studio, on the studio's one calendar. Its
 * length is the real length of that session — the time at the wheel or the
 * table. It is never the time until a piece is finished, never a kiln firing,
 * never a course or a package:
 *   - a lesson ends with shaped, WET clay. Drying, trimming, bisque firing,
 *     glazing and the glaze firing happen afterwards, over days and weeks, on
 *     the studio's own schedule — not booked and not tracked by the engine;
 *   - TRIMMING & REFINING is a lesson with pieces kept from an earlier wheel
 *     lesson; GLAZING is a lesson with pieces that have already been bisque-fired;
 *   - firing and glazing fees (per piece kept) and collection are the studio's
 *     own arrangements, described in the Website content and paid at the studio.
 * The buffer after each session is the teacher's time to clean the wheel and
 * splash pan, wipe the table and set out fresh clay for the next person.
 *
 * WHAT A PRICE IS HERE. The engine has one price per service: the price of that
 * one session, paid at the studio (src/lib/services.ts → priceTerms). Zero reads
 * as free. Nothing is paid online: the engine books sessions only. The studio
 * confirms every request (`autoConfirm: false`).
 *
 * A description can end with two short lists the website shows as their own
 * lines, each item separated by "·":
 *   "Level: complete beginners · …"   — who the session suits
 *   "Includes: clay for the session · …" — what the session price covers
 */
export const sitePreset = {
  id: 'ceramics-studio',
  label: 'Ceramics & Pottery Studio',
  terminology: { customer: 'student', customers: 'students', booking: 'lesson', bookings: 'lessons' },
  previewBusiness: {
    name: 'Sample Pottery Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 828-555-0100',
      address: '100 Example Street, Asheville, NC',
    },
  },
  policies: {
    slotIntervalMinutes: 30,
    minNoticeMinutes: 1440,
    maxAdvanceDays: 90,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Daytime lessons Tuesday to Friday, a late Thursday for after work, Saturday until four; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:00' },
    { weekday: 3, start: '10:00', end: '18:00' },
    { weekday: 4, start: '12:00', end: '20:30' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '09:00', end: '16:00' },
  ],
  services: [
    {
      name: 'First Time at the Wheel',
      description:
        'Your first time on the potter’s wheel, one to one. You’ll wedge and centre the clay, open it, pull up a wall and try a small cylinder or bowl — as many times as you like. Choose up to two pieces to keep for firing. Level: complete beginners · no experience needed. Includes: clay for the session · tools and an apron · use of the wheel',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 9500,
      priceFrom: false,
    },
    {
      name: 'Intro to Handbuilding',
      description:
        'Shape clay by hand at the table: a pinch pot, coils and a simple slab, then one or two small pieces of your own. A calm, unhurried way into clay. Level: complete beginners · anyone who’d rather not start on the wheel. Includes: clay for the session · tools and an apron',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 8500,
      priceFrom: false,
    },
    {
      name: 'Private Wheel Lesson',
      description:
        'A one-to-one lesson at the wheel, shaped around what you want to work on next: steadier centring, taller walls, wider bowls, cleaner rims. Level: after a first lesson · returning potters. Includes: clay for the session · tools and an apron · use of the wheel',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 11000,
      priceFrom: false,
    },
    {
      name: 'Extended Wheel Practice',
      description:
        'A longer session for repetition: throw several pieces in a row, with guidance whenever you want it and a quiet wheel when you don’t. Level: you can centre on your own · developing potters. Includes: clay for the session · tools and an apron · use of the wheel',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 14000,
      priceFrom: false,
    },
    {
      name: 'Handbuilding Studio Session',
      description:
        'A longer handbuilding lesson for a piece you plan together — a slab vessel, a coiled planter, a set of small dishes — with joining, shaping and surface texture. Level: beginners welcome · returning students. Includes: clay for the session · tools and an apron',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 12000,
      priceFrom: false,
    },
    {
      name: 'Trimming & Refining',
      description:
        'Back at the wheel with the leather-hard pieces you kept from an earlier lesson: trim a foot, refine the walls, add a handle or your own mark. Level: you have wheel pieces kept at the studio for trimming. Includes: tools · use of the wheel',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 6000,
      priceFrom: false,
    },
    {
      name: 'Glazing Session',
      description:
        'Glaze your own bisque-fired pieces: choose from the studio glazes, test how they layer, and apply them by dipping, pouring or brushing. Level: you have bisque-fired pieces at the studio. Includes: studio glazes for your pieces · tools and an apron',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 6500,
      priceFrom: false,
    },
  ],
} satisfies Preset;
