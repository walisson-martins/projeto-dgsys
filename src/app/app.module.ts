import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from 'src/environments/environment.firebase';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ScrollingModule } from '@angular/cdk/scrolling';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AppComponent, LoginComponent, ListaProdutosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    ScrollingModule,
    BrowserModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
