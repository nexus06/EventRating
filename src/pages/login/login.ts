import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private authFire2: AngularFireAuth ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    //this.login(this.account.email,this.account.password)
    this.user.loginUser(this.account.email,this.account.password).then(
      data=> {
        this.user._loggedIn(data);
        this.navCtrl.push(MainPage);
      }, 
      error=>{
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top' });
          toast.present();
      }
    )

    // if(this.user.login(this.account.email,this.account.password)){
    //   if(this.user._loggedIn){
    //     console.log("login is OK");
    //     this.navCtrl.push(MainPage);
    //   }
      
    // }else{
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // }
  }


  async login(email: string, pass: string) {
    var resultProcess = false;
    try{
      const result =await (this.authFire2.auth.signInWithEmailAndPassword(email, pass));
      console.log(result);
      console.log("cehcing result");
      if(result && result.uid && result.email){
        console.log("result is OK");
        resultProcess = true;
        this.user._loggedIn(result);
        this.navCtrl.push(MainPage);
      }else{
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }catch(e){
      console.log(e);
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }finally{
      return resultProcess;
    }

  }
}
