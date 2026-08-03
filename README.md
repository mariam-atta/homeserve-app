# HomeServe

A full-stack-feeling home services booking platform built with React — browse services, book a professional, manage bookings, and pay by cash or card (demo flow), all with a clean, responsive UI.

**Live site:** [homeserve-app.vercel.app](https://homeserve-app.vercel.app)

---

## Features

- **Browse services** — filterable category grid (Cleaning, Plumbing, Electrician, AC Repair, Painting, Carpentry, Appliance Repair, Pest Control), each with a detail page showing pricing, features, and reviews.
- **Book a service** — full booking form with date/time selection and validation.
- **Choose Cash or Card at checkout** — selecting Card routes to a dedicated payment details page before the booking is finalized. This is a demo flow: no real payment is processed, and full card numbers/CVV are never stored (only the last 4 digits, for display).
- **User Dashboard** — view, reschedule, or cancel any upcoming booking. Completed bookings are locked from further changes.
- **Admin Panel** — view all bookings platform-wide, update status (Pending / Confirmed / Completed / Due), and remove bookings.
- **Help Center** — accordion-style FAQ topics grouped by category, plus a separate detailed FAQ page.
- **Contact form** — with validation and a confirmation screen on submit.
- **Fully responsive navbar** — collapses into a hamburger menu on smaller screens.
- **Consistent page layout** — shared spacing/container handled centrally via a `Layout` component, so every page stays visually consistent.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev) | Component-based UI |
| [Vite](https://vitejs.dev) | Dev server & build tool |
| [React Router](https://reactrouter.com) | Client-side routing/navigation |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Heroicons](https://heroicons.com) | Icon set |
| React Context API | Shared booking state across pages |
| `localStorage` | Persists bookings across page refreshes |

No backend or database is used — all booking data lives in the browser via Context + `localStorage`.

---

## Getting Started

Clone the repo and run it locally:

```bash
git clone https://github.com/mariam-atta/homeserve-app.git
cd homeserve-app
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

To build for production:

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Project Structure

```
src/
├── assets/            # Images (hero, service photos, About Us team photo)
├── components/        # Shared UI: Navbar, Footer, Layout, ScrollToTop
├── context/            
│   └── BookingsContext.jsx   # Global booking state (add/update/remove)
├── data/               
│   ├── faqs.js         # FAQ page content
│   └── helpTopics.js   # Help Center topic content
├── pages/              # One component per route
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── ServiceDetails.jsx
│   ├── Booking.jsx
│   ├── CardDetails.jsx
│   ├── BookingConfirmed.jsx
│   ├── UserDashboard.jsx
│   ├── AdminPanel.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── MessageSent.jsx
│   ├── Faq.jsx
│   ├── HelpCenter.jsx
│   └── Blog.jsx
├── App.jsx             # Route definitions
├── main.jsx             
└── index.css           # Tailwind directives
```

---

## Known Limitations

This is a course/practice project, so a few things are intentionally out of scope:

- **No authentication** — there are no user accounts or login. The User Dashboard and Admin Panel currently read from the same shared booking list rather than per-user data.
- **No real payment processing** — the Card payment flow is a UI simulation only; there's no integration with an actual payment gateway.
- **No backend/database** — all data is stored client-side via `localStorage`, so it's local to a single browser and not shared across devices.

---

## Deployment

Hosted on [Vercel](https://vercel.com), connected directly to this GitHub repository. Every push to `main` automatically triggers a rebuild and redeploy.

---

## License

This project was built for educational purposes.
