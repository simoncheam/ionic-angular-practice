import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place!: Place | undefined;
  form!: FormGroup<any>;
  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {


    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        //redirect via bav controller if id does not exist
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      if (paramMap) {
        // ! Gets place by id from url params
        this.place = this.placesService.getPlace(paramMap.get('placeId')!);

        this.form = new FormGroup({
          title: new FormControl(this.place?.title, {
            updateOn: 'blur',
            validators: [Validators.required],
          }),
          description: new FormControl(this.place?.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)],
          }),
          price: new FormControl(this.place?.price, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(1)],
          }),
          dateFrom: new FormControl(this.place?.availableFrom, {
            updateOn: 'blur',
            validators: [Validators.required],
          }),
          dateTo: new FormControl(this.place?.availableTo, {
            updateOn: 'blur',
            validators: [Validators.required],
          }),
        });

      }
    });
  }



  onEditOffer() {
    if(!this.form.valid){
      return
    }
    console.log('onEditOffer');
    console.log(this.form);
  }


}
