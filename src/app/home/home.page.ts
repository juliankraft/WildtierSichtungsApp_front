import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  usernames: any;

  constructor(
    private alertController: AlertController,
    private api: ApiService
  ) {}

  ngOnInit() {}

  async createUser() {

    this.api.get('usernames').subscribe((data:any)=>{
      this.usernames = data
      console.log(this.usernames)
    });

    const alert = await this.alertController.create({
      header: 'Benutzer Erstellen',
      inputs: [
        { name: 'user_name', type: 'text', placeholder: 'Benutzername' },
        { name: 'first_name', type: 'text', placeholder: 'Vorname' },
        { name: 'last_name', type: 'text', placeholder: 'Nachname' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'pwd', type: 'password', placeholder: 'Passwort' },
        { name: 'confirm_pwd', type: 'password', placeholder: 'Passwort bestätigen' }
      ],
      buttons: [
        { text: 'Abbrechen', role: 'cancel' },
        {
          text: 'Bestätigen',
          handler: (data) => {
            if (!data.user_name || !data.first_name || !data.last_name || !data.email || !data.pwd || !data.confirm_pwd) {
              // no fields can be empty
              this.showError('Alle Felder müssen ausgefüllt werden');
              return false;
            }
            if (data.pwd !== data.confirm_pwd) {
              // Check if the passwords match
              this.showError('Das Passwort stimmt nicht überein');
              return false;
            }
            if (this.usernames.includes(data.user_name)) {
              // ensure unique username
              this.showError('Benutzername ist bereits vergeben');
              return false;
            }

            // Send data to backend using Angular's HttpClient
            this.api.post('createUser', data).subscribe((response: any) => {
              this.showSuccess('Benutzer erfolgreich erstellt');
            }
          , (error) => {this.showError('Fehler beim Erstellen des Benutzers.\nError: ' + error)}


          );

            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Fehler',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSuccess(message: string) {
    const alert = await this.alertController.create({
      header: 'Erfolg',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {
    console.log("Login");
  }
}