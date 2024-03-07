import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryListComponent } from './category-list.component';
import { FooterModule } from '../../components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  }
];

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    FooterModule
  ]
})
export class CategoryListModule { }
