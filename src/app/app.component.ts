import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../providers/providers';
import { EventConnectedProvider } from '../providers/providers';


@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        <i class="fa fa-{{p.icon}} {{p.color}}" aria-hidden="true"></i>
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage', icon:'book', color: 'faGreen' },
    { title: 'Welcome', component: 'WelcomePage', icon:'book', color: 'faGreen' },
    { title: 'Tabs', component: 'TabsPage', icon:'book', color: 'faGreen' },
    { title: 'Cards', component: 'CardsPage', icon:'book', color: 'faGreen' },
    { title: 'Content', component: 'ContentPage', icon:'book', color: 'faGreen' },
    { title: 'Login', component: 'LoginPage', icon:'book', color: 'faGreen' },
    { title: 'Signup', component: 'SignupPage', icon:'book', color: 'faGreen' },
    { title: 'Master Detail', component: 'ListMasterPage', icon:'book', color: 'faGreen' },
    { title: 'Menu', component: 'MenuPage', icon:'book', color: 'faGreen' },
    { title: 'Settings', component: 'SettingsPage', icon:'book', color: 'faGreen' },
    { title: 'Search', component: 'SearchPage', icon:'book', color: 'faGreen' }
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, 
    private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    public curUser: User) {
      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {         
          this.onSignedInInitialize(user);
          //authObserver.unsubscribe();
        } else {          
          this.onSignedOutCleanup();
          //authObserver.unsubscribe();
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }


  onSignedOutCleanup(){
    this.curUser.logout();
    this.rootPage = FirstRunPage;
  }

  onSignedInInitialize(fireBaseUser){
    this.curUser._loggedIn(fireBaseUser)
    this.rootPage = MainPage;
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
