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

  constructor() {
    const socket  = socketIo(`https://simple-react-chat.herokuapp.com/`, {path: '/api'});
    socket.on('message', (data: Message) => this.messages.push(data));
  }

  ngOnInit() {
  }

}
