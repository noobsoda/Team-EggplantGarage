package com.ssafy.api.request;

import lombok.Data;

@Data
public class LiveChatReq {
    private MessageType type;
    private String roomId;
    private String content;
    private String sender;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        REJECT,
        ACCEPT,
        PAY,
        SUGGEST
    }
}
