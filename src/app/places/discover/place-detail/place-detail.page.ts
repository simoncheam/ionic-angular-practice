import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';

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
    private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap =>{
      if(!paramMap.has('placeId')){
        //redirect via bav controller if id does not exist
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      if(paramMap){
        this.place = this.placesService.getPlace(paramMap.get('placeId')!);
      }




    });
  }

  //add onBookPlace
  onBookPlace(){
    // this.router.navigate(['/places/tabs/discover']);
    this.navCtrl.navigateBack('/places/tabs/discover');
  }

}
