import type { Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';
import { NO_FIRST_CTA } from './Techniques';

interface FirstLessonProps {
  values: SiteValues;
  ownerFields: string[];
  wheel: Service | null;
  hand: Service | null;
  onBook: StartBooking;
}

/**
 * For complete beginners, on the slip-coloured band: what happens in a first lesson as five numbered
 * steps, four quick answers to the usual worries (experience, a finished mug, taking it home, who
 * lessons are for), what to wear and bring, and the two first-lesson buttons. With no first lesson in
 * Services, one plain "Book a lesson" button remains.
 */
export function FirstLesson({ values, ownerFields, wheel, hand, onBook }: FirstLessonProps) {
  const steps = values['first.steps'];
  const answers = values['first.answers'];
  const wear = values['first.wear'];
  const photo = values['first.photo'];
  const buttons = [
    wheel && { id: wheel.id, label: values['first.wheelButton'], key: 'wheel' },
    hand && { id: hand.id, label: values['first.handButton'], key: 'hand' },
  ].filter((b): b is { id: string; label: string; key: string } => Boolean(b));
  return (
    <section id="first-lesson" className="section band band--slip first" aria-labelledby="first-title">
      <div className="page">
        <div className={`first__top ${photo ? '' : 'first__top--text'}`}>
          <header className="section-head first__head">
            <SectionMark n={3} label="First lesson" />
            <h2 id="first-title">
              <Emphasis text={values['first.title']} />
            </h2>
            {values['first.intro'] && <p className="section-intro">{values['first.intro']}</p>}
            <div className="first__actions">
              {buttons.length > 0 ? (
                buttons.map((b, i) => (
                  <a key={b.key} className={`button ${i > 0 ? 'button--ghost' : ''}`} href="#book" onClick={bookLink(onBook, b.id)} data-first={b.key}>
                    {b.label}
                  </a>
                ))
              ) : (
                <a className="button" href="#book" onClick={bookLink(onBook)}>
                  {NO_FIRST_CTA}
                </a>
              )}
            </div>
          </header>
          <Frame className="first__photo" image={photo} sizes="(min-width: 960px) 34vw, 100vw" sample={!ownerFields.includes('first.photo')} />
        </div>

        {steps.length > 0 && (
          <ol className="steps first__steps" role="list">
            {steps.map((s, i) => (
              <li className="step" key={`${i}-${s.title}`}>
                <span className="step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="step__title">{s.title}</p>
                {s.text && <p className="step__text">{s.text}</p>}
              </li>
            ))}
          </ol>
        )}

        <div className="first__bottom">
          {answers.length > 0 && (
            <dl className="answers">
              {answers.map((a, i) => (
                <div className="answer" key={`${i}-${a.question}`}>
                  <dt>{a.question}</dt>
                  {a.answer && <dd>{a.answer}</dd>}
                </div>
              ))}
            </dl>
          )}
          {wear.length > 0 && (
            <div className="wear">
              {values['first.wearTitle'] && <h3 className="wear__title">{values['first.wearTitle']}</h3>}
              <ul className="wear__list" role="list">
                {wear.map((w, i) => (
                  <li key={`${i}-${w.text}`}>{w.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
