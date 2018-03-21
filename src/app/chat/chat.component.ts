import { Message } from './message';
import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { User } from './user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  socket  = socketIo(`https://simple-react-chat.herokuapp.com/`, {path: '/api'});
  message = '';
  user: User;
  users: User[] = [];
  private _usersStore: Map<string, User> = new Map();

  fileNameDialogRef: MatDialogRef<UserRegisterComponent>;

  constructor(private _dialog: MatDialog){

  }

  ngOnInit() {
    this.fileNameDialogRef = this._dialog.open(UserRegisterComponent, {disableClose: true, data: this._usersStore});
    this.fileNameDialogRef.afterClosed().subscribe(user => this.user = user);

    this.socket.on('user', users => {
      console.log(users);
      users.forEach(user => {
        this._usersStore.set(user.name, user);
        this.users = Array.from(this._usersStore.values());
      });
    });

    this.listenMessages();
  }

  send() {
    this.socket.emit('message', {body: this.message, user: this.user});
    this.message = '';
  }

  listenMessages() {
    this.socket.on('message', message => {
      console.log(message);
      this.messages.push({body: message.body, user: this.user} as Message);
    });
  }

}
