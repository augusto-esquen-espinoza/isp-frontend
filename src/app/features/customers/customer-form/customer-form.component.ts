import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CreateCustomerRequest } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly maxBirthDate = new Date();
  submitting = false;
  errorMessage: string | null = null;

  readonly form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    fechaNacimiento: [null as Date | null, [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const request: CreateCustomerRequest = {
      nombre: value.nombre!.trim(),
      apellido: value.apellido!.trim(),
      email: value.email!.trim().toLowerCase(),
      dni: value.dni!.trim(),
      fechaNacimiento: this.toIsoDate(value.fechaNacimiento!),
    };

    this.submitting = true;
    this.errorMessage = null;
    this.customerService.create(request).subscribe({
      next: () => {
        this.submitting = false;
        this.snackBar.open('Cliente creado correctamente.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/customers']);
      },
      error: (error: HttpErrorResponse) => {
        this.submitting = false;
        this.errorMessage = this.resolveErrorMessage(error);
        this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 5000 });
      },
    });
  }

  private toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private resolveErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 409) {
      return 'El DNI o el email ya se encuentran registrados.';
    }
    const validationErrors = error.error?.errors as Record<string, string> | undefined;
    if (validationErrors) {
      return Object.values(validationErrors).join(' ');
    }
    return (error.error?.detail as string) ?? 'Ocurrió un error al crear el cliente.';
  }
}
