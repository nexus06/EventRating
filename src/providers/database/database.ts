import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
 
@Injectable()
export class DatabaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
  getItems(userId) {
    return this.afd.list('/events/'+userId);
  }
 
  addItem(userId, event, profileImage) {
    this.afd.list('/events/'+userId).push(event).then((item) => { 
      this.uploadImage(userId,item.key,profileImage) });
    
  }
 
  removeItem(id) {
    this.afd.list('/events/').remove(id);
  }

  uploadImage(userId, eventKey, imageString) : Promise<any>
  {
    console.log("eventKey--->"+eventKey)

     let image       : string  = 'profile-' + new Date().getTime() + '.jpg',
         storageRef  : any,
         parseUpload : any;

     return new Promise((resolve, reject) =>
     {
        storageRef       = firebase.storage().ref('/images/' + userId+ "/" + eventKey + "/" + image);
        parseUpload      = storageRef.putString(imageString, 'data_url');

        parseUpload.on('state_changed', (_snapshot) =>
        {
           // We could log the progress here IF necessary
           // console.log('snapshot progess ' + _snapshot);
        },
        (_err) =>
        {
           reject(_err);
        },
        (success) =>
        {
           resolve(parseUpload.snapshot);
        });
     });
  }

}
