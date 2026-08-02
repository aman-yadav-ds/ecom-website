// Navbar.tsx — Server Component
// No "use client" directive. This file has no browser APIs, no hooks, and no
// event handlers. All interactivity is delegated to NavbarClient (Client Component).
//
// Why this matters for SEO & performance:
//   • This module is excluded from the client-side JS bundle entirely.
//   • Next.js pre-renders this component on the server, so its import tree
//     (NavbarClient) is the only JS that ships to the browser.
//   • Any future static content added here (e.g., an aria-label, a static link)
//     is immediately crawler-visible without JS.

import NavbarClient from "./NavbarClient";

export default function Navbar() {
  return <NavbarClient />;
}
