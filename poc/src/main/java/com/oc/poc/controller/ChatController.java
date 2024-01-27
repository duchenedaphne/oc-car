package com.oc.poc.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.oc.poc.model.ChatMessage;

@Controller
public class ChatController {
    
    
    /** 
     * @return ChatMessage
     */
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
        @Payload ChatMessage chatMessage
    ) {
        return chatMessage;
    }
    
    
    /** 
     * @param accessor
     * @return ChatMessage
     */
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(
        @Payload ChatMessage chatMessage,
        SimpMessageHeaderAccessor accessor
    ) {
        accessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    
    /** 
     * @param msg
     * @return String
     */
    @MessageMapping("/resume")
    @SendTo("/topic/public")
    public String chat(String msg) {
        System.out.println(msg);
        return msg;
    }
}
