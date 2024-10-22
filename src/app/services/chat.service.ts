// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export interface Message {
  id?: string;
  text: string;
  createdAt: any;
  userEmail: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesCollection!: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) {
    this.setCollection('messages');  // colección por defecto
  }

  setCollection(path: string): void {
    // Configura la colección de Firestore con un orden específico y un límite
    this.messagesCollection = this.afs.collection<Message>(path, ref => ref.orderBy('createdAt', 'desc'));
  }

  getMessages(): Observable<Message[]> {
    return this.messagesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Message;
        const id = a.payload.doc.id;
        const timestamp = data.timestamp as any;
        data.timestamp = new Date(timestamp.seconds * 1000);
        return { id, ...data };
      }))
    );
  }

  async sendMessage(newMessage: string, userEmail: string): Promise<boolean> {
    if (newMessage.length <= 21) {
      try {
        await this.messagesCollection.add({
          text: newMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userEmail: userEmail,
          timestamp: new Date()
        });
        return true; // Retorna true si el mensaje se añadió exitosamente
      } catch (error) {
        return false; // Retorna false si ocurrió un error
      }
    } else {
      return false;
    }
    
  }
}