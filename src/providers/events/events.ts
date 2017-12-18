import { Injectable } from '@angular/core';
import { DatabaseProvider} from './../../providers/database/database';
import { Event } from '../../models/event';
import { Api } from '../api/api';

@Injectable()
export class EventsConnected {

   constructor(public databaseProvider: DatabaseProvider) { }

  
  add(event: Event) {
    console.log("==========testandroid");
    this.databaseProvider.addItem(event["name"])
  }

  delete(event: Event) {
  }

}
