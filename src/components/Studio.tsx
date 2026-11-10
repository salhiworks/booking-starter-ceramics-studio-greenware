import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Frame } from './Frame';
import { SectionMark } from './SectionMark';

const SLOTS = [1, 2, 3, 4] as const;
/** The Live Demo and preview mode show a fictional studio: say so. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

/**
 * The studio, on the wet-clay band: the owner's text and facts beside a wide photograph, then up to
 * three upright frames with captions. While any frame is a sample, a note says the photographs show
 * another workshop — never this studio, its teacher or its students.
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const frames = SLOTS.flatMap((n) => {
    const image = values[`studio.photo${n}`];
    return image ? [{ n, image, caption: values[`studio.caption${n}`].trim(), sample: !ownerFields.includes(`studio.photo${n}`) }] : [];
  });
  const wide = frames.find((f) => f.n === 1) ?? null;
  const rest = frames.filter((f) => f.n !== 1);
  const facts = values['studio.facts'];
  const anySample = frames.some((f) => f.sample);
  return (
    <section id="studio" className="section band band--clay studio" aria-labelledby="studio-title">
      <div className="page">
        <div className={`studio__top ${wide ? '' : 'studio__top--text'}`}>
          <div className="studio__words">
            <header className="section-head">
              <SectionMark n={5} label="The studio" tone="on-dark" />
              <h2 id="studio-title">
                <Emphasis text={values['studio.title']} />
              </h2>
            </header>
            {values['studio.text'] && <p className="studio__text prewrap">{values['studio.text']}</p>}
          </div>
          {wide && <Frame className="studio__wide" image={wide.image} sizes="(min-width: 960px) 52vw, 100vw" sample={wide.sample} caption={wide.caption || undefined} />}
        </div>

        {rest.length > 0 && (
          <div className="studio__frames" data-count={rest.length}>
            {rest.map((f) => (
              <Frame key={f.n} className="studio__frame" image={f.image} sizes="(min-width: 960px) 26vw, (min-width: 640px) 33vw, 80vw" sample={f.sample} caption={f.caption || undefined} />
            ))}
          </div>
        )}

        {anySample && (
          <p className="studio__sample-note">
            {SAMPLE_BUSINESS
              ? 'Turning Room is a fictional sample studio. These photographs are licensed sample images of another pottery workshop — not this studio, its teacher or its students.'
              : 'Sample photographs of another pottery workshop — not this studio, its teacher or its students.'}
          </p>
        )}

        {facts.length > 0 && (
          <dl className="studio__facts">
            {facts.map((f, i) => (
              <div className="studio__fact" key={`${i}-${f.title}`}>
                <dt>{f.title}</dt>
                {f.text && <dd>{f.text}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
