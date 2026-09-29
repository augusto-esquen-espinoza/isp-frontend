import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerFilters } from '../../../core/models/customer.model';

type SearchType = 'dni' | 'email';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent {
  @Output() readonly filterChange = new EventEmitter<CustomerFilters>();

  readonly form = new FormGroup({
    searchType: new FormControl<SearchType>('dni', { nonNullable: true }),
    searchValue: new FormControl('', { nonNullable: true }),
  });

  get valueLabel(): string {
    return this.form.controls.searchType.value === 'dni' ? 'DNI' : 'Email';
  }

  onSearch(): void {
    const value = this.form.controls.searchValue.value.trim();
    if (!value) {
      this.onClear();
      return;
    }

    this.filterChange.emit(
      this.form.controls.searchType.value === 'dni' ? { dni: value } : { email: value },
    );
  }

  onClear(): void {
    this.form.reset({ searchType: 'dni', searchValue: '' });
    this.filterChange.emit({});
  }
}
