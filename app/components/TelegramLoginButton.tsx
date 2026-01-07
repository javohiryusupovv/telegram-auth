'use client';

import { useEffect, useRef } from 'react';

export type TGUser = {
  id: number;
  username?: string;
  photo_url?: string;
  first_name: string;
  last_name?: string;
  auth_date: number;
  hash: string;
};

type Props = {
  botName: string;
  onAuthCallback?: (user: TGUser) => void;
};

export default function TelegramLoginButton({
  botName,
  onAuthCallback,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (onAuthCallback) {
      (window as any).TelegramOnAuthCb = (user: TGUser) => {
        onAuthCallback(user);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.async = true;

    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'TelegramOnAuthCb(user)');
    script.setAttribute('data-lang', 'ru');

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      (window as any).TelegramOnAuthCb = undefined;
    };
  }, [botName, onAuthCallback]);

  return <div ref={containerRef} />;
}
