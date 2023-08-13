import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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
  showPicker = false;
  fromDateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  toDateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  formattedFromString = '';
  formattedToString = '';
  // current date
  public value = new Date(Date.now()).toISOString();
  formattedFromDate: string;
  formattedToDate: string;

  public availableFrom: Date|undefined;
  public availableTo: Date|undefined;

  startDate = '';
  endDate = '';
  startDateCtrl: NgModel;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController) {
    // this.setToday();
  }

  // ngOnInit() {

  // }


  async ngOnInit() {
    if (this.selectedPlace) {
    console.log('this.selectedPlace.availableFrom')
    console.log(this.selectedPlace.availableFrom)

    const formattedFromDate = await this.selectedPlace.availableFrom?.toISOString().split('T')[0];
    const formattedToDate = await this.selectedPlace.availableTo?.toISOString().split('T')[0];



    const availableFrom =  new Date(this.selectedPlace?.availableFrom!);
    const availableTo =  new Date(this.selectedPlace?.availableTo!);

    if (this.selectedMode === 'select') {
      console.log('selectedMode')
      console.log('this.value - todays date')
      console.log(this.value)
      // console.log('formattedFromDate', formattedFromDate.toISOString());
      // console.log( formattedFromDate?.toISOString());
      // console.log('formattedToDate', formattedToDate)

    }


    if (this.selectedMode === 'random') {

      // ! start date
      this.startDate = await new Date(
        // *get ms since beginning
        availableFrom.getTime() +
          Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000) -
          availableFrom.getTime()
      ).toISOString();

      // ! end date
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
    // console.log('this.selectedPlace')
    // console.log(this.selectedPlace)
    // console.log('availableFrom?.toISOString()');
    // console.log(availableFrom?.toISOString());
    // console.log('availableTo?.toISOString()');
    // console.log(availableTo?.toISOString());
  }
  }

  public onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  //! calendar modal methods:
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss( 'confirm');
  }

  // datesValid() {
  //   const startDate = new Date(this.form.value['date-from']);
  //   const endDate = new Date(this.form.value['date-to']);
  //   return endDate > startDate;
  // }
  //! calendar modal methods:

  public async onBookPlace() {
    //TODO: input validation, create/update mode settings
    // add APIService call for CRUD ops if needed

    this.modalCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
  }

  // setToday() {
  //   this.formattedTodayString = format(
  //     parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'),
  //     'HH:mm, MMM d, yyyy'
  //   );
  // }

  fromDateChanged(value: any) {
    this.showPicker = false;
    console.log(value);
    this.fromDateValue = value;

    this.formattedFromString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    // console.log('this.formattedFromString')
    console.log(this.formattedFromString);
  }
  toDateChanged(value: any) {
    this.toDateValue = value;
    console.log('End Date');
    console.log(value);

    this.formattedToString = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    // console.log('this.formattedFromString')
    console.log(this.formattedToString);
  }
}
