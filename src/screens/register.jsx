import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, query, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RegisterForm } from '../components/form';
import { auth, fireStore } from '../config/firebase';
import ChatIcon from '../assets/chat-icon.png';

const RegisterScreen = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const Register = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                await setDoc(doc(fireStore, "users", response.user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    isOnline: true,
                    isTyping: false,
                    uid: response.user.uid
                })
                setLoading(false)
                console.log({ message: "user has been registered" });
            })
            .catch((error) => {
                console.log({ error: error.code });
                setLoading(false)
            })
    }

    return (
        <>
            <RegisterForm
                Register={Register}
                ChatIcon={ChatIcon}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
            />
        </>
    )

}

export default RegisterScreen;