import { ChatComponent } from './chat/chat.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatListModule, MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatDialogModule, MatSelectModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [UserRegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
