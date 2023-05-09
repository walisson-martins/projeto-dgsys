import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  submenus: any[];

  constructor(private auth: AngularFireAuth, private router: Router) {}

  login() {
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('sucesso');
        this.router.navigate(['lista-produtos']);
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
}
