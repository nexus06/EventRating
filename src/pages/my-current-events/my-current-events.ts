import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,  NavParams } from 'ionic-angular';
import { Event } from '../../models/event';
import { Events } from '../../providers/providers';
import { EventConnectedProvider } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { User } from '../../providers/providers';

/**
 * Generated class for the MyCurrentEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-current-events',
  templateUrl: 'my-current-events.html',
})

export class MyCurrentEventsPage {

  //create an observable for new events creation auto refreshing
  items: Observable<any[]>;

  currentEvents: Event[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events, 
    public eventConnected: EventConnectedProvider, public modalCtrl: ModalController,
    public user: User) {
      eventConnected.populateMock();
    this.currentEvents = eventConnected.events;
    this.items = eventConnected.get(user).valueChanges();
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addEvent() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log('ionViewDidLoad MyCurrentEventsPage');
        this.eventConnected.add(item, this.user)
      }
    })
    addModal.present();
  }

  logout() {
    //this.login(this.account.email,this.account.password)
    this.user.logoutUser().then(
      data=> {
       
      }, 
      error=>{
       
      }
    )
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCurrentEventsPage');
  }

}
