import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username:string = "Usuario";
  auth = inject(AuthService);
  
  constructor() {}

  //ANIMACION BTNS
  targetHeight1: string = '50vh';
  targetHeight2: string = '50vh';
  isAnimating1: boolean = false;
  isAnimating2: boolean = false;
  zIndexTop: number = 100;
  zIndexBottom: number = 99;
  activeRoom1:boolean = false;
  activeRoom2:boolean = false;
  colorExit:string = "#191820";
  activeExitBtn:boolean = false;
  btn2Position:string = "";
  btn2Top:string = "";

  toggleHeight1() {
    if (!this.isAnimating1 && !this.activeRoom1) {
      this.isAnimating1 = true;
      this.targetHeight1 = this.targetHeight1 === '100vh' ? '10vh' : '100vh';
      this.zIndexTop = 101;  // Asegura que el botón superior esté sobre el inferior
      this.zIndexBottom = 99;
      setTimeout(() => {
        this.activeRoom1 = true;
        setTimeout(() => {
          this.targetHeight1 = '10vh';
          this.isAnimating1 = false;
          setTimeout(() => {
            this.activeExitBtn = true;
            this.colorExit = "#191820";
          }, 800)
        }, 1000); // Espera 1 segundo después de la primera animación antes de cambiar a 10vh    
      }, 800);
    }
  }

  toggleHeight2() {
    if (!this.isAnimating2  && !this.activeRoom2) {
      this.isAnimating2 = true;
      this.targetHeight2 = this.targetHeight2 === '100vh' ? '10vh' : '100vh';
      this.zIndexTop = 99;
      this.zIndexBottom = 101;  //
      setTimeout(() => { 
        this.activeRoom2 = true;
        setTimeout(() => {
          this.targetHeight2 = '10vh';
          this.isAnimating2 = false;
          this.btn2Position = "absolute";
          this.btn2Top = "0";
          setTimeout(() => {
            this.activeExitBtn = true;
            this.colorExit = "white";
          }, 800)
        }, 1000); // Espera 1 segundo después de la primera animación antes de cambiar a 10vh
      }, 800);
    }
  }

  reStart():void {
    this.activeExitBtn = false;
    if (this.colorExit == "white") {
      this.restartBtn2();
    } else {
      this.restartBtn1();
    }
  }

  restartBtn1(){
    this.targetHeight1 = "100vh";
    setTimeout(() => { 
      this.activeRoom1 = false;
      setTimeout(() => {
        this.targetHeight1 = '50vh';
        this.isAnimating1 = false;
        setTimeout(() => {
          this.colorExit = "#191820";
        }, 800)
      }, 1000); // Espera 1 segundo después de la primera animación antes de cambiar a 10vh
    }, 800);
  }

  restartBtn2(){
    this.targetHeight2 = "100vh";
    setTimeout(() => { 
      this.activeRoom2 = false;
      setTimeout(() => {
        this.targetHeight2 = '50vh';
        this.isAnimating2 = false;
        this.btn2Position = "";
        this.btn2Top = "";
        setTimeout(() => {
          this.colorExit = "white";
        }, 800)
      }, 1000); // Espera 1 segundo después de la primera animación antes de cambiar a 10vh
    }, 800);
  }
}
