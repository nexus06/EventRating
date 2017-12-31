import { Injectable } from '@angular/core';
import { DatabaseProvider} from './../../providers/database/database';
import { Event } from '../../models/event';
import { Api } from '../api/api';
import { User } from './../../providers/providers';

/*
  Generated class for the EventConnectedProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventConnectedProvider {
  

  constructor(public databaseProvider: DatabaseProvider) {

  }
    
  events: Event[] = [];

    add(event: Event, user: User) {
      console.log("==========testandroid");
      this.databaseProvider.addItem(user._user.uid,{"user": user._user.uid,"text": event["name"], "name":event["name"], "rate":0},  event["profilePic"])
    }

    get(user: User) {
      //https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md
      console.log("==========testandroid");
      return this.databaseProvider.getItems(user._user.uid)
    }
  
    delete(event: Event) {

    }


    



    populateMock(){
      let events = [
        {
          "name": "Exposición Magnumsssssssssss",
          "profilePic": "assets/img/speakers/bear.jpg",
          "about": "exposición sobre la agencia de fotografía Magnum."
        },
        {
          "name": "Exposición Charles Chiplin",
          "profilePic": "assets/img/speakers/cheetah.jpg",
          "about": "Charlie is a Cheetah."
        },
        {
          "name": "Exposición Donald Duck",
          "profilePic": "assets/img/speakers/duck.jpg",
          "about": "Exposición Donald is a Duck."
        },
        {
          "name": "Evento Eva Eagle",
          "profilePic": "assets/img/speakers/eagle.jpg",
          "about": "Eva is an Eagle."
        },
        {
          "name": "Ellie Elephant",
          "profilePic": "assets/img/speakers/elephant.jpg",
          "about": "Ellie is an Elephant."
        },
        {
          "name": "Molly Mouse",
          "profilePic": "assets/img/speakers/mouse.jpg",
          "about": "Molly is a Mouse."
        },
        {
          "name": "Paul Puppy",
          "profilePic": "assets/img/speakers/puppy.jpg",
          "about": "Paul is a Puppy."
        }
      ];
  
      for (let event of events) {
        this.events.push(new Event(event));
      }
    }
}
