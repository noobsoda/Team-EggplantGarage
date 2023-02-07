package com.ssafy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    // 소켓 연결 관련 설정
    // 클라이언트에서 websocket 서버에 접속하는 endpoint를 등록함
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("config: " + "registerStompEndpoints");
        // 연결 URL : wss://localhost:8000/ws/chat
        registry.addEndpoint("/ws/chat")
                // Client에서 websocket연결할 때 사용할 API 경로를 설정해주는 메서드
                // api에 "/ws/chat" prefix로 붙으면 messageBroker가 해당 경로를 가로챔
                // var socket = new SockJS("/ws/chat");
                .setAllowedOriginPatterns("*")
                .withSockJS();
        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*");
    }

    @Override
    // Stomp 사용을 위한 Message Broker 설정
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        System.out.println("config: " + "configureMessageBroker");

        // 메시지 보낼 때 관련 경로 설정
        // 클라이언트가 메시지를 보낼 때 경로 맨앞에 "/pub"이 붙어있으면 Broker로 보내짐.
        registry.setApplicationDestinationPrefixes("/pub");
        // 메시지 받을 때 관련 경로 설정
        // prefix(api 경로 맨 앞)에 붙은 경우, messageBroker가 잡아서 해당 채팅방을 구독하고 있는 클라이언트에게 메시지를 전달해줌
        registry.enableSimpleBroker("/sub");
    }
}