'use client';

import TelegramLoginButton, { TGUser } from "../components/TelegramLoginButton";


export default function LoginPage() {
  const handleTelegramAuth = (user: TGUser) => {
    console.log('Telegram user:', user);

    // bu yerda:
    // - backendga yuborasiz
    // - yoki session saqlaysiz
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <TelegramLoginButton
        botName="getusersai_bot"
        onAuthCallback={handleTelegramAuth}
      />
    </div>
  );
}
