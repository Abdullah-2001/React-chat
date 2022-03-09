import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ChatScreen from '../screens/chat';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const RouterApp = () => {

    const [authenticatedUser, setAuthenticatedUser] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthenticatedUser(user);
        }
        else {
            setAuthenticatedUser(false);
        }
    })

    return (
        <Router>
            <Routes>
                <Route exact path='/' element=
                    {authenticatedUser ? (
                        <>
                            <ChatScreen />
                        </>
                    ) : (
                        <LoginScreen />
                    )}
                />
                <Route path='/register' element={<RegisterScreen />} />
            </Routes>
        </Router>
    )

}

export default RouterApp;