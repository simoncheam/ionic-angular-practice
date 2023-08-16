import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})



export class DiscoverPage implements OnInit, OnDestroy {

  loadedPlaces: Place[] = [];
  private loadedPlacesSub: Subscription




  constructor( private placesService: PlacesService) { }

  ngOnInit() {
    // this.loadedPlaces = this.placesService.places;
    this.loadedPlacesSub= this.placesService.places.subscribe(places=>{
        this.loadedPlaces = places;
     })


  }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    const selectedValue = event.detail;
    console.log(selectedValue)

  }

  ngOnDestroy(): void {
    // ! unsubscribe from subscription object on destroy
    if (this.loadedPlacesSub) {
      this.loadedPlacesSub.unsubscribe();
    }
  }
}
