import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loading =  signal<boolean>(false);

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signUp() {
    this.loading.set(true);
    const {email, password} = this.form.getRawValue();
    this.authService.signUp(email, password).then((value) => {
      localStorage.setItem('access_token', value.access_token);
      this.router.navigate(['/home']);
    }).catch(err => this.handleError(err, "ERROR SIGNUP")).finally(() => {
      this.loading.set(false);
    });
  }

  handleError(err: any, summary: string) {
    console.log(err);
    this.messageService.add({
      summary,
      severity: 'warn',
      life: 2000,
      detail: err.message
    });
  }
}
