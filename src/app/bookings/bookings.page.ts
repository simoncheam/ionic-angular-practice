import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor( private bookingService: BookingService, private router: Router) { }

  loadedBookings: Booking[]= [];

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings;
  }


  onCancelBooking(slidingItem: IonItemSliding, offerId: string) {
    console.log('cancel booking item');

    //add removal logic

    slidingItem.close();
    this.router.navigate(['/', 'bookings']);
  }


}
