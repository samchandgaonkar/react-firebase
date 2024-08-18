import { useState } from 'react';
import { auth, authProvider } from '../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, authProvider);
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
            <button onClick={signIn}> Sign In </button>
            <button onClick={signInWithGoogle}> Sign In with Google</button>
            <button onClick={logOut}> LogOut</button>
        </div>
    )
}