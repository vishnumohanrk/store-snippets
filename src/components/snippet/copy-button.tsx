'use client';

import { useEffect, useRef, useState } from 'react';
import { MdCheck, MdClose, MdContentCopy } from 'react-icons/md';

import { ICON_BTN_CLASS } from '../utils';

export function CopyButton({ text }: { text: string }) {
  const timerRef = useRef<NodeJS.Timeout>();
  const [status, setStatus] = useState<keyof typeof icons>('init');

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  async function copyText() {
    clearTimeout(timerRef.current);

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
        timerRef.current = setTimeout(() => setStatus('init'), 2000);
      } catch (error) {
        setStatus('failed');
      }
    }
  }

  const Icon = icons[status];

  return (
    <button
      type="button"
      title="Copy Code"
      onClick={copyText}
      className={ICON_BTN_CLASS}
    >
      <Icon size={18} />
    </button>
  );
}

const icons = {
  failed: MdClose,
  copied: MdCheck,
  init: MdContentCopy,
} as const;
