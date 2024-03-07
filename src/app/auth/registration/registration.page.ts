import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { AutheticationService } from '../../authetication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regForm: FormGroup;
  invalidForm: boolean;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public authService: AutheticationService, public router : Router) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+|~=`{}[\\]:;"\'<>,./?]).{8,}$')
      ]]
    });
  }

  openPage(page: string) {
    let url: string;
    switch (page) {
      case 'facebook':
        url = 'https://www.facebook.com';
        break;
      case 'twitter':
        url = 'https://twitter.com';
        break;
      case 'apple':
        url = 'https://www.icloud.com/mail';
        break;
      default:
        console.error('Unsupported page:', page);
        return;
    }
    window.open(url, '_blank');
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  async registerUser() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      console.log("Forma je validna i pozivam registraciju")
      try {
        const user = await this.authService.registerUser(this.regForm.value.name, this.regForm.value.phone, this.regForm.value.email, this.regForm.value.password);
        console.log("Učitavam korisnika", user)
        if (user) {
          loading.dismiss();
          this.router.navigate(['/login']);
        } else {
          console.log('Navedite ispravne vrednosti');
        }
      } catch (error) {
        console.log(error);
        console.log("Došlo je do greške prilikom registracije korisnika");
      } finally {
        loading.dismiss();
      }
    }
  }

  submitForm() {
    this.markFormGroupTouched(this.regForm);
    
    //check form validity
    this.invalidForm = !this.regForm.valid;

    if(!this.invalidForm){
      this.registerUser();
      console.log("pozvao sam funkciju da registraciju")
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

}
