import { createSlice } from "@reduxjs/toolkit";

import { joinChatRoom, chatRoomList, chatMessageList } from "../../util/api/chatApi";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRoomList: [],
  },
  reducers: {
    setChatRoomList: (state, chatRoomList) => {
      state.chatRoomList = chatRoomList.payload;
    },
  },
});

export const checkChatRoomList = (state) => state.chat.chatRoomList;
export const { setChatRoomList } = chatSlice.actions;

// export const getChatRoomList = () => (dispatch) => {
//   chatRoomList(
//     ({ data }) => {
//       console.log(data);
//       dispatch(setChatRoomList(data));
//     },
//     (e) => {
//       console.log(e);
//     }
//   );
// };

export default chatSlice.reducers;
