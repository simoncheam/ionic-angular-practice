import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[] = [];
  offer: Place | undefined;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    // this.offers = this.placesService.places;  // old way

    //* new way using observables
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
  }

  ngOnDestroy(): void {
    // ! unsubscribe from subscription object on destroy
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  ionViewDidEnter() {
    // ! set offers to places inside subscription
    //this.offers = this.placesService.places; //! old way
  }

  onEdit(slidingItem: IonItemSliding, offerId: string) {
    console.log('editing item');

    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }
}
