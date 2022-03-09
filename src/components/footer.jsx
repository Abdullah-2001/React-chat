import React from 'react';

const ChatFooter = ({ sendMessage, input, setInput }) => {
  return (
    <div className='send-input-container'>
      <input style={{ width: "400px", height: "30px" , padding: "0 0 0 20px" }} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='enter your message' />
      <button style={{ width: "80px", height: "30px" }} onClick={() => sendMessage()}>send</button>
    </div>
  )
}

export default ChatFooter;