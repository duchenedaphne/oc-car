
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from 'src/app/interfaces/chat-message';
import { MessageType } from 'src/app/interfaces/message-type';
import * as Stomp from 'stompjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    title = 'Support tchat';  
    greetings: string[] = [];  
    disabled = true;  
    newmessage: string | null = null;  
    private stompClient: Stomp.Client | null = null; 

    public username: ChatMessage | null = null;
    public message: ChatMessage | null = null;
    avatars: string[] = ["🚗", "🛺", "🚕", "🚘", "🚛"];
    
    public isLogged = false;
    public error = false;

    public usernameForm = this.fb.group({
        sender: [
            '',
            [
                Validators.required
            ]
        ]
    });

    public messageForm = this.fb.group({
        content: [
            '',
            [
                Validators.required
            ]
        ]
    });
    
    constructor(private fb: FormBuilder){}  
    
    ngOnInit(): void {}  
    
    setConnected(connected: boolean) {    
        
        this.disabled = !connected;

        if (connected) {
            this.greetings = [];
        }  
    }  
        
    connect() {  

        if (this.usernameForm.value.sender != undefined && this.usernameForm.value.sender != null) 
            this.username = this.usernameForm.value as ChatMessage; 
        
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        const _this = this;
        
        this.stompClient.connect({}, function (frame) {
            console.log('Connecté: ' + frame);

            if (_this.stompClient != null){
                _this.stompClient.subscribe(
                    '/topic/public', function(hello
                    ){

                        console.log(JSON.parse(hello.body));

                        if (JSON.parse(hello.body).type === "LEAVE")
                            _this.showMessage(JSON.parse(hello.body).sender + " : " + "a quitté");

                        else
                            _this.showMessage(JSON.parse(hello.body).sender + " : " + JSON.parse(hello.body).content);
                    }
                );
            
                if (_this.username?.sender != null) {
                    
                    _this.username.sender = _this.getAvatar() + " " + _this.username?.sender;

                    _this.stompClient.send(
                        "/app/chat.addUser", 
                        {},
                        JSON.stringify({ content: 'a rejoint', sender: _this.username.sender, type: 'JOIN'})
                    );
                }
            }
        });        
        this.isLogged = true;
    }  
      
    sendMessage() {    

        if (this.messageForm.value.content != undefined && this.messageForm.value.content != null) 
            this.message = this.messageForm.value as ChatMessage;

        if (this.message != null && this.username != null)
            this.message.sender = this.username.sender;

        if (this.message != null && this.stompClient) 
            this.message.type = MessageType.CHAT;
        
        if (this.stompClient != null)

            this.stompClient.send(
                '/app/chat.sendMessage',
                {},
                JSON.stringify(this.message)
            );
        this.newmessage = "";  
    }  
        
    showMessage(message: string) {    
        this.greetings.push(message);  
    }

    public getAvatar(): string {
        
        const index = Math.floor(Math.random() * this.avatars.length);
        return this.avatars[index];
    }
}
