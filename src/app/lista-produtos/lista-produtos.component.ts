import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
  providers: [MessageService],
})
export class ListaProdutosComponent implements OnInit {
  produtos: any[];
  produtoForm: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firestore
      .collection('produtos')
      .valueChanges()
      .subscribe((data) => {
        this.produtos = data;
        console.log(data);
      });
  }

  cadastrarProduto() {
    if (this.produtoForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Produto cadastrado com sucesso!',
      });

      this.produtoForm.reset();

      this.firestore.collection('produtos').add({
        nome: this.produtoForm.value.nome,
        preco: this.produtoForm.value.preco,
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao cadastrar produto',
        detail: 'Preencha todos os campos obrigatórios',
      });
    }
  }

  // remove um produto pelo ID
  removeProduto(productId: string) {
    return this.firestore.collection('products').doc(productId).delete();
  }
}
