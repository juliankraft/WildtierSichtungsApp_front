import { Component } from '@angular/core';
import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  deferredPrompt: any;
  showA2HSDialog: boolean = false;

  constructor(private updateService: UpdateService) {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing
      event.preventDefault();
      // Store the event for later use
      this.deferredPrompt = event;
      // Show your custom "Add to Home Screen" dialog
      this.showA2HSDialog = true;
    });
  }
    async addToHomeScreen() {
    if (this.deferredPrompt) {
      // Show the install prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('User response:', outcome);
      // Clear the saved prompt
      this.deferredPrompt = null;
      // Hide your custom dialog
      this.showA2HSDialog = false;
    }
  }
}
