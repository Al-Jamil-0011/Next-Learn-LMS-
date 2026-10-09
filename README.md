# NextLearn — React

The NextLearn v6 website (Home, Courses, Course details, Success stories, Free class, Contact) as a
React project built with **Vite** and **React Router**. Every page, animation and interaction from the
design demo is carried over: curtain page transitions, Bangla / English toggle, course filters and
pagination, the course details buy card with live countdown and scroll-following tabs, the 3-step
enrolment flow, free class booking, contact form, newsletter and confetti.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  main.jsx                 entry, loads the global styles
  App.jsx                  providers + routes
  pages/                   one file per page (HomePage, CoursesPage, CoursePage, …)
  components/
    layout/                TopBar, Header, Footer, Newsletter, Curtain, ScrollChrome, Layout
    home/                  hero, stats, categories, featured courses, how it works, mentors, …
    courses/               course card + banner, type tiles, filter sidebar, catalogue grid
    course/                buy card, countdown, curriculum
    enrol/                 enrolment modal (plan → mobile + OTP → payment → receipt)
    common/                Icon, Media (photo slot), Reveal, Lines, Toast, Confetti, FaqList, …
  context/                 LanguageContext, AppContext (toast, modal, enrolments), CatalogueContext (filters)
  hooks/                   useInView, useCountUp, useScroll, usePointerEffects, useDocumentTitle
  data/courses.js          courses, categories, mentors, stories, FAQ, free class slots
  data/images.js           photo slots (see below)
  i18n/dict.js             static copy in English and Bangla, by key
  i18n/strings.js          labels built in code (plurals, numbers, filter names)
  styles/                  base.css + sections.css (the original design system, unchanged)
```

## Common edits

- **Add or change a course:** edit `COURSES` in `src/data/courses.js`. The cards, filters, counts and
  course page update automatically. Course URLs look like `/course/4-mern-stack`.
- **Change text:** English and Bangla copy live side by side in `src/i18n/dict.js` (`EN` and `BN`).
- **Add real photos:** every photo spot shows a labelled placeholder. Put images in `src/assets/photos/`,
  import them in `src/data/images.js` and add `src` to the slot, for example
  `hero: { alt: '…', src: heroImg }`. Mentor and student slots show initials until a photo is set.
- **Colours and fonts:** CSS variables at the top of `src/styles/base.css`.

## Deploying

The app uses real URLs (`/courses`, `/course/…`), so the host must send every path to `index.html`.
This is already set up for Netlify (`public/_redirects`) and Vercel (`vercel.json`). To serve from a
sub-folder, build with `npx vite build --base=/your-folder/`.

## Notes

- Log in, dashboard, payments and SMS are demo-only, as in the design: enrolment is stored in the
  browser (`localStorage`), and any 4 digits pass the OTP step. Coupon `NEXT10` gives 10% off.
- Motion respects the "reduce motion" system setting.
