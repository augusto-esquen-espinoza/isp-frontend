import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Customer, CustomerFilters } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchFilterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  private readonly customerService = inject(CustomerService);

  readonly displayedColumns = [
    'nombre',
    'apellido',
    'email',
    'dni',
    'fechaNacimiento',
    'fechaCreacion',
  ];
  readonly dataSource = new MatTableDataSource<Customer>([]);

  loading = false;
  errorMessage: string | null = null;

  // The paginator/sort are rendered conditionally, so bind them through setters
  // to make sure they are attached as soon as the view creates them.
  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator | undefined) {
    this.dataSource.paginator = paginator ?? null;
  }

  @ViewChild(MatSort)
  set sort(sort: MatSort | undefined) {
    this.dataSource.sort = sort ?? null;
  }

  ngOnInit(): void {
    this.load();
  }

  onFilter(filters: CustomerFilters): void {
    this.load(filters);
  }

  private load(filters: CustomerFilters = {}): void {
    this.loading = true;
    this.errorMessage = null;

    this.customerService.findAll(filters).subscribe({
      next: (customers) => {
        this.dataSource.data = customers;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los clientes. Verifica la conexión con el servidor.';
        this.loading = false;
      },
    });
  }
}
