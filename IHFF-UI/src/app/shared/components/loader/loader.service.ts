import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader:Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getLoader() {
    return this._loader.asObservable();
  }

  start() {
    this._loader.next(true);
  }

  stop() {
    this._loader.next(false);
  }
}
