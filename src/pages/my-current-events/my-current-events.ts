import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,  NavParams } from 'ionic-angular';
import { Event } from '../../models/event';
import { Events } from '../../providers/providers';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

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

  currentEvents: Event[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events, public modalCtrl: ModalController) {
    this.currentEvents = this.events.query();
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addEvent() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.events.add(item);
      }
    })
    addModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCurrentEventsPage');
  }

}
