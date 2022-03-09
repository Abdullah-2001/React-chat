import React, { useEffect, useRef } from 'react';
import { auth } from '../config/firebase';

const ChatBox = ({ messages, divRef }) => {
  return (
    <>
      <div className='chatbox-container'>
        {messages.map(({ text, from, photoURL }) => {
          return (
            <div>
              <div className={`${auth.currentUser.uid === from ? "sender" : "receiver"}`}>
                <img src={photoURL} alt="" style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }} />
                <p style={{ margin: "0 20px 0 20px" }}>{text}</p>
              </div>
            </div>
          )
        })}
        <div ref={divRef}></div>
      </div>
    </>
  )
}

export default ChatBox;