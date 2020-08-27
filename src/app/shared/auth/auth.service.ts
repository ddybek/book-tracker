import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => this.isLoggedIn.next(!!user));
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
}
