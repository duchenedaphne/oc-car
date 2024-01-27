package com.oc.poc.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.oc.poc.model.ChatMessage;
import com.oc.poc.model.ChatMessage.MessageType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageSendingOperations;
    

    /** 
     * @param disconnectEvent
     */
    @EventListener
    public void handleWebSocketDisconnectListener(
        SessionDisconnectEvent disconnectEvent
    ) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        String username = (String) stompHeaderAccessor.getSessionAttributes().get("username");
        
        if (username != null) {
            log.info("User disconnected: {}", username);
            ChatMessage chatMessage = ChatMessage.builder()
                                        .type(MessageType.LEAVE)
                                        .sender(username)
                                        .build();
            messageSendingOperations.convertAndSend("/topic/public", chatMessage);
        }
    }
}
