'use client';

import { useState } from 'react';
import { Puck, type Data } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { config } from '@/puck/config';

export function Editor({
  path,
  initialData,
  adminUrl,
  expiresAt,
}: {
  path: string;
  initialData: Data;
  adminUrl: string;
  expiresAt: number;
}) {
  const [status, setStatus] = useState<
    'idle' | 'saving' | 'saved' | 'expired' | 'error'
  >('idle');

  async function publish(data: Data) {
    setStatus('saving');
    const res = await fetch('/api/editor/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, data }),
    });
    if (res.status === 401) return setStatus('expired');
    setStatus(res.ok ? 'saved' : 'error');
  }

  return (
    <>
      {status === 'expired' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,.6)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 24,
              borderRadius: 12,
              maxWidth: 380,
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontWeight: 600, fontSize: 18 }}>Session expired</h2>
            <p style={{ margin: '8px 0 16px' }}>
              Your edit session ended. Go back to the admin to reopen this page.
            </p>
            <a
              href={adminUrl}
              style={{
                background: '#000',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 6,
              }}
            >
              Back to admin
            </a>
          </div>
        </div>
      )}
      <Puck
        config={config}
        data={initialData}
        headerPath={path}
        headerTitle="Page editor"
        onPublish={publish}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <span style={{ fontSize: 12, color: '#666', marginRight: 8 }}>
                {status === 'saving' && 'Saving…'}
                {status === 'saved' && 'Published ✓'}
                {status === 'error' && 'Save failed'}
                {status === 'idle' &&
                  `Session ends ${new Date(expiresAt * 1000).toLocaleTimeString()}`}
              </span>
              <a
                href={path}
                target="_blank"
                rel="noreferrer"
                style={{ marginRight: 8, fontSize: 14 }}
              >
                View page ↗
              </a>
              {children}
            </>
          ),
        }}
      />
    </>
  );
}
