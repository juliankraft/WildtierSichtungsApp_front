import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-install',
  templateUrl: './modal-install.component.html',
  styleUrls: ['./modal-install.component.scss'],
})
export class ModalInstallComponent  implements OnInit {
  deferredPrompt: any;
  showA2HSDialog: boolean = true;

  //get the deferredPrompt from the parent component
  constructor(private modalCtrl: ModalController) {
    console.log('ModalInstallComponent -> constructor -> modalCtrl', modalCtrl);
  }


  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    // this.modalCtrl.dismiss({
    //   'dismissed': true
    // });
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
