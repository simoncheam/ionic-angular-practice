import { Injectable } from '@angular/core';
import { Place } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, filter, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private authService: AuthService) {}

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://i.insider.com/5a032aef3dbef471018b49d9?width=700',
      199.99,
      new Date('2023-01-02'),
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
      'xyz'
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

  public getPlace(id: string ): Observable<Place> {
    // ! removed making copy, now using observables
    //! need to return a single observable, will filter
    // get latest list (take gives array of places), then map over to get single place
    return this.places.pipe(
      take(1),
      map((places) => {
        // will find only one place
        return { ...places.find((p) => p.id === id)! };
      })
    );
    // ! map wraps in observable
  }

  public addPlace(
    title: string,
    description: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    // *initialize new place
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
    return this.places.pipe(
      take(1),
      delay(1000), //delay in milliseconds
      tap((places) => {
        // ! next will emit a new event
        //*concat = js array method- takes old array and adds new item which returns a new array
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    // fetch the latest list of places - take 1 is latest snapshot
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        //emits updated places array
        this._places.next(updatedPlaces);
      })
    );

    //replace the place with the updated place
  }
}
