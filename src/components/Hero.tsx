import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { bookLink } from '../lib/bookLink';
import { durationLabel, durationSpoken, priceLabel } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 42vw, 100vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  /** The two first lessons from the engine (Website → Your first lesson), or null when there is none. */
  wheel: Service | null;
  hand: Service | null;
  business: Business | null;
  onBook: StartBooking;
}

/**
 * The first screen. Left: where and what, a large headline with one italic phrase in the brand
 * colour, one paragraph, "Book a lesson" (the booking opens on the lesson list) and a quiet second
 * button to the prices; then "Never tried pottery? Start here." — the two first lessons with their
 * real length and price from the engine, each opening the booking with it chosen — and today's hours.
 * Right: hands centring clay on the wheel, captioned. Phones: words and actions first, then the
 * photo, then Start here.
 */
export function Hero({ values, ownerFields, status, wheel, hand, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const secondary = values['hero.secondary'].trim();
  const locale = business?.locale ?? 'en-US';
  const starts = [wheel, hand].filter((s): s is Service => s !== null);
  const startTitle = values['hero.startTitle'].trim();
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
            </a>
            {secondary && (
              <a className="button button--ghost button--large" href="#lessons">
                {secondary}
              </a>
            )}
          </div>
          {status && (
            <p className="open-status hero__status hero__enter" data-open={status.open}>
              <span className="open-status__dot" aria-hidden="true" />
              {status.text}
            </p>
          )}
        </div>

        {photo && (
          <Frame
            className="hero__visual"
            image={photo}
            sizes={HERO_SIZES}
            priority
            sample={sample}
            caption={values['hero.caption'].trim() || undefined}
          />
        )}

        {startTitle && starts.length > 0 && (
          <aside className="start-here hero__enter" aria-labelledby="start-here-title">
            <h2 id="start-here-title" className="start-here__title">
              {startTitle}
            </h2>
            <ul className="start-here__list" role="list">
              {starts.map((s) => (
                <li key={s.id}>
                  <a className="start-here__item" href="#book" onClick={bookLink(onBook, s.id)} data-service={s.name}>
                    <span className="start-here__name">{s.name}</span>
                    <span className="start-here__meta">
                      <span aria-hidden="true">{durationLabel(s.durationMinutes)}</span>
                      <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                      {priceLabel(s, locale)}
                    </span>
                    <span className="start-here__go" aria-hidden="true">
                      Book →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {values['hero.startNote'] && <p className="start-here__note">{values['hero.startNote']}</p>}
          </aside>
        )}
      </div>
    </section>
  );
}
