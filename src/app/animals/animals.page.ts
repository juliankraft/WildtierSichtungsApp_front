import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
// import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  standalone: false,
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {
  animals: any;
  step = 0;
  googlePositionSet = false;
  dataset: any = {};
  geolocation = Geolocation;
  googleoptions: google.maps.MapOptions = {};
  googlePosition: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  newPosition: google.maps.LatLngLiteral = {lat: 0, lng: 0};

  constructor(private api:ApiService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.dataset.user_name = window.sessionStorage.getItem('user_name');
    this.dataset.user_id = window.sessionStorage.getItem('user_id');
    this.loadAnimals();
    console.log(this.dataset);
  }

  loadAnimals() {
    this.api.get('animals').subscribe((data: any) => {
      this.animals = data;
      console.log(this.animals);
      this.step = 1;
    });
  }

  setAnimal(animal: any){
    //this.animal = animal;
    this.dataset.animal_id =  Number(animal.detail.value);
  }

  getAnimalNameById(id: number): string {
    const animal = this.animals.find((animal: { id: number; name: string }) => animal.id === id);
    return animal ? animal.name : '';
  }

  // Handle marker drag end
  onMarkerPositionChange(event: any) {
    if (event && event.latLng) {
      console.log('Marker position updated:', event.latLng.lat(), event.latLng.lng());
      this.googlePosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.dataset.phone_location = false;

    }
  }

  // Function to prompt for accuracy
  async promptForAccuracy() {
    return new Promise<void>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Präzision angeben',
        inputs: [
          {
            name: 'accuracy',
            type: 'number',
            placeholder: 'Gib die präzision in Metern an',
          },
        ],
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
            handler: () => {
              console.log('Accuracy input cancelled');
              resolve(); // Resolve the promise even if cancelled
            },
          },
          {
            text: 'Speichern',
            handler: (data) => {
              if (data.accuracy && !isNaN(data.accuracy) && data.accuracy > 0) {
                this.dataset.accuracy = parseFloat(data.accuracy);
                console.log('Accuracy set to:', this.dataset.accuracy);
                resolve(); // Resolve the promise after successful input
                return true; // Allow the alert to be dismissed
              } else {
                console.log('Invalid accuracy provided');
                // Show an error message (optional)
                this.showError('Bitte geben Sie eine gültige Präzision in Metern an.');
                return false; // Prevent the alert from being dismissed
              }
            },
          },
        ],
        cssClass: 'custom-alert-bottom' // Apply the custom CSS class
      });
  
      await alert.present();
    });
  }

  showError(message: string) {
    this.alertController.create({
      header: 'Fehler',
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  formatDateForDisplay(date: string): string {
    return date.replace('T', ' ');
  }


  // ending step 1 - inquerie of animal
  setCurrentDataAndStep(){
    if (this.dataset.animal_id == null){
      alert('Bitte wähle eine Tierart aus');
      return
    }
    if (this.dataset.count_female == null && this.dataset.count_male == null && this.dataset.count_unknown == null) {
      alert('mindestens eine Anzahl muss angegeben werden');
      return
    }

    this.dataset.date = new Date().toISOString().slice(0, -5);
    this.step = 2
  }

  // ending step 2 - inquerie of Date
  async setCurrentPositionAndStep() {
    try {
        let coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates);

        // Extract accuracy
        let accuracy = coordinates.coords.accuracy;

        // Set accuracy in dataset
        this.dataset.accuracy = accuracy;
        console.log('Accuracy:', accuracy);

        Geolocation.getCurrentPosition().then((position) => {
            console.log('Current position:', position);
            this.googleoptions.center = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.googleoptions.zoom = 15;
            this.googleoptions.mapId = 'd8f1c2e085cdc36';
            this.googlePosition = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.googlePositionSet = true;
            this.dataset.phone_location = true;
            this.step = 3;
        });
    } catch (error) {
        console.error('Error getting position:', error);
    }
  }

  // ending step 3 - inquerie of location
  async savePosition() {
    console.log(this.googlePosition);
    this.dataset.latitude = this.googlePosition.lat;
    this.dataset.longitude = this.googlePosition.lng;

    if (this.dataset.phone_location === false) {
      await this.promptForAccuracy();
    }

    this.step = 4;
  }

  // ending step 4 - save the current dataset
  saveData(){

    this.api.post('saveAnimal', this.dataset).subscribe((response:any)=>{
      console.log('Success', response);
      alert('Sichtung erfolgreich gespeichert');
      this.resetState(); // Reset the component state
    }
    , (error:any) => {alert('Fehler beim Speichern der Sichtung.\nError: ' + error);}
  );
  }

  resetState() {
    this.step = 0;
    this.googlePositionSet = false;
    this.dataset = {};
    this.googleoptions = {};
    this.googlePosition = { lat: 0, lng: 0 };
    this.newPosition = { lat: 0, lng: 0 };
    this.loadAnimals(); // Reload the animals data
  }
}
