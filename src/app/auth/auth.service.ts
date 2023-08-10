import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _isAuthed = false; // TODO: change to false after development

  //getter method to avoid overwriting _isAuthed
  get isAuthed(){
    return this._isAuthed;
  }



  login(){
    console.log('login');
    this._isAuthed = true;
  }

  logout(){
    console.log('logout');
    this._isAuthed = false;

    //redirect to login page
    // this.router.navigateByUrl('/authentication');
  }
}
