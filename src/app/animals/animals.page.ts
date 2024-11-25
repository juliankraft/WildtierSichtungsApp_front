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
  listeSichtbar = false;
  showMap = false;

  geolocation = Geolocation;


  googleoptions: google.maps.MapOptions = {
    center : {lat:47.724011 , lng: 8.660298 },
    zoom: 10
  };

  constructor(private api:ApiService) {
  }



  async setCurrentPosition() {
    let coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    Geolocation.getCurrentPosition().then((position) => {
      console.log('Current position:', position);
      this.googleoptions.center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleoptions.zoom = 10;
      this.showMap = true;
    });
  };

  toggleListeSichtbar() {
    this.listeSichtbar = !this.listeSichtbar;
  }

  ngOnInit() {

    //get request to the api
    this.api.get('animals').subscribe((data:any)=>{
      //store the response in the animals variable
      this.animals = data
      console.log(this.animals)
    });
  }
}
