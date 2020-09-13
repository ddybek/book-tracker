import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { UserInfo } from './userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => this.processUser(user));
  }

  private static convertToUserInfoFrom(user): UserInfo {
    return {
      name: user.displayName,
      email: user.email
    };
  }

  private processUser(user): void {
    const userExist = !!user;
    this.isLoggedIn.next(userExist);
    if (userExist) {
      this.userInfo.next(AuthService.convertToUserInfoFrom(user));
    }
  }

  login(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(): void {
    this.afAuth.signOut();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  userInfo$(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }
}
