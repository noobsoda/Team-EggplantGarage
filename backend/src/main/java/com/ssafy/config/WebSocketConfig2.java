//package com.ssafy.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfig2 implements WebSocketMessageBrokerConfigurer {
//
//    // 클라이언트에서 websocket 서버에 접속하는 endpoint를 등록함
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        System.out.println("config: " + "registerStompEndpoints");
//        // StompEndpointRegistry 인터페이스의 addEndpoint 메서드를 통해 클라이언트가 웹소켓 서버에 연결하는데 사용할 엔드포인트를 등록함
//        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*").withSockJS();
//    }
//
//    // 한 클라이언트에서 다른 클라이언트로 메세지를 라우팅하는데 사용할 메세지 브로커를 구성함
//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        System.out.println("config: " + "configureMessageBroker");
//        // MessageBroker: 송신자(publisher)의 메세지 프로토콜 형식으로부터의 메세지를 수신자(subscriber)의
//        //                메세지 프로토콜 형식으로 변환해서 전달하는 중간 프로그램 모듈
//
//        // 메세지를 보낼 때 관련 경로를 설정
//        registry.setApplicationDestinationPrefixes("/pub");
//        // enableSimpleBroker: 메세지를 받을 때 경로를 설정해주는 함수
//        registry.enableSimpleBroker("/sub");
//    }
//}
