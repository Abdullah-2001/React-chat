import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, limit, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { auth, fireStore } from '../config/firebase';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUsers, setChatMessages } from '../store/userSlice';
import Sidebar from '../components/sidebar';
import ChatHeader from '../components/header'
import ChatBox from '../components/chatBox';
import ChatFooter from '../components/footer';
import { signOut } from 'firebase/auth';
import icon from '../assets/chat-icon.png';

const ChatScreen = () => {

  const divRef = useRef();
  const [user, setUser] = useState([]);
  const [chatShow, setChatShow] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.activeUsers.users);
  const msgs = useSelector((state) => state.activeUsers.messages);
  const user1 = auth.currentUser.uid;
  const { email, photoURL } = auth.currentUser;

  useEffect(() => {
    const getUsersRef = (collection(fireStore, "users"))
    const q = query(getUsersRef, where("uid", "not-in", [auth.currentUser.uid]))
    onSnapshot(q, (snapshot) => {
      setUser(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  useEffect(() => {
    dispatch(setActiveUsers(user))
  }, [user])

  const selectUserChat = async (user) => {
    setChatShow(user);
    const user2 = chatShow.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgRef = collection(fireStore, "messages", id, "chat")
    const q = query(msgRef, orderBy("createdAt"), limit(50))
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()))
    })
  }

  const sendMessage = async () => {
    const user2 = chatShow.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    if (input !== "") {
      await addDoc(collection(fireStore, "messages", id, "chat"), {
        email,
        photoURL,
        text: input,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      })
    }
    setInput("")
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    dispatch(setChatMessages(messages))
  }, [messages])

  const signOutUser = async () => {
    await updateDoc(doc(fireStore, "users", auth.currentUser.uid), {
      isOnline: false
    })
    await signOut(auth)
  }

  return (
    <>
      <Button onClick={() => signOutUser()} color='error' variant="contained">Signout</Button>
      <Grid container>
        <Grid item xs={3}>
          <div className='sidebar-section'>
            <Sidebar state={state} selectUserChat={selectUserChat} />
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className='chat-section'>
            {chatShow ? (
              <>
                <ChatHeader chatShow={chatShow} />
                <ChatBox chatShow={chatShow} messages={msgs} divRef={divRef} />
                <ChatFooter chatShow={chatShow} sendMessage={sendMessage} input={input} setInput={setInput} />
              </>
            ) : (
              <>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}>
                  <div>
                    <img style={{ width: "100px", height: "100px" }} src={icon} alt="" />
                  </div>
                  <div style={{ margin: "0 20px", fontSize: "22px", fontWeight: "600" }}>
                    <p>No Chats Available</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  )

}

export default ChatScreen;