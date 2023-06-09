import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
  providers: [MessageService, CurrencyPipe],
})
export class ListaProdutosComponent implements OnInit {
  produtos: any;
  produtoForm: FormGroup;
  formattedValue: string;
  produtoEditando = null;
  isEdit = false;

  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private messageService: MessageService,
    private currencyPipe: CurrencyPipe
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    this.firestore
      .collection('produtos')
      .valueChanges()
      .subscribe((produtos: any[]) => {
        this.produtos = produtos;
      });
  }

  cadastrarProduto() {
    if (this.produtoForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Produto cadastrado com sucesso!',
      });

      const id = uuidv4();

      const produto = {
        id,
        nome: this.produtoForm.value.nome,
        preco: this.produtoForm.value.preco,
      };

      this.firestore.collection('produtos').doc(id).set(produto);

      this.produtoForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao cadastrar produto',
        detail: 'Preencha todos os campos obrigatórios',
      });
    }
  }

  // remove um produto pelo ID
  removeProduto(id: string) {
    return this.firestore
      .collection('produtos')
      .doc(id)
      .delete()
      .then(() => {
        const index = this.produtos.findIndex((p) => p.id === id);
        this.produtos.splice(index, 1);
      });
  }

  formatarInput(event: any) {
    const val = event.target.value.replace(/[^0-9]/g, '');

    this.formattedValue = this.currencyPipe.transform(
      parseInt(val) / 100,
      'BRL',
      'symbol',
      '1.2-2'
    );
  }

  editarProduto(produto: any) {
    this.produtoForm.patchValue({
      nome: produto.nome,
      preco: produto.preco,
    });
    this.produtoEditando = produto;
    this.isEdit = true;
  }

  alterarProduto() {
    if (this.produtoForm.valid) {
      const id = this.produtoEditando.id;
      const produtoRef = this.firestore.collection('produtos').doc(id);
      produtoRef
        .update({
          nome: this.produtoForm.get('nome').value,
          preco: this.produtoForm.get('preco').value,
        })
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Produto atualizado com sucesso!',
          });
          this.produtoForm.reset();
          this.produtoEditando = null;
        })
        .catch((error) => {
          console.error('Erro ao atualizar produto:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao atualizar produto',
          });
        });
    }

    this.isEdit = false;
  }
}
