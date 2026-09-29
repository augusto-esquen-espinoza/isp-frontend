import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';

import { CreateCustomerRequest } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFormComponent],
      providers: [
        provideRouter([]),
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function fillValidForm(component: CustomerFormComponent): void {
    component.form.setValue({
      nombre: 'Augusto',
      apellido: 'Esquen',
      email: 'augusto@example.com',
      dni: '12345678',
      fechaNacimiento: new Date(1995, 4, 20),
    });
  }

  it('should start with an invalid form', () => {
    const fixture = TestBed.createComponent(CustomerFormComponent);

    expect(fixture.componentInstance.form.invalid).toBeTrue();
  });

  it('should not call the API when the form is invalid', () => {
    const fixture = TestBed.createComponent(CustomerFormComponent);
    const service = TestBed.inject(CustomerService);
    const createSpy = spyOn(service, 'create');

    fixture.componentInstance.onSubmit();

    expect(createSpy).not.toHaveBeenCalled();
    httpMock.expectNone(() => true);
  });

  it('should send the customer to the API and navigate on success', () => {
    const fixture = TestBed.createComponent(CustomerFormComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);

    fillValidForm(component);
    component.onSubmit();

    const request = httpMock.expectOne(
      (req) => req.method === 'POST' && req.url.endsWith('/api/customers'),
    );
    const body = request.request.body as CreateCustomerRequest;
    expect(body.nombre).toBe('Augusto');
    expect(body.email).toBe('augusto@example.com');
    expect(body.dni).toBe('12345678');
    expect(body.fechaNacimiento).toBe('1995-05-20');

    request.flush({ id: 1 });

    expect(navigateSpy).toHaveBeenCalledWith(['/customers']);
  });

  it('should notify the user when the backend rejects the customer', () => {
    const fixture = TestBed.createComponent(CustomerFormComponent);
    const component = fixture.componentInstance;

    fillValidForm(component);
    component.onSubmit();

    const request = httpMock.expectOne(() => true);
    request.flush({ detail: 'dni already registered' }, { status: 409, statusText: 'Conflict' });

    expect(component.errorMessage).toContain('DNI');
    expect(component.submitting).toBeFalse();
  });
});
