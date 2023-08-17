import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { IonDatetime, IonModal, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Place } from 'src/app/places/places.model';

interface UserFormData {
  firstName: string;
  lastName: string;
  guestNumber: number;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() public selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild(IonModal) modal: IonModal;

  @ViewChild(IonDatetime) datetime: IonDatetime;

  @ViewChild('f', { static: true }) form: NgForm | any;

  formattedFromString = '';
  formattedToString = '';
  // current date
  public value = new Date(Date.now()).toISOString();
  public formattedFromDate: string;
  public formattedToDate: string;

  public availableFrom: Date | undefined;
  public availableTo: Date | undefined;

  startDate = '';
  endDate = '';
  guestNumber = 2;
  // startDateCtrl: NgModel;
  formattedString: string;

  originalFormData: UserFormData = {
    firstName: '',
    lastName: '',
    guestNumber: this.guestNumber,
    startDate: this.startDate,
    endDate: this.endDate,
  };

  //Create a copy
  formData: UserFormData = { ...this.originalFormData };

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    // TODO: add form control initialization logic
    // TODO: add function

    if (!this.selectedPlace) {
      return;
    }

    const availableFrom = new Date(this.selectedPlace?.availableFrom!);
    const availableTo = new Date(this.selectedPlace?.availableTo!);

    if (this.selectedPlace) {
      if (this.selectedMode === 'select') {
        // initialize dates
        this.startDate = this.value;
        this.endDate = this.value;
      }

      if (this.selectedMode === 'random') {
        // *get ms since beginning
        const timeSinceBeginning = availableFrom.getTime();
        const timeRange =
          availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - timeSinceBeginning;

        // ! random start date
        const randomStartDate = new Date(
          timeSinceBeginning + Math.random() * timeRange
        );
        this.startDate = randomStartDate.toISOString();

        this.formData.startDate = this.startDate;

        this.formattedFromString = format(
          parseISO(this.startDate),
          'MMM d, yyyy'
        );

        // ! random end date
        const randomEndDate = new Date(
          randomStartDate.getTime() + Math.random() * (6 * 24 * 60 * 60 * 1000)
        );
        this.endDate = randomEndDate.toISOString();
        this.formData.endDate = this.endDate;
        // format string for display
        this.formattedToString = format(parseISO(this.endDate), 'MMM d, yyyy');
      }
    }
  }

  public onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  datesValid() {
    return this.endDate > this.startDate;
  }
  //! calendar modal methods:

  public async onBookPlace() {
    // console.log('this.form.valid');
    // console.log(this.form.valid);
    // console.log('---');
    // console.log('testing this.formData');
    // console.log(this.formData);
    // console.log('---');

    // this.datesValid();

    if (!this.form.valid || !this.datesValid()) {
      console.log('invalid form');
      return;
    }


    // add APIService call for CRUD ops if needed

    this.modalCtrl.dismiss(
      {
        bookingData: {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        guestNumber: +this.formData.guestNumber,
        startDate: new Date(this.formData.startDate),
        endDate: new Date(this.formData.endDate),

        },
      },
      'confirm'
    );
  }



  // * ion-date modal methods

  modalFromDateChanged(value: string) {
    this.startDate = value;

    // format string for display
    this.formattedFromString = format(parseISO(value), 'MMM d, yyyy');
  }
  modalToDateChanged(value: string) {
    this.endDate = value;

    // format string for display
    this.formattedToString = format(parseISO(value), 'MMM d, yyyy');
  }

  async close() {
    await this.datetime.cancel(true);
    await this.modal.dismiss(null, 'cancel');
  }

  async select() {
    await this.datetime.confirm(true);
    await this.modal.dismiss('confirm');
  }
}
