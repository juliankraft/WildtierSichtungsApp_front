import { ViewChild,Component } from '@angular/core';
import { UpdateService } from './update.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalController } from '@ionic/angular';
import { ModalInstallComponent } from './modal-install/modal-install.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  deferredPrompt: any;
  showA2HSDialog: boolean = false;
  @ViewChild(IonModal) modal!: IonModal;
  message = 'Add to home screen';
  name: string = "";

  constructor(private updateService: UpdateService,private modalCtrl: ModalController) {
    console.log('AppComponent -> constructor -> updateService', updateService);
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing
      event.preventDefault();
      // Store the event for later use
      this.deferredPrompt = event;
      // Show your custom "Add to Home Screen" dialog
      this.showA2HSDialog = true;
      this.openModal();
      //call prompt
//       this.addToHomeScreen();
    });
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInstallComponent,
      componentProps: { deferredPrompt: this.deferredPrompt }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
