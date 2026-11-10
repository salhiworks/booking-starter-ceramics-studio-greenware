import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';

const STAGES = [1, 2, 3, 4, 5] as const;

/**
 * From wet clay to a finished piece — the section that keeps the booking honest. The five stages
 * run in a row (a swipe rail on phones), each with its colour from the stage line, a square photo
 * and one line; a bracket over the first stage reads "Your lesson — the part you book", one over the
 * other four "Afterwards, at the studio". Then the ruled box: a booking reserves the lesson, not a
 * kiln or a ready date; that not every piece makes it; and how collection is arranged — personally,
 * never by the booking system.
 */
export function Kiln({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const stage = (n: (typeof STAGES)[number]) => ({
    title: values[`kiln.stage${n}`],
    text: values[`kiln.stage${n}Text`],
    photo: values[`kiln.stage${n}Photo`],
    sample: !ownerFields.includes(`kiln.stage${n}Photo`),
  });
  const crackPhoto = values['kiln.crackPhoto'];
  return (
    <section id="clay-to-kiln" className="section kiln" aria-labelledby="kiln-title">
      <div className="page">
        <header className="section-head">
          <SectionMark n={4} label="Clay to kiln" />
          <h2 id="kiln-title">
            <Emphasis text={values['kiln.title']} />
          </h2>
          {values['kiln.intro'] && <p className="section-intro">{values['kiln.intro']}</p>}
        </header>

        <div className="journey">
          <div className="journey__brackets" aria-hidden="true">
            <span className="journey__bracket journey__bracket--lesson">{values['kiln.lessonLabel']}</span>
            <span className="journey__bracket journey__bracket--after">{values['kiln.afterLabel']}</span>
          </div>
          <ol className="journey__stages" role="list">
            {STAGES.map((n) => {
              const s = stage(n);
              return (
                <li className={`journey__stage journey__stage--${n}`} key={n} data-part={n === 1 ? 'lesson' : 'after'}>
                  <p className="journey__part">{n === 1 ? values['kiln.lessonLabel'] : values['kiln.afterLabel']}</p>
                  <Frame className="journey__photo" image={s.photo} sizes="(min-width: 960px) 18vw, (min-width: 640px) 30vw, 62vw" sample={s.sample} />
                  <p className="journey__name">
                    <span className="journey__n" aria-hidden="true">
                      {n}
                    </span>
                    {s.title}
                  </p>
                  {s.text && <p className="journey__text">{s.text}</p>}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="kiln__notes">
          <div className="boundary">
            <p className="boundary__title">{values['kiln.boxTitle']}</p>
            <p className="boundary__text">{values['kiln.boxText']}</p>
          </div>
          {(values['kiln.crackTitle'] || values['kiln.crackText']) && (
            <div className={`kiln__note kiln__note--crack ${crackPhoto ? '' : 'kiln__note--text'}`}>
              <Frame className="kiln__crack-photo" image={crackPhoto} sizes="(min-width: 960px) 10rem, 7rem" sample={!ownerFields.includes('kiln.crackPhoto')} />
              <div>
                {values['kiln.crackTitle'] && <h3 className="kiln__note-title">{values['kiln.crackTitle']}</h3>}
                {values['kiln.crackText'] && <p className="kiln__note-text">{values['kiln.crackText']}</p>}
              </div>
            </div>
          )}
          {(values['kiln.collectTitle'] || values['kiln.collectText']) && (
            <div className="kiln__note kiln__note--collect">
              {values['kiln.collectTitle'] && <h3 className="kiln__note-title">{values['kiln.collectTitle']}</h3>}
              {values['kiln.collectText'] && <p className="kiln__note-text">{values['kiln.collectText']}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
