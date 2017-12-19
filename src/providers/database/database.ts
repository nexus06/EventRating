import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
 
@Injectable()
export class DatabaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
  getItems() {
    return this.afd.list('/events/');
  }
 
  addItem(name) {
    this.afd.list('/events/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/events/').remove(id);
  }

}
