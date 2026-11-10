import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's lesson list: its kinds, the two first lessons ("Start here"),
 * honest price and length terms, and each lesson's level and what it includes.
 *
 * The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when it
 * is built — so everything here is read from the service's own engine data:
 *
 *   1. its KIND, from its NAME against the rules below — first match wins;
 *      if the name has no matching words, its DESCRIPTION; otherwise "More sessions":
 *        - start   Start here               (first, intro, introduction, taster, beginner)
 *        - finish  Finishing & development  (trim, refine, glaze, finish, decorate, consult, technique)
 *        - lesson  Private lessons          (wheel, throwing, handbuilding, pinch, coil, slab, lesson, practice, session)
 *      An owner-chosen first lesson (Website → Your first lesson) is always "start".
 *   2. its TECHNIQUE, from its name: wheel (wheel, throw) or hand (handbuilding, pinch, coil, slab);
 *   3. what its LENGTH means (timeTerms): always the session itself — never the time until a piece is finished;
 *   4. what its PRICE means (priceTerms): the price of that one session, paid at the studio; zero is free;
 *      a starting price (`priceFrom`) reads "from";
 *   5. its LEVEL and what it INCLUDES: the parts of its description after "Level:" and "Includes:",
 *      split at "·" — written by the owner in Dashboard → Services.
 *
 * Stable categories, kiln schedules, firing status, packages or courses need an
 * engine version — see docs/ENGINE-PROPOSAL-ceramics-studio.md in the Niche Pack workspace.
 */
export type KindId = 'start' | 'lesson' | 'finish' | 'more';
export type Technique = 'wheel' | 'hand';
export type Role = 'first' | 'trim' | 'glaze' | 'lesson';

/** Content fields that belong to a kind (src/content/site.ts). */
export type KindNote = 'lessons.noteStart' | 'lessons.noteLesson' | 'lessons.noteFinish';

interface KindRule {
  id: KindId;
  label: string;
  note: KindNote | null;
  match: RegExp;
}

const START = /\b(first|intro|introduction|introductory|taster|beginners?|try)\b/i;
const FINISH = /\b(trim|trimming|refin\w*|glaz\w*|finish\w*|decorat\w*|consult\w*|technique|critique)\b/i;
const LESSON = /\b(wheel|throw\w*|hand-?build\w*|pinch\w*|coil\w*|slabs?|lessons?|practice|sessions?|class|pottery|ceramics?|clay)\b/i;

const RULES: KindRule[] = [
  { id: 'start', label: 'Start here', note: 'lessons.noteStart', match: START },
  { id: 'finish', label: 'Finishing & development', note: 'lessons.noteFinish', match: FINISH },
  { id: 'lesson', label: 'Private lessons', note: 'lessons.noteLesson', match: LESSON },
];

const MORE = { id: 'more', label: 'More sessions', note: null } as const;

/** The order kinds are shown in: the first lessons, then lessons, then finishing. */
const ORDER: KindId[] = ['start', 'lesson', 'finish', 'more'];

export interface Kind {
  id: KindId;
  label: string;
  note: KindNote | null;
  services: Service[];
}

const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

/**
 * The owner's own names for the two first lessons (Website → Your first lesson → "Your first wheel
 * lesson" / "Your first handbuilding lesson"), set once per render by App from the published content.
 * Empty = automatic. The engine (2.0.0-beta.3) gives services no build-time-stable key — only a database
 * id the site cannot know — so these explicit, owner-edited names are how a renamed first lesson stays one.
 */
const chosen: Record<Technique, string> = { wheel: '', hand: '' };

export function setFirstLessonNames(names: Partial<Record<Technique, string | null | undefined>>): void {
  chosen.wheel = norm(names.wheel ?? '');
  chosen.hand = norm(names.hand ?? '');
}

function chosenTechnique(name: string): Technique | null {
  const n = norm(name);
  if (chosen.wheel && n === chosen.wheel) return 'wheel';
  if (chosen.hand && n === chosen.hand) return 'hand';
  return null;
}

export function kindOf(service: Pick<Service, 'name' | 'description'>): KindRule | typeof MORE {
  if (chosenTechnique(service.name)) return RULES[0];
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? MORE;
}

/** Wheel or hand, read from the NAME (an owner-chosen first lesson keeps its technique). */
export function techniqueOf(service: Pick<Service, 'name'>): Technique | null {
  const picked = chosenTechnique(service.name);
  if (picked) return picked;
  if (/\bhand-?build\w*|\bpinch\w*|\bcoil\w*|\bslabs?\b|\bhand\b/i.test(service.name)) return 'hand';
  if (/\b(wheel|throw\w*|trim\w*)\b/i.test(service.name)) return 'wheel';
  return null;
}

/** What the session is, read from its NAME (the owner's words). */
export function roleOf(service: Pick<Service, 'name' | 'description'>): Role {
  if (kindOf(service).id === 'start') return 'first';
  if (/\btrim\w*\b/i.test(service.name)) return 'trim';
  if (/\bglaz\w*\b/i.test(service.name)) return 'glaze';
  return 'lesson';
}

/** Kept for the shared booking flow: lessons carry no size, so the name always comes back whole. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

/**
 * Services in their kinds, keeping the owner's display order inside each — except that in
 * "Start here" the first wheel lesson leads, then the first handbuilding lesson; empty kinds are left out.
 */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<KindId, Kind>();
  for (const service of services) {
    const rule = kindOf(service);
    let k = map.get(rule.id);
    if (!k) {
      k = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      map.set(rule.id, k);
    }
    k.services.push(service);
  }
  const start = map.get('start');
  if (start) {
    const rank = (s: Service) => (techniqueOf(s) === 'wheel' ? 0 : techniqueOf(s) === 'hand' ? 1 : 2);
    start.services.sort((a, b) => rank(a) - rank(b));
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/**
 * The first lesson for a technique — what "Start here", the hero and "Book a first wheel lesson" open
 * the booking with — read from the engine's CURRENT services (so its length and price are always live),
 * never a hard-coded id or price:
 *   1. the service the owner named in Website → Your first lesson (exact name, ignoring case and
 *      spaces) — survives any rename;
 *   2. otherwise the first "Start here" service of that technique (its name says first / intro /
 *      taster / beginner, and wheel / throw — or handbuilding / pinch / coil / slab);
 *   3. otherwise none — deleted, hidden or renamed without telling the site: the buttons then offer
 *      "Book a lesson" with nothing chosen, and no length or price is shown. An unrelated lesson is
 *      never chosen.
 */
export function firstLesson(services: readonly Service[], technique: Technique, chosenName?: string | null): Service | null {
  const wanted = norm(chosenName ?? '');
  if (wanted) {
    const named = services.find((s) => norm(s.name) === wanted);
    if (named) return named;
  }
  return (
    services.find((s) => START.test(s.name) && !chosenTechnique(s.name) && techniqueOf(s) === technique) ??
    services.find((s) => chosenTechnique(s.name) === technique) ??
    null
  );
}

/**
 * "Shape clay by hand… Level: complete beginners · … Includes: clay · tools" →
 * { lead, level: ["complete beginners", …], includes: ["clay", "tools"] }.
 * "For:" / "Suits:" are read as the level too. Without markers the whole description is the lead.
 */
export function splitDescription(description: string | null | undefined): { lead: string; level: string[]; includes: string[]; suits: string[] } {
  const text = (description ?? '').trim();
  const marker = /(?:^|[\s.])(level|for|suits|suited to|good for|includes|included)\s*:\s*/gi;
  const marks: { key: 'level' | 'includes'; start: number; end: number }[] = [];
  for (let m = marker.exec(text); m; m = marker.exec(text)) {
    const word = m[1].toLowerCase();
    marks.push({ key: word.startsWith('includ') ? 'includes' : 'level', start: m.index + (m[0].startsWith('.') ? 1 : 0), end: m.index + m[0].length });
  }
  if (marks.length === 0) return { lead: text, level: [], includes: [], suits: [] };
  const lead = text.slice(0, marks[0].start).trim();
  const out = { level: [] as string[], includes: [] as string[] };
  marks.forEach((mark, i) => {
    const chunk = text.slice(mark.end, i + 1 < marks.length ? marks[i + 1].start : undefined);
    out[mark.key].push(
      ...chunk
        .split(/\s*[·•;]\s*|\s+\|\s+/)
        .map((item) => item.trim().replace(/\.$/, ''))
        .filter(Boolean),
    );
  });
  return { lead, level: out.level, includes: out.includes, suits: out.level };
}

/** "45 min", "1 h 30 min", "2 h" — the session's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * What the booking's LENGTH means: always the real length of one private session in the studio —
 * never the time until a piece is fired and finished. Trimming and glazing say what they need.
 */
export interface TimeTerms {
  role: Role;
  /** Small label before the length. */
  label: string;
  /** One honest line under the length, or null. */
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  const role = roleOf(service);
  if (role === 'trim') return { role, label: 'Session', note: 'For pieces kept from a wheel lesson' };
  if (role === 'glaze') return { role, label: 'Session', note: 'For your bisque-fired pieces' };
  if (role === 'first') return { role, label: 'Session', note: 'No experience needed' };
  return { role, label: 'Session', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$95", not "$95.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site (src/lib/preset.ts):
 *   free    → no charge for this session
 *   from    → a starting price; the studio confirms it before the session
 *   fixed   → the price of this one session, paid at the studio
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  label: string;
  amount: string;
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Price', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Price', amount: 'Free', note: 'No charge for this session' };
  const amount = money(service.priceCents, service.currency, locale);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the session' };
  return { kind: 'fixed', label: 'Price', amount, note: null };
}

/** One line: "$95", "from $95", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}

/** Short form, for the hero line: same as priceLabel. */
export const shortPrice = priceLabel;
