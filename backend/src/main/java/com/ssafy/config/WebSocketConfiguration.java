package com.ssafy.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    // 소켓 연결 관련 설정
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
                .addEndpoint("/socket") // 메세지를 받는 경로 설정, api에 "/socket" prefix로 붙으면 messageBroker가 해당 경로를 가로챔
                .setAllowedOrigins("https://i8b105.p.ssafy.io", "https://localhost:8000")
                .withSockJS()
        ;
    }

    @Override
    // Stomp 사용을 위한 Message Broker 설정
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub"); // 메세지를 보내는 경로 설정, 경로 앞에 “/pub”이 붙어있으면 Broker로 보내짐
        registry.enableSimpleBroker("/sub"); // 해당 경로로 SimpleBroker를 등록, SimpleBroker는 해당하는 경로를 SUBSCRIBE하는 Client에게 메세지를 전달하는 간단한 작업을 수행
    }
}