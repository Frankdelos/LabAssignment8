import { Component } from '@angular/core';
import { ToastService } from './toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toast-app';

  toastTypes: Array<string> = [];

  constructor(private toastService: ToastService) { 
    this.toastTypes = ['success', 'info', 'warning', 'danger'];
  }

  showToast() {

    const rand = Math.floor(Math.random()*4);
    console.log('My random number ' + rand);
    const toastType = this.toastTypes[rand];
    const toastMessage ='Hi this is a message. My random number is: ' + rand;
    const duration = 4000;
  this.toastService.showToast(toastType, toastMessage, duration);
  }
}
