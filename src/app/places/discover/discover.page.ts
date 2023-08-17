import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  private loadedPlacesSub: Subscription;
  public listedLoadedPlaces: Place[];
  public relevantPlaces: Place[];
  private filter = 'all';
  chosenFilter: string | undefined;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  ngOnInit() {
    this.chosenFilter = 'all';
    this.setPlacesByFilter(this.chosenFilter);
  }

  setPlacesByFilter(chosenFilter: string) {
    // * create subscription and get places from placesService
    this.loadedPlacesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;

      //*  if filter logic
      if (chosenFilter === 'all') {
        // * show all places
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);

      } else {
        // * filter places by userId - doesnt show places that are created by user
        this.relevantPlaces = this.loadedPlaces.filter(
          (place) => place.userId !== this.authService.userId
        );
        //* let all filtered places remove first item in array
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);

      }
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.chosenFilter = String(event.detail.value);
    this.setPlacesByFilter(this.chosenFilter);
  }

  ngOnDestroy(): void {
    // ! unsubscribe from subscription object on destroy
    if (this.loadedPlacesSub) {
      this.loadedPlacesSub.unsubscribe();
    }
  }
}
