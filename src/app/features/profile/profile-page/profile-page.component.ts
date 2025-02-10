import { Component, OnInit } from '@angular/core';
import { CardMainComponent } from '../../../shared/components/card-main/card-main.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    if (this.editProfileForm.valid) {
      this.router.navigate(['/tournaments/list']);
    }
  }
}
