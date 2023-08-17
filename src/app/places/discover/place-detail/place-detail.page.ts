import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  public place: Place;
  private loadedPlaceSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        //redirect via bav controller if id does not exist
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      if (paramMap) {
        this.loadedPlaceSub = this.placesService
          .getPlace(paramMap.get('placeId')!)
          .subscribe((placeEl: Place) => {
            this.place = placeEl;
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.loadedPlaceSub) {
      this.loadedPlaceSub.unsubscribe();
    }
  }

  //add onBookPlace
  public async onBookPlace() {
    // this.router.navigate(['/places/tabs/discover']);
    // this.navCtrl.navigateBack('/places/tabs/discover');

    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // public onCancel() {
  //   this.modalCtrl.dismiss();
  // }

  async openBookingModal(mode: 'select' | 'random') {
    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode },
    });

    await modal.present();
    const bookedPlace = await modal.onDidDismiss();
    if (!bookedPlace.data) {
      console.log('dismissed - no data');
      return;
    } else {
      console.log('bookedPlace');
      console.log(bookedPlace.data);
      console.log(bookedPlace.role);
      if (bookedPlace && bookedPlace.role === 'confirm') {
        // ! add loading controller
        this.loadingCtrl
          .create({
            message: 'Booking place...',
          })
          .then((loadingEl) => {
            loadingEl.present();

            // extract data
            const data = bookedPlace.data.bookingData;

            // add booking
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(() => {
                loadingEl.dismiss();
                console.log('BOOKED');
              });
          });

      }
    }
  }
}
