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
  selector: 'app-signin',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading =  signal<boolean>(false);

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    this.loading.set(true);
    const {email, password} = this.form.getRawValue();
    this.authService.signIn(email, password).then((value) => {
      localStorage.setItem('access_token', value.access_token);
      console.log(this.authService.decodeToken(value.access_token));
      this.router.navigate(['/home']);
    }).catch(err => this.handleError(err, "ERROR LOGIN")).finally(() => {
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
