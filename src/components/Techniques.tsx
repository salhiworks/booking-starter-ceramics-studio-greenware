import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { durationLabel, durationSpoken, priceLabel } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';

interface TechniquesProps {
  values: SiteValues;
  ownerFields: string[];
  wheel: Service | null;
  hand: Service | null;
  business: Business | null;
  onBook: StartBooking;
}

/** The fallback button when a technique has no first lesson in Services (it opens the lesson list). */
export const NO_FIRST_CTA = 'Book a lesson';

/**
 * Wheel throwing and handbuilding side by side — the same parts in the same order, so the two read
 * as an honest comparison: a photograph of the technique, what it is in plain words, four short
 * points, and that technique's first lesson (its real length and price from the engine) with a
 * button that opens the booking with it chosen.
 */
export function Techniques({ values, ownerFields, wheel, hand, business, onBook }: TechniquesProps) {
  const locale = business?.locale ?? 'en-US';
  const sides = [
    {
      id: 'wheel',
      title: values['tech.wheelTitle'],
      text: values['tech.wheelText'],
      points: values['tech.wheelPoints'],
      photo: values['tech.wheelPhoto'],
      sample: !ownerFields.includes('tech.wheelPhoto'),
      service: wheel,
      button: values['first.wheelButton'],
    },
    {
      id: 'hand',
      title: values['tech.handTitle'],
      text: values['tech.handText'],
      points: values['tech.handPoints'],
      photo: values['tech.handPhoto'],
      sample: !ownerFields.includes('tech.handPhoto'),
      service: hand,
      button: values['first.handButton'],
    },
  ] as const;
  return (
    <section id="techniques" className="section techniques" aria-labelledby="techniques-title">
      <div className="page">
        <header className="section-head">
          <SectionMark n={1} label="Wheel or hand" />
          <h2 id="techniques-title">
            <Emphasis text={values['tech.title']} />
          </h2>
          {values['tech.intro'] && <p className="section-intro">{values['tech.intro']}</p>}
        </header>
        <div className="techniques__pair">
          {sides.map((side) => (
            <article className={`technique technique--${side.id}`} key={side.id} aria-labelledby={`technique-${side.id}`}>
              <Frame className="technique__photo" image={side.photo} sizes="(min-width: 960px) 38vw, (min-width: 640px) 46vw, 100vw" sample={side.sample} />
              <div className="technique__body">
                <h3 id={`technique-${side.id}`} className="technique__title">
                  {side.title}
                </h3>
                {side.text && <p className="technique__text">{side.text}</p>}
                {side.points.length > 0 && (
                  <ul className="technique__points" role="list">
                    {side.points.map((p, i) => (
                      <li key={`${i}-${p.text}`}>{p.text}</li>
                    ))}
                  </ul>
                )}
                <div className="technique__start">
                  {side.service && (
                    <p className="technique__first">
                      <span className="technique__first-name">{side.service.name}</span>
                      <span className="technique__first-meta">
                        <span aria-hidden="true">{durationLabel(side.service.durationMinutes)}</span>
                        <span className="sr-only">{durationSpoken(side.service.durationMinutes)}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="sr-only">, </span>
                        {priceLabel(side.service, locale)}
                      </span>
                    </p>
                  )}
                  <a className="button button--ghost" href="#book" onClick={bookLink(onBook, side.service?.id)} data-first={side.id}>
                    {side.service ? side.button : NO_FIRST_CTA}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
