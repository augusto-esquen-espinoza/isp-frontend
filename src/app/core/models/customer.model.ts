export interface Customer {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  fechaCreacion: string;
  fechaNacimiento: string;
}

export interface CreateCustomerRequest {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  fechaNacimiento: string;
}

export interface CustomerFilters {
  dni?: string;
  email?: string;
}

export interface MonthYearCount {
  year: number;
  month: number;
  count: number;
}

export interface BirthRate {
  month: number;
  monthName: string;
  count: number;
  rate: number;
}

export interface IndicatorResponse {
  birthsByMonthYear: MonthYearCount[];
  peakMonthYear: MonthYearCount | null;
  lowestMonthYear: MonthYearCount | null;
  birthRateByMonth: BirthRate[];
  totalCustomers: number;
}
