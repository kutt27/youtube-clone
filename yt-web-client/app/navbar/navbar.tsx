'use client';

import Image from "next/image";
import Link from "next/link";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";
import SignIn from "./sign-in";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left: YouTube Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image
          src="/youtube.svg"
          alt="YouTube Logo"
          width={90}
          height={20}
          style={{ cursor: 'pointer' }}
        />
      </Link>

      {/* Center: Upload (only when logged in) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {user && <Upload />}
      </div>

      {/* Right: Sign In/Out */}
      <div>
        <SignIn user={user} />
      </div>
    </nav>
  );
}
