import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireStore } from '../config/firebase';
import ChatIcon from '../assets/chat-icon.png';
import { LoginForm } from '../components/form';
import { collection, doc, updateDoc } from 'firebase/firestore';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const Login = async () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                await updateDoc(doc(fireStore, "users", response.user.uid), {
                    isOnline: true
                })
                console.log({ message: "user has been login successfully" })
                setLoading(false)
            })
            .catch((error) => {
                console.log({ message: error.code })
                setLoading(false)
            })
    }

    return (
        <>
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                ChatIcon={ChatIcon}
                Login={Login}
                loading={loading}
            />
        </>
    )

}

export default LoginScreen;