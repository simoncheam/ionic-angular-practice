import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})



export class DiscoverPage implements OnInit {

  loadedPlaces: Place[] = [];



  constructor( private placesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;


  }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    const selectedValue = event.detail;
    console.log(selectedValue)

  }
}
