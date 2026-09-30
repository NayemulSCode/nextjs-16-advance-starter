'use client';

import { useRef, useState } from 'react';

export function ImageInput({
  name,
  label,
  kind,
  value,
  onChange,
}: {
  name: string;
  label: string;
  kind: 'image' | 'video';
  value?: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File) {
    setBusy(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      if (res.status === 401)
        throw new Error('Session expired – reopen from the admin.');
      if (!res.ok) throw new Error('Upload failed');
      onChange((await res.json()).url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      {value && kind === 'image' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{
            maxHeight: 140,
            objectFit: 'contain',
            borderRadius: 6,
            border: '1px solid #ddd',
          }}
        />
      )}
      <input
        name={name}
        type="text"
        placeholder="https://… or upload"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: 8,
          border: '1px solid #ccc',
          borderRadius: 6,
          width: '100%',
        }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          style={{
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          {busy
            ? 'Uploading…'
            : kind === 'video'
              ? 'Upload video'
              : 'Upload image'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Remove
          </button>
        )}
      </div>
      {error && <span style={{ color: '#c00', fontSize: 12 }}>{error}</span>}
      <input
        ref={inputRef}
        type="file"
        accept={kind === 'video' ? 'video/mp4,video/webm' : 'image/*'}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}
