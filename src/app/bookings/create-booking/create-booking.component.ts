import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, NgModel } from '@angular/forms';
import { IonDatetime, IonModal, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Place } from 'src/app/places/places.model';

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

  @ViewChild('f', { static: true }) form: NgForm | FormGroup;

  showPicker = false;
  fromDateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  toDateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
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
  startDateCtrl: NgModel;
  formattedString: string;

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
      // const formattedFromDate =
      //   await this.selectedPlace.availableFrom?.toISOString();
      // const formattedToDate =
      //   await this.selectedPlace.availableTo?.toISOString();

      // console.log('formattedFromDate', formattedFromDate);

      // console.log('formattedToDate', formattedToDate);

      if (this.selectedMode === 'select') {
        // initialize dates
        this.startDate = this.value;
        this.endDate = this.value;
      }

      if (this.selectedMode === 'random') {
        console.log('random mode selected');
        // *get ms since beginning
        const timeSinceBeginning = availableFrom.getTime();
        const timeRange =
          availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - timeSinceBeginning;

        // ! random start date
        const randomStartDate = new Date(
          timeSinceBeginning + Math.random() * timeRange
        );
        this.startDate = randomStartDate.toISOString();

        this.formattedFromString = format(
          parseISO(this.startDate),
          'HH:mm, MMM d, yyyy'
        );

        // ! random end date
        const randomEndDate = new Date(
          randomStartDate.getTime() + Math.random() * (6 * 24 * 60 * 60 * 1000)
        );
        this.endDate = randomEndDate.toISOString();
        // format string for display
        this.formattedToString = format(
          parseISO(this.endDate),
          'HH:mm, MMM d, yyyy'
        );
      }
    }
  }

  public onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async datesValid() {
    if (!this.form) {
      console.log('datesValid - invalid form')
      return false;
    }

    const startDate = new Date(this.form.value['date-from']);
    console.log(startDate);
    const endDate = new Date(this.form.value['date-to']);
    console.log(endDate);
    console.log('dates valid:');
    console.log(endDate > startDate);
    return endDate > startDate;
  }
  //! calendar modal methods:

  public async onBookPlace() {
    console.log('this.form');
    console.log(this.form);
    this.datesValid();
    if (!this.form.valid || !this.datesValid()) {
      console.log('invalid form');
      return;
    }

    //TODO: input validation, create/update mode settings
    // add APIService call for CRUD ops if needed

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: this.form.value['date-from'],
          endDate: this.form.value['date-to'],
        },
      },
      'confirm'
    );
  }

  // setToday() {
  //   this.formattedString = format(
  //     parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
  //     'HH:mm, MMM d, yyyy'
  //   );
  // }

  // * ion-date modal methods

  modalFromDateChanged(value: string) {
    this.startDate = value;
    // format string for display
    this.formattedFromString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }
  modalToDateChanged(value: string) {
    this.endDate = value;

    console.log('this.endDate');
    console.log(this.endDate);
    console.log('this.form.value["date-to"]');
    console.log(this.form.value['date-to']);

    // format string for display
    this.formattedToString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }

  async close() {
    console.log('close - iondatetime');
    await this.datetime.cancel(true);
    await this.modal.dismiss(null, 'cancel');
  }

  async select() {
    await this.datetime.confirm(true);
    await this.modal.dismiss('confirm');
  }
}
