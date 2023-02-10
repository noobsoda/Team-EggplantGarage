import { api } from "./api";

async function createChatRoom(users, success, fail) {
  const chatRoom = await api.post(`/api/v1/chat`, users).then(success);
  return chatRoom;
}

async function getChatRoomList(chatRoomId, success, fail) {
  const chatRoomList = await api.get(`/api/v1/chat/list/` + chatRoomId).then(success);
  return chatRoomList;
}

async function getChatMessageList(chatRoomId, success, fail) {
  const chatMessageList = await api.get(`/api/v1/chat/message/` + chatRoomId).then(success);
  return chatMessageList;
}

export { createChatRoom, getChatRoomList, getChatMessageList };
