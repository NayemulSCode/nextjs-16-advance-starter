'use client';

import Script from 'next/script';

/** Menus, dialogs, carousels, scroll scene, tabs and the enquiry form (public/codeware/runtime.js). */
export function CwRuntime() {
  return <Script src="/codeware/runtime.js" strategy="afterInteractive" />;
}
