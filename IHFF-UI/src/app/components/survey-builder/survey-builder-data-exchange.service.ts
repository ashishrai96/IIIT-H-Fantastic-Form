import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyBuilderDataExchangeService {

  constructor() { }

  private _preview: Subject<boolean> = new Subject<boolean>();
  private _publishTrigger: Subject<boolean> = new Subject<boolean>();

  setPreview(val:boolean = false) {
    this._preview.next(val);
  }

  getPreview() {
    return this._preview.asObservable();
  }

  triggerPublish(){
    this._publishTrigger.next(true);
  }

  listenPublishEvent() {
    return this._publishTrigger.asObservable();
  }
  
}
