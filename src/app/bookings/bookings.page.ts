import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  loadedBookings: Booking[] = [];
  private bookingSub: Subscription;

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe((bookings) => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(slidingItem: IonItemSliding, bookingId: string) {
    console.log('cancel booking item');

    //add removal logic

    slidingItem.close();

    this.loadingCtrl.create({ message: 'Cancelling...' }).then((loadingEl) => {
      loadingEl.present();

      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigate(['/', 'bookings']);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
