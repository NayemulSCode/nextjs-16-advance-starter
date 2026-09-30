import type { ReactNode } from 'react';
import '@/styles/codeware.css';
import { CwRuntime } from './runtime';
import { SPRITE, shellTail } from './render';

/**
 * Page wrapper. `.cw` scopes the Codeware stylesheet so it never leaks into the Puck editor UI.
 * Dialogs + behaviours are only added on the live site, not inside the editor canvas.
 */
export function CwShell({
  children,
  editing,
  email,
}: {
  children: ReactNode;
  editing?: boolean;
  email?: string;
}) {
  return (
    <div className="cw" id="main">
      <div dangerouslySetInnerHTML={{ __html: SPRITE }} />
      {children}
      {!editing && (
        <>
          <div
            style={{ display: 'contents' }}
            dangerouslySetInnerHTML={{
              __html: shellTail(email || 'info@codewareltd.com'),
            }}
          />
          <CwRuntime />
        </>
      )}
    </div>
  );
}
