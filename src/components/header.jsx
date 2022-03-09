import React from 'react';

const ChatHeader = ({ chatShow }) => {
    console.log(chatShow, "showing...")
    return (
        <div>
            <div className='chatShowUser'>
                <div>
                    <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={chatShow.profile} alt="" />
                </div>
                <div>
                    <p>{chatShow.firstName + " " + chatShow.lastName}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;