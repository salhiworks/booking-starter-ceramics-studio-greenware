import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Besley (headings, figures, italic highlights) and Karla (everything else). Latin subsets only.
import '@fontsource/besley/latin-500.css';
import '@fontsource/besley/latin-500-italic.css';
import '@fontsource/karla/latin-400.css';
import '@fontsource/karla/latin-600.css';
import '@fontsource/karla/latin-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import './styles/booking.css';
import { App } from './App';
import { engine } from './lib/engine';
import type { DemoEngine } from './demo/engine';

if (__BOOKING_DEMO__) void import('./demo/engine/DemoBar').then((m) => m.mountDemoBar(engine as DemoEngine, 'site'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
