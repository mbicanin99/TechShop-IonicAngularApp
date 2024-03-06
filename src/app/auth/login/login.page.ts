import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../../authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  invalidForm: boolean;

  constructor(public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AutheticationService, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
    })
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
    return this.loginForm?.controls;
  }

  async loginUser() {
    const loading = await this.loadingCtrl.create();
    await loading.present()
    if (this.loginForm?.valid) {
      try {
        const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
        console.log("Učitavam korisnika", user)
        if (user) {
          loading.dismiss();
          this.router.navigate(['/home']);
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
    this.markFormGroupTouched(this.loginForm);

    //check form validity
    this.invalidForm = !this.loginForm.valid;
    console.log("proverios am da li je forma submitovana")

    if(!this.invalidForm){
      this.loginUser();
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
