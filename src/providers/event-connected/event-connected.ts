import { Injectable } from '@angular/core';
import { DatabaseProvider} from './../../providers/database/database';
import { Event } from '../../models/event';
import { Api } from '../api/api';

/*
  Generated class for the EventConnectedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventConnectedProvider {

  constructor(public databaseProvider: DatabaseProvider) { }
  
    
    add(event: Event) {
      console.log("==========testandroid");
      this.databaseProvider.addItem(event["name"])
    }
  
    delete(event: Event) {
    }

}
