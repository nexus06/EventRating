import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import {AngularFireAuth} from 'angularfire2/auth';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, 
    private authFire2: AngularFireAuth) { }


  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.authFire2.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.authFire2.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.authFire2.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.authFire2.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp;
  }
}
