# CLAUDE.md

Guía de contexto para asistentes de IA que trabajen en este repositorio.

## Descripción

Aplicación web en Angular 18 que consume la API del microservicio `customers`
para gestionar clientes y visualizar indicadores de natalidad.

## Stack

- Angular 18 con **standalone components** y lazy loading.
- TypeScript 5.5 en modo estricto.
- Angular Material 18 para la interfaz.
- ng2-charts + Chart.js para gráficos.
- RxJS y `HttpClient` (`withFetch`).
- Jasmine + Karma para pruebas.

## Comandos

| Acción | Comando |
| --- | --- |
| Servidor de desarrollo | `npm start` |
| Build de producción | `npm run build` |
| Tests (CI) | `npm test -- --watch=false --browsers=ChromeHeadless` |

En Windows, si Chrome no está en la ruta por defecto, define `CHROME_BIN`.

## Reglas del repositorio

Las reglas detalladas están en `.claude/rules/`:

- `.claude/rules/architecture.md` — estructura de carpetas y responsabilidades.
- `.claude/rules/coding-standards.md` — estilo y convenciones.
- `.claude/rules/testing.md` — estrategia y convenciones de pruebas.

## Convenciones rápidas

- Componentes **standalone**; no se usan `NgModule`.
- Lógica de acceso a datos únicamente en `core/services`.
- Tipos e interfaces de dominio en `core/models`.
- Rutas con `loadComponent` (lazy loading).
- Las peticiones HTTP son finitas (completan solas). Para flujos de larga vida
  (Observables continuos) usar `takeUntilDestroyed`.
- Los componentes de presentación no llaman directamente a `HttpClient`.

## Flujo de trabajo

1. Toda funcionalidad nueva se ubica bajo `features/`.
2. Toda función/componente nuevo se cubre con al menos una prueba.
3. Antes de finalizar un cambio, ejecutar los tests y el build.
