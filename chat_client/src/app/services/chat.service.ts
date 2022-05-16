import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

// server와 통신하는 소켓

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) {
  }
  sendChat(message){
    this.socket.emit('chat', message);
  }
  receiveChat(){
    return this.socket.fromEvent('chat');
  }
  getUsers(){
    return this.socket.fromEvent('users');
  }
}