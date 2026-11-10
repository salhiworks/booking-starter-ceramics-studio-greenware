import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Lessons, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 * The engine does not allow default images inside list fields, so every
 * stage and studio photo is its own image field.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to set them in italics, in your brand colour.';
const SAMPLE_HELP = 'A “Sample” label stays on it until you replace it with your own photo.';

const STEP_FIELDS = [
  { type: 'text', id: 'title', label: 'Step', default: '', maxLength: 48, required: true },
  { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 260, rows: 2 },
] as const;

type Img = { src: string; alt: string; width: number; height: number };
const P = (name: string, alt: string): Img => ({ src: `/photos/${name}-800.webp`, alt, width: 800, height: 1000 });
const S = (name: string, alt: string): Img => ({ src: `/photos/${name}-640.webp`, alt, width: 640, height: 640 });
const L = (name: string, alt: string): Img => ({ src: `/photos/${name}-1000.webp`, alt, width: 1000, height: 667 });

/** One stage of a piece's journey from clay to kiln: its name, one line and a square photo. */
function stage(n: number, title: string, text: string, image: Img) {
  return [
    { type: 'text', id: `kiln.stage${n}`, label: `Stage ${n}`, default: title, maxLength: 28, required: true },
    { type: 'longText', id: `kiln.stage${n}Text`, label: `Stage ${n} — what happens`, default: text, maxLength: 220, rows: 2 },
    {
      type: 'image',
      id: `kiln.stage${n}Photo`,
      label: `Stage ${n} — photo (square)`,
      help: `Square. Remove it to show the stage without a photo. ${SAMPLE_HELP}`,
      default: image,
      aspectRatio: 1,
    },
  ] as const;
}

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the brand colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One or two words read best.',
          default: 'Turning Room',
          maxLength: 22,
          required: true,
        },
        {
          type: 'text',
          id: 'brand.descriptor',
          label: 'Line beside the name mark',
          help: 'What you are, in a few words. Shown small beside the name in the header.',
          default: 'Private pottery lessons',
          maxLength: 32,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is a warm white. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Brand colour',
          help: 'Used for the main buttons, highlighted words, selected choices and the booking band — like one glaze across the studio. Buttons carry white text, so pick a deep colour: a celadon teal, iron red, cobalt, deep olive. Light colours are refused because white text would not read on them.',
          default: '#1d5c5a',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'serif',
          options: [
            { value: 'serif', label: 'Serif', description: 'Sturdy, warm headings with italic highlights — the original design.' },
            { value: 'sans', label: 'Sans serif', description: 'The same layout with plainer, more modern headings.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Turning Room Pottery Studio — private pottery lessons in Asheville, NC',
          maxLength: 80,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An independent pottery studio in Asheville’s River Arts District: private, one-to-one lessons on the wheel and in handbuilding, for complete beginners and returning potters. Book a lesson online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the buttons, the “Start here” lessons for beginners and one photograph.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Private pottery lessons · Asheville, NC',
          maxLength: 64,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: MARK_HELP,
          default: 'Your hands, some clay, and *a teacher beside you.*',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'One-to-one lessons on the wheel and by hand, in a small daylit studio in the River Arts District. You have the clay, the wheel and the teacher to yourself — and if you’ve never touched clay before, the first lessons were made for you.',
          maxLength: 300,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Main button', help: 'Opens the booking so the visitor can choose a lesson.', default: 'Book a lesson', maxLength: 28, required: true },
        {
          type: 'text',
          id: 'hero.secondary',
          label: 'Second button',
          help: 'Leads to your lessons and prices. Leave empty to hide it.',
          default: 'Lessons & prices',
          maxLength: 32,
        },
        {
          type: 'text',
          id: 'hero.startTitle',
          label: '“Start here” — title',
          help: 'Above your two first lessons (their names, lengths and prices come from Services). Leave empty to hide the box.',
          default: 'Never tried pottery? Start here.',
          maxLength: 48,
        },
        {
          type: 'text',
          id: 'hero.startNote',
          label: '“Start here” — small print',
          help: 'Keep it true to your policy: what the price includes, and that firing happens after the lesson.',
          default: 'Clay, tools and an apron included · firing arranged after your lesson',
          maxLength: 100,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (upright)',
          help: `Upright (4:5) — hands and clay at the wheel read best. Keep the clay away from the edges. ${SAMPLE_HELP}`,
          default: {
            src: '/photos/hero-centring-1000.webp',
            alt: 'Seen from above, two clay-covered hands cup a ball of pale clay in the middle of a turning wheel head, the white splash pan around it.',
            width: 1000,
            height: 1250,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'hero.caption',
          label: 'Photo caption',
          help: 'A short line under the photo. Leave empty to hide it.',
          default: 'Centring — the first thing you learn at the wheel',
          maxLength: 72,
        },
      ],
    },
    {
      id: 'techniques',
      label: 'Wheel or handbuilding',
      description:
        'The two ways into clay, side by side, so visitors can choose without knowing pottery words. Each column’s button opens the booking with that technique’s first lesson (see Your first lesson).',
      fields: [
        { type: 'text', id: 'tech.title', label: 'Title', help: MARK_HELP, default: 'The wheel, or *your hands?*', maxLength: 56, required: true },
        {
          type: 'longText',
          id: 'tech.intro',
          label: 'Introduction',
          default:
            'There are two ways to begin. Neither is the “easy” one — they’re different, and they make different things. Choose the one that sounds like more fun; you can always try the other next time.',
          maxLength: 320,
          rows: 3,
        },
        { type: 'text', id: 'tech.wheelTitle', label: 'Wheel — title', default: 'Wheel throwing', maxLength: 40, required: true },
        {
          type: 'longText',
          id: 'tech.wheelText',
          label: 'Wheel — what it is',
          default:
            'The clay spins on the wheel while your hands shape it. Everything starts with centring — steadying the clay in the middle — and then opening it and drawing up a wall. It’s rhythmic and absorbing, and it makes round forms: cylinders, cups and bowls.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'list',
          id: 'tech.wheelPoints',
          label: 'Wheel — in short',
          itemLabel: 'Point',
          maxItems: 4,
          fields: [{ type: 'text', id: 'text', label: 'Point', default: '', maxLength: 90, required: true }],
          default: [
            { text: 'Makes round forms: cylinders, cups and bowls' },
            { text: 'Centring takes practice — most people get the feel within a lesson' },
            { text: 'Pieces are trimmed later, when the clay is leather-hard' },
            { text: 'You will get wet clay on your arms and clothes' },
          ],
        },
        {
          type: 'image',
          id: 'tech.wheelPhoto',
          label: 'Wheel — photo (upright)',
          help: `Upright (4:5) — hands on clay at the wheel. Remove it to show text only. ${SAMPLE_HELP}`,
          default: P('wheel-throwing', 'Two clay-covered hands draw up the wall of a pale cylinder on a turning wheel, throwing rings circling its side.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'tech.handTitle', label: 'Handbuilding — title', default: 'Handbuilding', maxLength: 40, required: true },
        {
          type: 'longText',
          id: 'tech.handText',
          label: 'Handbuilding — what it is',
          default:
            'Shaping clay with your hands and a few simple tools at the table — pinching, rolling coils, cutting and joining slabs. It’s slower and quieter than the wheel, and it isn’t limited to round shapes: dishes, planters, vessels with corners, things only you would think of.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'list',
          id: 'tech.handPoints',
          label: 'Handbuilding — in short',
          itemLabel: 'Point',
          maxItems: 4,
          fields: [{ type: 'text', id: 'text', label: 'Point', default: '', maxLength: 90, required: true }],
          default: [
            { text: 'Pinch, coil and slab: any shape, not only round ones' },
            { text: 'At your own pace — nothing spins until you want it to' },
            { text: 'Good for detail, texture and surface marks' },
            { text: 'A little less messy than the wheel (only a little)' },
          ],
        },
        {
          type: 'image',
          id: 'tech.handPhoto',
          label: 'Handbuilding — photo (upright)',
          help: `Upright (4:5) — hands shaping clay at the table. Remove it to show text only. ${SAMPLE_HELP}`,
          default: P('handbuilding', 'Two hands shape the uneven rim of a hand-pinched bowl standing on a small banding wheel on a dark workbench.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'lessons',
      label: 'Lessons & prices',
      description:
        'Lesson names, lengths and prices come from Services in this dashboard. The page groups them by the words in their names: first, intro, taster or beginner → Start here; trim, refine, glaze, finish → Finishing & development; wheel, throwing, handbuilding, lesson, practice, session → Private lessons. End a description with “Level:” and “Includes:”, items separated by “·”, to show who a lesson suits and what its price covers.',
      fields: [
        { type: 'text', id: 'lessons.title', label: 'Title', help: MARK_HELP, default: 'Lessons & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'lessons.intro',
          label: 'Introduction',
          default:
            'Every lesson is private: one student, one teacher, the whole session. Start with a first lesson on the wheel or by hand, then come back for longer lessons, or to trim and glaze the pieces you’ve made.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'lessons.terms',
          label: 'How booking works',
          help: 'Three short facts shown above the list.',
          itemLabel: 'Fact',
          maxItems: 3,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 44, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 200, rows: 2 },
          ],
          default: [
            {
              title: 'One booking, one private lesson',
              text: 'Each booking reserves one session for one person at the time you choose. Want to come back? Book the next lesson whenever you like.',
            },
            {
              title: 'The time is your time at the wheel',
              text: 'A lesson’s length is the session itself. Your pieces dry, are fired and glazed afterwards, over the following weeks.',
            },
            {
              title: 'Paid at the studio',
              text: 'Lesson prices are paid when you visit, and firing fees when you collect. Nothing is charged online.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'lessons.noteStart',
          label: 'Note beside “Start here”',
          default: 'For complete beginners. Choose the wheel or handbuilding — no experience, no equipment, nothing to prepare.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'lessons.noteLesson',
          label: 'Note beside “Private lessons”',
          default: 'For after your first lesson, or if you’ve worked with clay before. Each one is shaped around what you want to learn next.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'lessons.noteFinish',
          label: 'Note beside “Finishing & development”',
          default: 'Sessions with the pieces you’ve already made: trimming them at leather-hard, and glazing them once they’re bisque-fired.',
          maxLength: 200,
          rows: 2,
        },
        {
          type: 'text',
          id: 'lessons.firingRow',
          label: 'Small line under the price of shaping lessons',
          help: 'Shown under the price of first lessons and private lessons. Leave empty to hide it.',
          default: 'Firing & glazing extra, per piece kept',
          maxLength: 48,
        },
        { type: 'text', id: 'materials.title', label: 'What the price covers — title', help: MARK_HELP, default: 'What a lesson *includes*', maxLength: 56, required: true },
        {
          type: 'list',
          id: 'materials.included',
          label: 'Included in the lesson price',
          itemLabel: 'Item',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 80, required: true }],
          default: [
            { text: 'The teacher’s time, one to one, for the whole session' },
            { text: 'Clay for the session — as much as you use' },
            { text: 'Tools, sponges and a studio apron' },
            { text: 'Use of the wheel, the table and the banding wheels' },
          ],
        },
        {
          type: 'list',
          id: 'materials.extra',
          label: 'Arranged after the lesson',
          help: 'Your sample firing policy. Keep it honest and specific — what is charged, and for what.',
          itemLabel: 'Item',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'title', label: 'Item', default: '', maxLength: 56, required: true },
            { type: 'longText', id: 'text', label: 'Detail', default: '', maxLength: 240, rows: 2 },
          ],
          default: [
            {
              title: 'Firing, per piece you keep',
              text: '$14 for a cup or small bowl, $22 for a larger piece. It covers the bisque firing, one studio glaze and the glaze firing. Paid when you collect.',
            },
            {
              title: 'Trimming wheel pieces',
              text: 'Done by me at leather-hard and included in the firing fee — or trim them yourself in a Trimming & Refining session.',
            },
            {
              title: 'Pieces you don’t keep',
              text: 'Go back into the reclaim bucket and become clay again. Nothing is fired unless you choose it.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'lessons.priceNote',
          label: 'About prices',
          help: 'Shown under the list. Keep it honest: nothing is paid online, and booking reserves one lesson.',
          default:
            'Lesson prices are paid at the studio by card or cash — nothing is charged when you book. A booking reserves the lesson, not a place in a kiln: firing happens on the studio’s schedule after your lesson.',
          maxLength: 480,
          rows: 4,
        },
      ],
    },
    {
      id: 'first',
      label: 'Your first lesson',
      description:
        'For beginners: what happens in a first lesson, answers to the usual worries, and what to wear. The two buttons open the booking with your first wheel lesson or your first handbuilding lesson.',
      fields: [
        { type: 'text', id: 'first.title', label: 'Title', help: MARK_HELP, default: 'Your first *lesson*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'first.intro',
          label: 'Introduction',
          default:
            'You don’t need experience, special clothes or a plan. I’ll show you each step, then hand the clay back to you. Most of all, a first lesson is for finding out how clay feels — and whether you’d like more of it.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'list',
          id: 'first.steps',
          label: 'What happens',
          itemLabel: 'Step',
          maxItems: 5,
          fields: STEP_FIELDS,
          default: [
            { title: 'Apron on, sleeves up', text: 'A quick look round the studio, somewhere for your things, and a few words about what you’d like to try.' },
            { title: 'Wedging the clay', text: 'Kneading the clay smooth and even, so it behaves on the wheel or at the table. It’s also a good way to stop thinking about work.' },
            { title: 'Learning the basics', text: 'Centring, opening and lifting at the wheel — or pinching, coiling and joining by hand. I show you; then it’s your turn, as often as you like.' },
            { title: 'Making your pieces', text: 'Try, collapse, try again. Towards the end, you choose up to two pieces you’d like to keep for firing.' },
            { title: 'What happens next', text: 'Your pieces stay at the studio to dry. We talk about trimming, glazing and when I’ll be in touch about collection.' },
          ],
        },
        {
          type: 'list',
          id: 'first.answers',
          label: 'Quick answers',
          itemLabel: 'Answer',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 64, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 220, rows: 2 },
          ],
          default: [
            { question: 'Do I need any experience?', answer: 'None at all. First lessons start from the very beginning, at your pace.' },
            { question: 'Will I make a finished mug?', answer: 'Probably not on day one — and that’s fine. Expect a small cylinder, a bowl or a pinch pot you’re proud of, not a set of tableware.' },
            { question: 'Can I take my piece home today?', answer: 'Not yet: it’s still wet clay. It has to dry and be fired first — that’s explained just below.' },
            { question: 'Who are lessons for?', answer: 'Adults, 18 and over, one at a time. You can book another lesson whenever you’d like to continue.' },
          ],
        },
        { type: 'text', id: 'first.wearTitle', label: 'What to wear — title', default: 'What to wear and bring', maxLength: 48 },
        {
          type: 'list',
          id: 'first.wear',
          label: 'What to wear',
          itemLabel: 'Item',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Item', default: '', maxLength: 100, required: true }],
          default: [
            { text: 'Clothes you don’t mind getting clay on — it washes out, mostly' },
            { text: 'Closed-toe shoes' },
            { text: 'Long hair tied back, and nothing loose at the wrists near the wheel' },
            { text: 'Short nails make centring easier (not required)' },
            { text: 'An apron is provided — bring your own if you prefer' },
          ],
        },
        {
          type: 'text',
          id: 'first.wheelButton',
          label: 'Button — first wheel lesson',
          help: 'Opens the booking with your first wheel lesson chosen.',
          default: 'Book a first wheel lesson',
          maxLength: 32,
          required: true,
        },
        {
          type: 'text',
          id: 'first.handButton',
          label: 'Button — first handbuilding lesson',
          help: 'Opens the booking with your first handbuilding lesson chosen.',
          default: 'Book an intro to handbuilding',
          maxLength: 36,
          required: true,
        },
        {
          type: 'text',
          id: 'first.wheelService',
          label: 'Your first wheel lesson (only if renamed)',
          help: 'Leave empty if its name in Services says “first”, “intro”, “taster” or “beginner” and “wheel” or “throw”. If you rename it (for example “Clay Day”), type its exact new name here, so “Start here” and the first-lesson buttons still open it. If none is found, the buttons offer “Book a lesson” instead.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'text',
          id: 'first.handService',
          label: 'Your first handbuilding lesson (only if renamed)',
          help: 'Leave empty if its name in Services says “first”, “intro”, “taster” or “beginner” and “handbuilding”, “pinch”, “coil” or “slab”. If you rename it, type its exact new name here.',
          default: '',
          maxLength: 120,
        },
        {
          type: 'image',
          id: 'first.photo',
          label: 'Photo (upright)',
          help: `Upright (4:5). Remove it to show text only. ${SAMPLE_HELP}`,
          default: P('first-wedging', 'A potter in a grey apron leans over a canvas-covered table, wedging a block of pale clay with both hands.'),
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'kiln',
      label: 'Clay to kiln',
      description:
        'How a piece goes from wet clay to finished pottery — and the honest part: a booking reserves the lesson, not a kiln firing or a finished piece. Five stages, each with a short text and a square photo.',
      fields: [
        { type: 'text', id: 'kiln.title', label: 'Title', help: MARK_HELP, default: 'From wet clay to *your shelf*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'kiln.intro',
          label: 'Introduction',
          default:
            'A lesson ends with shaped, wet clay — not yet pottery. What happens next takes patience: the clay dries slowly, is fired once, glazed, and fired again. Here’s the whole journey, and who does what.',
          maxLength: 400,
          rows: 3,
        },
        { type: 'text', id: 'kiln.lessonLabel', label: 'Label over the first stage', default: 'Your lesson — the part you book', maxLength: 48, required: true },
        { type: 'text', id: 'kiln.afterLabel', label: 'Label over the other stages', default: 'Afterwards, at the studio — over the following weeks', maxLength: 64, required: true },
        ...stage(
          1,
          'Wet clay',
          'In your lesson you wedge, shape and choose up to two pieces to keep. They stay at the studio on a drying shelf.',
          S('stage-wet', 'A freshly wedged lump of pale clay, marked by fingers, sits on a wheel head.'),
        ),
        ...stage(
          2,
          'Leather-hard',
          'After a few days the clay is firm but still damp. Wheel pieces are trimmed now — by me, or by you in a Trimming & Refining session.',
          S('stage-leather', 'A clay-covered hand holds a tool against the side of a thrown pot as it turns on the wheel, fine rings in its wall.'),
        ),
        ...stage(
          3,
          'Bone dry',
          'Left to dry slowly and evenly, often for a week or more. Rushing it is how pieces crack.',
          S('stage-dry', 'Unfired cups and a small vase dry in a row along the top of a white radiator.'),
        ),
        ...stage(
          4,
          'Bisque',
          'The first firing turns clay into ceramic: hard, pale and porous, ready to take glaze.',
          S('stage-bisque', 'Small, white, unglazed hand-pinched bowls stacked on a wooden shelf, their rims soft and uneven.'),
        ),
        ...stage(
          5,
          'Glazed',
          'Glaze is applied — by me from the studio glazes, or by you in a Glazing Session — and the piece is fired a second time.',
          S('stage-glazed', 'Finished, glazed pottery on a wooden shelf: lilac dishes, white cups and a deep pink square plate.'),
        ),
        {
          type: 'text',
          id: 'kiln.boxTitle',
          label: 'The booking line — title',
          help: 'Set apart in a box. Keep its meaning: a booking reserves the lesson, not a kiln or a finished piece.',
          default: 'Your booking reserves the lesson — not a kiln',
          maxLength: 64,
          required: true,
        },
        {
          type: 'longText',
          id: 'kiln.boxText',
          label: 'The booking line — text',
          default:
            'Booking a lesson reserves your time with me at the wheel or the table. Drying, trimming, firing and glazing happen afterwards, on the studio’s kiln schedule, and aren’t part of the booking. There’s no fixed ready date: it’s often three to six weeks, depending on the piece and how full the kiln is.',
          maxLength: 460,
          rows: 4,
          required: true,
        },
        { type: 'text', id: 'kiln.crackTitle', label: 'Not every piece — title', default: 'Not every piece makes it', maxLength: 48 },
        {
          type: 'longText',
          id: 'kiln.crackText',
          label: 'Not every piece — text',
          default:
            'Clay keeps changing until its last firing. A thin spot can crack while drying, a wall can slump, a glaze can run. It happens to every potter, and it’s part of learning. If a piece doesn’t survive, I’ll tell you — and the next one will be better for it.',
          maxLength: 400,
          rows: 4,
        },
        {
          type: 'image',
          id: 'kiln.crackPhoto',
          label: 'Not every piece — photo (square)',
          help: `Square. Remove it to show text only. ${SAMPLE_HELP}`,
          default: S('process-crack', 'Looking down into a pale unfired bowl whose rim has cracked and split in several places.'),
          aspectRatio: 1,
        },
        { type: 'text', id: 'kiln.collectTitle', label: 'Collection — title', default: 'Collecting your pieces', maxLength: 48 },
        {
          type: 'longText',
          id: 'kiln.collectText',
          label: 'Collection — text',
          default:
            'When your pieces are out of the glaze firing, I’ll email or call you myself and we’ll arrange a time to collect them during opening hours — and settle the firing fee then. Finished pieces are kept for two months.',
          maxLength: 400,
          rows: 4,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'Where lessons happen: a few paragraphs, four photos and what the studio has. Each sample photo carries a “Sample” label until you replace it.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: MARK_HELP, default: 'One room, *one student at a time*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'The studio is a single workroom in an old brick building near the river: a wheel, a long wedging table, banding wheels, shelves of drying pots and a small electric kiln in the back room.\n\nOnly one lesson happens at a time, so the room is quiet, the wheel is yours, and there’s always time to ask “why did that happen?”.',
          maxLength: 900,
          rows: 6,
        },
        {
          type: 'image',
          id: 'studio.photo1',
          label: 'Photo 1 (wide)',
          help: `Wide (3:2). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: L('studio-window', 'A bright windowsill in a pottery studio lined with unfired cups and vessels, a potted plant and buckets of reclaimed clay, a radiator below.'),
          aspectRatio: 3 / 2,
        },
        { type: 'text', id: 'studio.caption1', label: 'Caption 1', default: 'Pieces drying slowly by the window', maxLength: 64 },
        {
          type: 'image',
          id: 'studio.photo2',
          label: 'Photo 2 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-room', 'A potter in a grey apron works at a dark table in a large workshop lined with white shelves of pots, bowls and glaze bottles.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption2', label: 'Caption 2', default: 'The workroom, with room to move around', maxLength: 64 },
        {
          type: 'image',
          id: 'studio.photo3',
          label: 'Photo 3 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-tools', 'Wooden modelling tools, wire loop tools and brushes standing in old glazed mugs on a work table.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption3', label: 'Caption 3', default: 'Tools you’ll use, cleaned after every lesson', maxLength: 64 },
        {
          type: 'image',
          id: 'studio.photo4',
          label: 'Photo 4 (upright)',
          help: `Upright (4:5). Remove it to show fewer. ${SAMPLE_HELP}`,
          default: P('studio-shelves', 'A tall wooden shelf of finished glazed pottery: stacked white bowls, pink and white cups, blue dishes and plates.'),
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'studio.caption4', label: 'Caption 4', default: 'Glazed and finished, waiting to go home', maxLength: 64 },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'In the studio',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 140 },
          ],
          default: [
            { title: 'One student at a time', text: 'No class around you, no one waiting for your wheel.' },
            { title: 'Wet cleaning', text: 'Tables, floors and wheels are cleaned with water and sponges, not swept, to keep clay dust down.' },
            { title: 'The kiln stays in the back room', text: 'Firing happens there between lessons, and only the teacher operates it.' },
            { title: 'Ask about access', text: 'If you have access needs, tell me before you book and I’ll describe the space honestly.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'Practical answers before a lesson. These are sample policies — make them yours.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 14,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What should I wear?',
              answer:
                'Comfortable clothes you don’t mind getting clay on, and closed-toe shoes. Tie long hair back and leave loose sleeves, scarves and bracelets aside near the wheel. An apron is provided.',
            },
            {
              question: 'Are clay and tools included?',
              answer:
                'Yes. The lesson price includes the clay you use in the session, tools, an apron and use of the wheel. Firing and glazing the pieces you keep are charged separately, per piece, when you collect them.',
            },
            {
              question: 'I’ve never done pottery. Which lesson should I book?',
              answer:
                'One of the two first lessons under “Start here”: the wheel if you’d like to try throwing round forms, handbuilding if you’d rather shape clay by hand. Both start from nothing.',
            },
            {
              question: 'Can I take my pottery home after the lesson?',
              answer:
                'Not on the day. What you make is wet clay: it has to dry, be trimmed if it was thrown, fired, glazed and fired again. I’ll contact you when it’s ready to collect.',
            },
            {
              question: 'How long until my pieces are ready?',
              answer:
                'Often three to six weeks, but there’s no fixed date — it depends on how thick the piece is, the weather, and the kiln schedule. I’ll let you know personally when they’re ready.',
            },
            {
              question: 'Who glazes my pieces?',
              answer:
                'I glaze them with one of the studio glazes, included in the firing fee — tell me your colour choice before you leave. If you’d like to glaze them yourself, book a Glazing Session once they’ve been bisque-fired.',
            },
            {
              question: 'What if my piece cracks in the kiln?',
              answer:
                'It can happen, especially with first pieces. If a piece cracks or breaks while drying or firing, I’ll tell you, and you won’t be charged the firing fee for it.',
            },
            {
              question: 'Can I book another lesson to keep learning?',
              answer:
                'Of course. After a first lesson, Private Wheel Lessons, Extended Wheel Practice and Handbuilding Studio Sessions build on what you’ve learned. Each is booked on its own — there are no courses or packages to sign up for.',
            },
            {
              question: 'How long is a lesson?',
              answer:
                'Each lesson shows its length under Lessons & prices — that’s your time in the studio. Please arrive five minutes early, and allow a few minutes after to wash up.',
            },
            {
              question: 'What about clay dust?',
              answer:
                'Dry clay dust shouldn’t be breathed in, so the studio is cleaned wet — sponges and mops, never a broom — and sanding dry pieces isn’t part of lessons. If you have a respiratory condition, mention it before you book so we can talk it through.',
            },
            {
              question: 'Is the studio accessible?',
              answer:
                'Please ask before you book if you have access needs — I’ll describe the entrance, the wheel and the work table honestly, and we can talk about whether handbuilding at the table might suit you better.',
            },
            {
              question: 'What if I need to cancel or reschedule?',
              answer:
                'Please call or email at least 48 hours before your lesson and I’ll move it for you. The booking system doesn’t move lessons by itself — I change it for you.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book a *lesson*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a lesson, then a time. No account needed — tell me a little about your pottery experience, and I’ll confirm your lesson personally.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Finding us',
          default:
            'In the River Arts District, in the brick building beside the railway line — Studio 4 is the door with the grey sign, at the end of the corridor. There’s free parking along Riverside Drive. The opening hours are lesson times: please book before you visit.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Private pottery lessons on the wheel and by hand — an independent studio in Asheville, North Carolina.',
          maxLength: 100,
        },
      ],
    },
  ],
});
