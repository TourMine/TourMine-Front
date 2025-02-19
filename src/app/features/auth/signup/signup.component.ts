import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { RadioButton } from 'primeng/radiobutton';
import { Carousel } from 'primeng/carousel';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { User } from '../../../models/users/users';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    Carousel,
    AvatarModule,
    AvatarGroupModule,
    RadioButton
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  name!: string;
  email!: string;
  password!: string;
  userType!: string;

  loading: boolean = false;

  successMessage: string = '';

  depoimentos = [
    { avatar: "A", texto: "Gerenciar torneios nunca foi tão fácil!", autor: "Lucas Silva" },
    { avatar: "B", texto: "Agora posso acompanhar minhas inscrições com poucos cliques!", autor: "Mariana Rocha" },
    { avatar: "C", texto: "Simples, rápido e eficiente. Recomendo!", autor: "Pedro Martins" }
  ];

  imagensPequenas = [
    "assets/img/csgo2.jpg",
    "assets/img/csgo2.jpg",
    "assets/img/csgo2.jpg",
    "assets/img/csgo2.jpg",
    "assets/img/csgo2.jpg"
  ];

  constructor(private fb: FormBuilder, private UsersService: UsersService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', [Validators.required]]
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.router.navigate(['/user/login']);
    }
  }

  criarUsuario() {
      this.loading = true;
      if (this.signupForm.valid) {
        const usuario: User = {
          name: this.signupForm.value.name!,
          email: this.signupForm.value.email!,
          password: this.signupForm.value.password!,
          userType: Number(this.signupForm.value.userType)

        };

        console.log("Dados enviados para a BFF:", usuario); // Log dos dados enviados
    
        this.UsersService.createUser(usuario).subscribe({
          next: (response) => {
            this.signupForm.reset();
            this.successMessage = 'Usuario criado com sucesso!';
  
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/user/login']);
            }, 2000);
            
          },
          error: (error) => {
            console.error('Erro ao criar usuario', error);
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    }

  isFieldInvalid(field: string): boolean {
    return this.signupForm.controls[field].invalid && this.signupForm.controls[field].touched;
  }
}
