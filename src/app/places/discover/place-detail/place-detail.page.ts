import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place!: Place | undefined;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        //redirect via bav controller if id does not exist
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      if (paramMap) {
        this.place = this.placesService.getPlace(paramMap.get('placeId')!);
      }
    });
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
    console.log(mode);
    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode },
    });
    console.log(modal);

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
        console.log('BOOKED');
      }
    }
  }
}
