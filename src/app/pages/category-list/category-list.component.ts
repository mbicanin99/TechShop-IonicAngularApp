import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { home } from 'ionicons/icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent  implements OnInit {
  categories: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection("categories").valueChanges().subscribe((categories: any) => {
      this.categories = categories;
      console.log("Kategorije su učitane:", this.categories);
    });

  }

  protected readonly home = home;
}
