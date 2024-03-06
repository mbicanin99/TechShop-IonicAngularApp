import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categories: any[] = [];
  selectedCategory: string | null = null;
  products: any[] = [];

  constructor(private firestore: AngularFirestore) {}

    ngOnInit(): void {
        this.firestore.collection("categories").valueChanges().subscribe((categories: any) => {
            this.categories = categories;
            console.log("Kategorije su učitane:", this.categories);
        });
    }

    selectCategory(categoryId: string) {
        this.selectedCategory = categoryId;
        this.getProductsForCategory(this.selectedCategory)
    }

    getProductsForCategory(categoryId: string) {
        this.firestore.collection("products", ref => ref.where('categorie_id', '==', categoryId))
            .valueChanges()
            .subscribe((products: any) => {
                this.products = products;
                console.log("Proizvodi za izabranu kategoriju:", this.products);
            });
    }


}
