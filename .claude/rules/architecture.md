# Regla: Arquitectura

## Estructura

```
src/app/
├── core/        # Singletons: modelos y servicios de acceso a datos
│   ├── models/
│   └── services/
├── features/    # Áreas funcionales (lazy loaded)
│   ├── customers/
│   └── indicators/
├── app.config.ts
└── app.routes.ts
```

| Carpeta | Responsabilidad |
| --- | --- |
| `core/models` | Interfaces y tipos de dominio. Sin lógica. |
| `core/services` | Única capa que consume la API con `HttpClient`. |
| `features/**` | Componentes, plantillas y estilos de cada funcionalidad. |

## Reglas

- Usar **standalone components**. No crear `NgModule`.
- Cada componente vive en su propia carpeta:
  `<nombre>.component.ts`, `.html`, `.scss` (y `.spec.ts` si tiene pruebas).
- Los servicios se exponen con `providedIn: 'root'` y se inyectan con la
  función `inject()`.
- Las rutas se declaran con `loadComponent` para carga diferida y con `title`.
- Un componente de `features` no debe instanciar `HttpClient`; siempre pasa por
  un servicio de `core/services`.
- Los componentes de presentación reciben datos por `@Input` y notifican por
  `@Output` (patrón usado en `SearchFilterComponent`).

## Configuración global

`app.config.ts` centraliza los providers: `provideRouter`, `provideHttpClient`,
`provideAnimationsAsync`, `provideNativeDateAdapter` y `provideCharts`.
