import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  title = 'chat-application';
  newMessage = '';
  messageList: { sender: string, content: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      console.log("Incoming message:", message);
      
      const [senderId, content] = message.split(': ', 2); // Split message into senderId and content
      const socketId = this.chatService.socket.id ? this.chatService.socket.id.substr(0, 5) : ''; // Safely get socket ID

      if (senderId !== socketId) {
        this.messageList.push({ sender: 'Other', content: content });
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageList.push({ sender: 'You', content: this.newMessage });
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = ''; // Clear the input field
    }
  }
}
