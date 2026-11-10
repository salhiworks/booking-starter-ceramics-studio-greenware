import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, kinds, priceTerms, splitDescription, timeTerms } from '../lib/services';
import type { KindId } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { SectionMark } from './SectionMark';

interface LessonsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/** Kinds whose lessons make new pieces: their price carries the "firing extra" line. */
const SHAPING: readonly KindId[] = ['start', 'lesson'];

/**
 * Lessons & prices, straight from the engine: every name, length and price is the one the booking
 * uses. First three plain facts the owner can edit (one booking = one private lesson · the time is
 * the session · paid at the studio); then the lessons in their kinds — Start here, Private lessons,
 * Finishing & development — each row with what happens, its level and what it includes (from the
 * owner's "Level:" and "Includes:"), its length and price and a Book button that opens the booking
 * with it chosen. Then what a lesson includes and what is arranged afterwards (the firing policy),
 * and the owner's note about prices.
 */
export function Lessons({ values, services, business, onRetry, onBook }: LessonsProps) {
  const locale = business?.locale ?? 'en-US';
  const all = services.status === 'ready' ? services.data : [];
  const groups = kinds(all);
  const terms = values['lessons.terms'];
  const firingRow = values['lessons.firingRow'].trim();
  const included = values['materials.included'];
  const extra = values['materials.extra'];

  return (
    <section id="lessons" className="section lessons" aria-labelledby="lessons-title">
      <div className="page">
        <header className="section-head">
          <SectionMark n={2} label="Lessons & prices" />
          <h2 id="lessons-title">
            <Emphasis text={values['lessons.title']} />
          </h2>
          {values['lessons.intro'] && <p className="section-intro">{values['lessons.intro']}</p>}
        </header>

        {terms.length > 0 && (
          <ul className="terms" role="list">
            {terms.map((t, i) => (
              <li className="term" key={`${i}-${t.title}`}>
                <p className="term__title">{t.title}</p>
                {t.text && <p className="term__text">{t.text}</p>}
              </li>
            ))}
          </ul>
        )}

        {services.status === 'loading' && (
          <div className="lessons__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading lessons…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Lessons and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load the lessons and prices just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && all.length === 0 && (
          <p className="quiet-state">Lessons will be listed here soon. In the meantime, please call or email the studio.</p>
        )}

        {groups.map((g) => (
          <div className={`kind kind--${g.id}`} key={g.id} aria-labelledby={`kind-${g.id}`}>
            <div className="kind__head">
              <h3 id={`kind-${g.id}`} className="kind__title">
                {g.label}
              </h3>
              {g.note && values[g.note] && <p className="kind__note">{values[g.note]}</p>}
            </div>
            <ul className="kind__list" role="list">
              {g.services.map((s) => (
                <LessonRow key={s.id} service={s} locale={locale} firing={SHAPING.includes(g.id) ? firingRow : ''} onBook={onBook} />
              ))}
            </ul>
          </div>
        ))}

        {(included.length > 0 || extra.length > 0) && (
          <div className="materials" aria-labelledby="materials-title">
            <h3 id="materials-title" className="materials__title">
              <Emphasis text={values['materials.title']} />
            </h3>
            <div className="materials__cols">
              {included.length > 0 && (
                <div className="materials__col materials__col--in">
                  <p className="materials__label">In the lesson price</p>
                  <ul className="materials__list" role="list">
                    {included.map((item, i) => (
                      <li key={`${i}-${item.text}`}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              )}
              {extra.length > 0 && (
                <div className="materials__col materials__col--after">
                  <p className="materials__label">Arranged after the lesson</p>
                  <dl className="materials__extra">
                    {extra.map((item, i) => (
                      <div key={`${i}-${item.title}`}>
                        <dt>{item.title}</dt>
                        {item.text && <dd>{item.text}</dd>}
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        )}

        {values['lessons.priceNote'] && <p className="lessons__price-note prewrap">{values['lessons.priceNote']}</p>}
      </div>
    </section>
  );
}

function LessonRow({ service, locale, firing, onBook }: { service: Service; locale: string; firing: string; onBook: StartBooking }) {
  const { lead, level, includes } = splitDescription(service.description);
  const time = timeTerms(service);
  const price = priceTerms(service, locale);
  return (
    <li className={`row row--${time.role}`} data-service={service.name}>
      <div className="row__main">
        <h4 className="row__name">{service.name}</h4>
        {time.note && <p className="row__flag">{time.note}</p>}
        {lead && <p className="row__lead">{lead}</p>}
        {(level.length > 0 || includes.length > 0) && (
          <dl className="row__facts">
            {level.length > 0 && (
              <div>
                <dt>Level</dt>
                <dd>{level.join(' · ')}</dd>
              </div>
            )}
            {includes.length > 0 && (
              <div>
                <dt>Includes</dt>
                <dd>{includes.join(' · ')}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
      <dl className="row__figures">
        <div>
          <dt>{time.label}</dt>
          <dd>
            <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
            <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
          </dd>
        </div>
        <div>
          <dt>{price.label}</dt>
          <dd>{price.amount}</dd>
          {price.note && <dd className="row__price-note">{price.note}</dd>}
          {firing && price.kind !== 'request' && <dd className="row__price-note">{firing}</dd>}
        </div>
      </dl>
      <a className="button button--small row__book" href="#book" onClick={bookLink(onBook, service.id)}>
        Book<span className="sr-only"> {service.name}</span>
      </a>
    </li>
  );
}
