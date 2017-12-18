import { Injectable } from '@angular/core';

import { Event } from '../../models/event';


import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class Events {
  events: Event[] = [];

  defaultEvent: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
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

  query(params?: any) {
    if (!params) {
      return this.events;
    }

    return this.events.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(event: Event) {
    this.events.push(event);
  }

  
  delete(event: Event) {
    this.events.splice(this.events.indexOf(event), 1);
  }
}
