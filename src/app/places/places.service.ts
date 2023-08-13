import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City',
      'https://i.insider.com/5a032aef3dbef471018b49d9?width=700',
      199.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
    ),
    new Place(
      'p2',
      'Austin Mansion',
      'Peaceful place in Austin',
      'https://i.pinimg.com/originals/d5/39/e0/d539e0cb96a8525b8a7f51df72847045.png',
      199.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
    ),
    new Place(
      'p3',
      'Mysterious Palace',
      'A mystery',
      'https://tripfreakz.com/uploads/pal01.png',
      999.99,
      new Date('2023-01-01'),
      new Date('2024-12-31'),
    ),

  ];

  get places() {
    return [...this._places];
  }

  public getPlace(id: string) {
    return {...this._places.find(
      p => p.id === id)};
  }

  constructor() { }
}
