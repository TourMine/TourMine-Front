import { Component, OnInit } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    CardMainComponent,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  editProfileForm!: FormGroup;
  formChanged: boolean = false;
  userId!: string | null; // ID do usuário logado
  userEmail!: string | null;
  userRole!: string | null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
  
    console.log("UserID:", this.userId);
    console.log("User Email:", this.userEmail);
    console.log("User Role:", this.userRole);

    // Inicializa o formulário
    this.editProfileForm = this.fb.group({
      Name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]], // Senha não obrigatória na edição
    });

    this.editProfileForm.valueChanges.subscribe(() => {
      this.formChanged = this.editProfileForm.dirty;
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.editProfileForm.get(field);
    return !!(control?.invalid && control.touched);
  }


  editProfile(): void {
    if (this.editProfileForm.valid && this.userId) {
      const updateData = this.editProfileForm.value;

      // Removendo a senha se o campo estiver vazio (não alterar a senha)
      if (!updateData.password) {
        delete updateData.password;
      }

      this.usersService.updateUser(this.userId, updateData)
        .subscribe({
          next: (response) => {
            console.log('Perfil atualizado com sucesso:', response);
            this.router.navigate(['/tournaments/list']);
          },
          error: (err) => {
            console.error('Erro ao atualizar perfil:', err);
          }
        });
    }
  }
}
