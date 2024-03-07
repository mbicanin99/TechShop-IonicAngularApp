import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterModule } from '../../components/footer/footer.module';
import { ProductListComponent } from './product-list.component';
import { DataService } from '../../service/data.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  }
];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    FooterModule,
    FormsModule
  ],
  providers: [DataService],
  exports: [RouterModule]
})
export class ProductListModule { }
