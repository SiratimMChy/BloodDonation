/* eslint-disable react-refresh/only-export-components */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import auth from '../Firebase/firebase.config';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider
const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const registrationWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSignupWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    
    useEffect(() => {
        const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => {
            unSubscribed()
        }
    }, [])


    useEffect(() => {
        if (!user) return;
        axios.get(`https://blood-donation-backend-theta.vercel.app/users/role/${user?.email}`)
            .then(res => {
                setRole(res.data.role);
                setUserStatus(res.data.status);
                setRoleLoading(false);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user])

    const authData = {
        registrationWithEmailAndPassword,
        setUser,
        user,
        role,
        handleSignupWithGoogle,
        loading,
        roleLoading,
        userStatus

    }

    return <AuthContext value={authData}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
    </AuthContext>
};

export default AuthProvider;