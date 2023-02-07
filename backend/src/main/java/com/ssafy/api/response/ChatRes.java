package com.ssafy.api.response;

import lombok.Data;

@Data
public class ChatRes {
    private MessageType type;
    private String roomId;
    private String content;
    private String sender;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
}
