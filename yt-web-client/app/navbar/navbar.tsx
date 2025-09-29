"use client"

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Navbar() {
    // init user state
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unSubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        // cleanup subscription on unmount
        return () => {
            unSubscribe();
        };
    });
  
    return (
    <nav className={styles.nav}>
        <Link href="/">
            <span className={styles.logoContainer}>
                <Image src="/youtube.svg" alt="YouTube Logo" width={60} height={40} />
            </span>
        </Link>
        <SignIn user={user}/>
    </nav>
  )
}
