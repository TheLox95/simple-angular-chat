import * as socketIo from 'socket.io-client';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../chat/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  socket  = socketIo(`https://simple-react-chat.herokuapp.com/`, {path: '/api'});
  error = null;
  user = {name: '', avatar: 1 } as User;
  avatar;
  avatars = [
      { value: 1 , viewValue: 'Avatar 1', icon: 'assets/1.jpg' },
      { value: 2 , viewValue: 'Avatar 2', icon: 'assets/2.jpg' },
      { value: 3 , viewValue: 'Avatar 3', icon: 'assets/3.jpg' },
      { value: 4 , viewValue: 'Avatar 4', icon: 'assets/4.jpg' },
    ];

  ngOnInit() {
  }

  constructor(
    private dialogRef: MatDialogRef<UserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    console.log(data);
  }

  optionSelected(event) {
    this.user.avatar = event.value.value;
  }

  submit() {
    if (this.user.name === '') {
      this.error = 'Username is blank';
      return;
    }

    if (this.data.get(this.user.name)) {
      this.error = 'Username already in use';
      return;
    }
    this.socket.emit('user', this.user);
    this.dialogRef.close(this.user);
  }

}
