import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'ceramics-studio-greenware',
  preset: sitePreset,
  business: {
    name: 'Turning Room Pottery Studio',
    timezone: 'America/New_York',
    email: 'hello@turningroom.example',
    phone: '+1 828-555-0163',
    address: 'Studio 4, 122 Riverside Drive, Asheville, NC 28801',
  },
  ownerEmail: 'owner@turningroom.example',
  referencePrefix: 'TR',
  sampleNotes: [
    'I’ve never done pottery before — a friend has been trying to get me onto a wheel for years. Would love to try making a small bowl.',
    'I did a handbuilding class a few years ago and loved it. I’d like to make a set of small dishes with some texture.',
    'Second lesson after my first time at the wheel. Still fighting with centring!',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Nora Whitfield', email: 'nora.w@example.com', phone: '+1 828 555 0112' },
    { name: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 828 555 0125' },
    { name: 'Aiko Sato', email: 'aiko.sato@example.com', phone: '+1 828 555 0131' },
    { name: 'Daniel Ruiz', email: 'daniel.ruiz@example.com', phone: '+1 828 555 0148' },
    { name: 'Grace Okafor', email: 'grace.okafor@example.com', phone: '+1 828 555 0153' },
    { name: 'Ellie Turner', email: 'ellie.t@example.com', phone: '+1 828 555 0166' },
    { name: 'Sam Lindqvist', email: 'sam.lindqvist@example.com', phone: '+1 828 555 0172' },
    { name: 'Priya Nair', email: 'priya.nair@example.com', phone: '+1 828 555 0184' },
    { name: 'Tom Fischer', email: 'tom.fischer@example.com', phone: '+1 828 555 0197' },
    { name: 'Hannah Cole', email: 'hannah.cole@example.com', phone: '+1 828 555 0108' },
  ],
};
