"use client"

import React from 'react';
import {createContext, useState, useEffect } from 'react'
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import Firebase from '../firebase/firebase';

const auth = getAuth(Firebase);


//creates user context
export const AuthContext = createContext({});

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkLogin = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};