import { Component, OnInit } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { UsersService } from '../../../services/users/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile-page',
  imports: [
    CardMainComponent,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [MessageService]
})
export class ProfilePageComponent implements OnInit {
  editProfileForm!: FormGroup;
  formChanged: boolean = false;
  userId!: string | null; // ID do usuário logado
  userEmail!: string | null;
  userRole!: string | null;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService, 
    private usersService: UsersService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userRole = this.authService.getUserRole();
  
    console.log("UserID:", this.userId);
    console.log("User Email:", this.userEmail);
    console.log("User Role:", this.userRole);

    // Inicializa o formulário
    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]], // Senha não obrigatória na edição
    });

    if (this.userId) {
      this.loadUserData();
    }

    this.editProfileForm.valueChanges.subscribe(() => {
      this.formChanged = this.editProfileForm.dirty;
    });

  }

  loadUserData(): void {
    this.usersService.getUserById(this.userId!).subscribe({
      next: (user) => {
        console.log('Dados do usuário carregados:', user);
        this.editProfileForm.patchValue({
          name: user.name,
          email: user.email,
        });
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.editProfileForm.get(field);
    return !!(control?.invalid && control.touched);
  }


  editProfile(): void {
    if (this.editProfileForm.valid && this.userId) {
      const updateData = this.editProfileForm.value;
  
      // Se o usuário não digitou nova senha, remove o campo password
      if (!updateData.password) {
        delete updateData.password;
      }
  
      this.usersService.updateUser(this.userId, updateData)
        .subscribe({
          next: (response) => {
            console.log('Perfil atualizado com sucesso:', response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Perfil atualizado com sucesso!' });
            this.router.navigate(['/tournaments/list']);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao atualizar perfil.' });
            console.error('Erro ao atualizar perfil:', err);
          }
        });
    }
  }
}
