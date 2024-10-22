import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-pps-4-b',
  templateUrl: './pps-4-b.component.html',
  styleUrls: ['./pps-4-b.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PPS4BComponent implements OnInit, OnDestroy {
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef<HTMLDivElement>;
  
    private subscription!: Subscription;
    userdata: any;
    nombreCuenta: string = (JSON.parse(localStorage.getItem('userdata') || '{ "user": "{ email: "SinEmail" }" }')).user.email ;
    messages!: Observable<any[]>;
    newMessage: string = '';
    userId: string = '';
    chatService = inject(ChatService);
    showModal:boolean = false;


    constructor() {}
  
    ngOnInit(): void {
      this.chatService.setCollection("messages-pps-4b")
      this.messages = this.chatService.getMessages();
      // Inicia el seguimiento del contenedor de scroll
      this.messages.subscribe(() => {
        setTimeout(() => this.scrollToBottom(), 100);
      });
    }
  
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();  // Asegura la desuscripción para evitar fugas de memoria
      }
    }
  
    sendMessage(): void {
      if (!this.newMessage.trim()) {
        return;
      }
      if (this.nombreCuenta) {
        this.chatService.sendMessage(this.newMessage, this.nombreCuenta)
        .then(success => {
          if (success) {
              this.newMessage = '';
          } else {
              console.error('Error al enviar el mensaje');
              this.showModal = true;
              this.triggerVibration();
          }
        });
      } else {
        console.error("No user logged in or email is not available!");
        this.triggerVibration(); // Vibrate the device on error
      }
      this.newMessage = '';
    }
  
    platform = inject(Platform);
    triggerVibration() {
      if (this.platform.is('cordova')) {
        navigator.vibrate(500); // Vibrate for 500 milliseconds
      }
    }
  
    private scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Could not scroll to bottom: ', err);
      }
    }
  }
  