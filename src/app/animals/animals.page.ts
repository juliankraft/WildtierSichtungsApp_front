import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GoogleMap } from '@capacitor/google-maps';
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



  ngOnInit() {
    //get request to the api
    this.api.get('animals').subscribe((data:any)=>{
      //store the response in the animals variable
      this.animals = data
      console.log(this.animals)
      this.step = 1;
      // this.setCurrentPositionAndStep();
    });
  }

  constructor(private api:ApiService) {
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
    }
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
    let coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    Geolocation.getCurrentPosition().then((position) => {
      console.log('Current position:', position);
      this.googleoptions.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleoptions.zoom = 15;
      this.googleoptions.mapId = 'd8f1c2e085cdc36';
      this.googlePosition = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googlePositionSet=true;
      this.step = 3;
    });
  };

  // ending step 3 - inquerie of location
  savePosition() {
    console.log(this.googlePosition);
    this.dataset.latitude = this.googlePosition.lat;
    this.dataset.longitude = this.googlePosition.lng;
    this.step = 4;
  }

  // ending step 4 - save the current dataset
  saveData(){
    alert('Sichtung erfolgreich gespeichert');
    this.api.post('animals', this.dataset).subscribe((data:any)=>{
    this.step = 1;
    });
  }

}
