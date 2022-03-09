import { createSlice } from "@reduxjs/toolkit";

 const userSlice = createSlice({
     name: "activeUsers",
    initialState : {
        users: [],
        messages: [],
    },
    reducers: {
        setActiveUsers: (state, { payload }) => {
            state.users = payload
        },
        setChatMessages: (state, { payload }) => {
            state.messages = payload
        }
    }
})

export const { setActiveUsers , setChatMessages } = userSlice.actions;
export default userSlice.reducer;