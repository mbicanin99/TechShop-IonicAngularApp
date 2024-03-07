import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngFireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async registerUser(name: string, phone: string, email: string, password: string) {
   console.log("Sada sam u servisu")
    try {
      const credential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      console.log("krediencijali iz baze su", credential)
      if (credential && credential.user) {
        await this.firestore.collection('users').doc(credential.user.uid).set({
          name: name,
          phone: phone,
          email: email
          //password does not have to save because firebase system for auth do that
        });
      }

      return credential;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async signOut(){
    return  await this.ngFireAuth.signOut();
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser;
  }

}
