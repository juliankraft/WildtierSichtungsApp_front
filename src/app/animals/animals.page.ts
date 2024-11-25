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
      this.setCurrentPositionAndStep();
    });

  }

  constructor(private api:ApiService) {
  }

  setAnimal(animal:any){
    //this.animal = animal;
    this.dataset.animal = animal;
  }

  async setCurrentPositionAndStep() {
    let coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    Geolocation.getCurrentPosition().then((position) => {
      console.log('Current position:', position);
      this.googleoptions.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleoptions.zoom = 15;
      this.googleoptions.mapId = 'd8f1c2e085cdc36';
      this.googlePosition = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.step = 3;
      this.googlePositionSet=true;

    });
  };


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

  // Save the current marker position
  savePosition() {
    console.log(this.googlePosition);
    //read map-marker position

  }

  save(){
    alert('saved');
    this.api.post('animals', this.dataset).subscribe((data:any)=>{

    });
  }

}
