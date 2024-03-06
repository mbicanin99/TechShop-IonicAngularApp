import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FooterModule } from '../../components/footer/footer.module';
import { DataService } from '../../service/data.service';
import { FormsModule } from '@angular/forms';

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
