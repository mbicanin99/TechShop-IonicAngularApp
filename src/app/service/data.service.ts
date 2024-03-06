import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { CategorieEntity } from '../types/categories.type';
import { ProductEntity } from '../types/product.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable()
export class DataService {
  constructor(private firestore: Firestore) {
  }

  createCategory(category: CategorieEntity) {
    const categoryRef = collection(this.firestore, 'categories');
    return addDoc(categoryRef, category);
  }

  createProduct(product: ProductEntity) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  // getProducts() {
  //   const productsRef = collection(this.firestore, 'products');
  //   let products = collectionData(productsRef, {idField: 'id'});
  //     console.log("Vracam sve producte", products)
  //
  //     products.subscribe(data => {
  //         console.log("Vraćam sve proizvode:", data);
  //     });
  //   return products
  // }

    getProductsByCategory(category_id: string) {
        const productsRef = collection(this.firestore, 'products');
        const productsObs = collectionData(productsRef, { idField: 'id' });

        return productsObs.pipe(
            map((data: any[]) => {
                return data.map((item: any) => {
                    const product: ProductEntity = {
                        id: item.id,
                        categorie_id: item.categorie_id,
                        color: item.color,
                        description: item.description,
                        imgUrl: item.imgUrl,
                        name: item.name,
                        price: item.price,
                        product_id: item.product_id
                    };
                    return product;
                });
            }),
            map((products: ProductEntity[]) => {
                return products.filter(product => product.categorie_id === category_id);
            })
        );
    }



   async deleteProduct(product: ProductEntity) {
       // this.getProductsByCategory('Phones').subscribe(products => {
       //     console.log('Proizvodi:', products);
       // }, error => {
       //     console.error('Greška:', error);
       // });
    const productRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productRef);

  }

  updateProduct(product: ProductEntity) {
    const productRef = doc(this.firestore, `products/${product.id}`);
    return updateDoc(productRef, {
      color: product.color,
      description: product.description,
      imgUrl: product.imgUrl,
      name: product.name,
      price: product.price,
    });
  }

}
