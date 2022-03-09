import React, { useState, useEffect } from 'react';
import { auth, fireStore } from '../config/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const Sidebar = ({ state, selectUserChat }) => {

    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        const getUsersRef = (collection(fireStore, "users"))
        const q = query(getUsersRef, where("uid", "in", [auth.currentUser.uid]))
        onSnapshot(q, (snapshot) => {
            setCurrentUser(snapshot.docs.map((doc) => doc.data()))
        })
    }, [])

    console.log(currentUser, "current user");

    return (
        <>
            <div className='sidebar-container'>
                <div>
                    {currentUser.map(({ firstName, lastName, profile }) => {
                        return (
                            <>
                                <div className='currentLoginUser'>
                                    <div>
                                        <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={profile} alt="" />
                                    </div>
                                    <div>
                                        <p>{firstName + " " + lastName}</p>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                {state.map((user, index) => {
                    return (
                        <div className='activeUser-container' key={user.uid} onClick={() => selectUserChat(user)}>
                            <div style={{ position: "relative" }}>
                                <img className='imagesss' style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user.profile} alt="" />
                                <span className={`online-status ${user.isOnline ? "online" : "offline"}`}></span>
                            </div>
                            <div style={{ position: "relative" }}>
                                <p className='activeUserName' style={{ margin: "20px 0 20px 20px" }}>{user.firstName + " " + user.lastName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar;