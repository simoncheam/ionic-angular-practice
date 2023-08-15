import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://i.insider.com/5a032aef3dbef471018b49d9?width=700',
      199.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Austin Mansion',
      'Peaceful place in Austin',
      'https://i.pinimg.com/originals/d5/39/e0/d539e0cb96a8525b8a7f51df72847045.png',
      199.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Mysterious Palace',
      'A mystery',
      'https://tripfreakz.com/uploads/pal01.png',
      999.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
      'abc'
    ),
  ]);

  get places() {
    // ! removed making copy, now using observables
    // return [...this._places];

    //this gives a subscribable object
    return this._places.asObservable();
  }

  public getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }

  public addPlace(
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://tripfreakz.com/uploads/pal01.png',
      price,
      availableFrom,
      availableTo,
      this.authService.userId
    );

    console.log(newPlace);

    // ! using operators
    //* means - look at places subject, then subscribe, but only take 1 object, then cancel subscription
    this.places.pipe(take(1)).subscribe((places) => {
      // ! next will emit a new event
      //*concat = js array method- takes old array and adds new item which returns a new array
      this._places.next(places.concat(newPlace));
    });
  }

  constructor(private authService: AuthService) {}
}
