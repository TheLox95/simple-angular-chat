import { Message } from './message';
import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  socket  = socketIo(`https://simple-react-chat.herokuapp.com/`, {path: '/api'});
  message = '';

  constructor() {
    this.socket.on('message', (data: Message) => this.messages.push(data));
  }

  ngOnInit() {
  }

  send() {
    this.socket.emit('message', {body: this.message, user: {name: 'me', avatar: 1}});
    this.message = '';
  }

}
