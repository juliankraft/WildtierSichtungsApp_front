import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {

  animals: any;


  listeSichtbar = false;

  constructor(private api:ApiService) { }


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
