import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent implements OnInit {
  produtos: any[];

  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('produtos')
      .valueChanges()
      .subscribe((data) => {
        this.produtos = data;
      });
  }

  ngOnInit(): void {}
}
