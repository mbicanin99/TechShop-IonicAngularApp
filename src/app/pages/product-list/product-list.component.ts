import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import {  Firestore } from '@angular/fire/firestore';

import { ModalController } from '@ionic/angular';
import { home } from 'ionicons/icons';

import { DataService} from '../../service/data.service';
import { ProductEntity } from '../../types/product.type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {
  categoryId: string;
  products: any[] = [];
  isModalOpen: boolean = false;
  productForCreating: ProductEntity;
  productForDelete: ProductEntity;
  productForUpdate: ProductEntity;
  isModalForUpdateOpen: boolean = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
              private firestore2: Firestore, private service: DataService, private modalController: ModalController) {
  }

  probniProizvod: ProductEntity = {
    categorie_id: "Keyboards",
    color: "Blue",
    description: 'desc shhshshhs',
    imgUrl: 'https://cdn.3dmodels.org/wp-content/uploads/Apple/583_Apple_iPhone_15_Blue/Apple_iPhone_15_Blue_1000_0001.jpg',
    name: "Probni proizvod",
    price: 400,
    product_id: 5
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.getProductsByCategory(this.categoryId);
    });

    this.productForCreating = {
      categorie_id: this.categoryId,
      color: '',
      description: '',
      imgUrl: '',
      name: '',
      price: null,
      product_id: 1
    };
    console.log("U ng on init prodkt je ", this.productForCreating)
  }

  getProductsByCategory(categoryId: string) {
    this.service.getProductsByCategory(categoryId).subscribe(products => {
      this.products = products;
      console.log('Proizvodi:', products);
    }, error => {
      console.error('Greška:', error);
    });
  }


  protected readonly home = home;

  deleteProduct(product: ProductEntity) {
    this.productForDelete = product;
    this.service.deleteProduct(this.productForDelete)
  }

  createProduct(product: ProductEntity) {
    const existingProductIds = this.products.map(p => p.product_id);
    let newProductId = 1;
    while (existingProductIds.includes(newProductId)) {
      newProductId++;
    }
    product.product_id = newProductId;
    this.products.push(product);
    this.service.createProduct(product)
    console.log('Novi proizvod:', product);
    this.isModalOpen = false;
    this.clearInputs();

  }

  updateProduct(productForUpdate: ProductEntity){
    this.service.updateProduct(productForUpdate);
  }

  openModal() {
    this.isModalOpen = true;
  }

  openUpdateModal(product: ProductEntity) {
    console.log("update product", product)
    this.isModalForUpdateOpen = true;
    this.productForUpdate= {
      id: product.id,
      categorie_id: product.categorie_id,
      color: product.color,
      description: product.description,
      imgUrl: product.imgUrl,
      name: product.name,
      price: product.price,
      product_id: product.product_id
    };
    console.log(this.productForUpdate)
    this.updateProduct(this.productForUpdate)
    //samo dugme treba da bude update a ne add
  }

  closeModal() {
    this.isModalForUpdateOpen = false;
    if( this.isModalOpen ) {
      this.isModalOpen = false;
    }
    else if( this.isModalForUpdateOpen){
      this.isModalForUpdateOpen = false
    }
    //<ion-modal [isOpen]="isModalOpen || isUpdateModalOpen"> PROVERI Da li treba ovo u modalu
    this.modalController.dismiss();
    this.clearInputs()
  }

  private clearInputs() {
    this.productForCreating = {
      categorie_id: this.categoryId,
      color: '',
      description: '',
      imgUrl: '',
      name: '',
      price: null,
      product_id: 1
    };
  }

}
