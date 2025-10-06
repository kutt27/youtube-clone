"use client"

import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase"
import { User } from "firebase/auth";
import Image from "next/image";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        color: '#065fd4',
        border: '1px solid #065fd4',
        borderRadius: '2px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s'
    };

    return (
        <Fragment>
            {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {user.photoURL && (
                        <Image
                            src={user.photoURL}
                            alt="Profile"
                            width={32}
                            height={32}
                            style={{ borderRadius: '50%' }}
                        />
                    )}
                    <button
                        style={buttonStyle}
                        onClick={signOut}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    style={buttonStyle}
                    onClick={signInWithGoogle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                        <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                        <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                        <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
                    </svg>
                    Sign In
                </button>
            )}
        </Fragment>
    )
}
