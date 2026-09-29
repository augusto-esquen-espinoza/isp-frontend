import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BirthRate, IndicatorResponse, MonthYearCount } from '../../../core/models/customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-indicators-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './indicators-dashboard.component.html',
  styleUrl: './indicators-dashboard.component.scss',
})
export class IndicatorsDashboardComponent implements OnInit {
  private readonly customerService = inject(CustomerService);

  readonly displayedColumns = ['year', 'month', 'count'];
  readonly monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  loading = false;
  errorMessage: string | null = null;
  indicators: IndicatorResponse | null = null;

  birthRateChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  readonly birthRateChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Tasa de natalidad por mes (%)' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  ngOnInit(): void {
    this.load();
  }

  monthLabel(month: number): string {
    return this.monthNames[month - 1] ?? String(month);
  }

  monthYearLabel(entry: MonthYearCount | null): string {
    return entry ? `${this.monthLabel(entry.month)} ${entry.year}` : 'Sin datos';
  }

  private load(): void {
    this.loading = true;
    this.errorMessage = null;

    this.customerService.getIndicators().subscribe({
      next: (indicators) => {
        this.indicators = indicators;
        this.buildChart(indicators.birthRateByMonth);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los indicadores. Verifica la conexión con el servidor.';
        this.loading = false;
      },
    });
  }

  private buildChart(rates: BirthRate[]): void {
    this.birthRateChartData = {
      labels: rates.map((rate) => rate.monthName),
      datasets: [
        {
          label: 'Tasa de natalidad (%)',
          data: rates.map((rate) => rate.rate),
          backgroundColor: '#3f51b5',
          borderRadius: 4,
        },
      ],
    };
  }
}
