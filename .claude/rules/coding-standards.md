# Regla: Estándares de código

## TypeScript

- Modo estricto activado. Evitar `any`; tipar todo.
- Usar `interface` para modelos de dominio y `type` para uniones.
- Nombres: `PascalCase` para clases e interfaces, `camelCase` para
  métodos/variables, `UPPER_SNAKE_CASE` para constantes.
- Archivos: `kebab-case` (`customer-form.component.ts`).

## Componentes

- Declarar `standalone: true`, `imports`, `templateUrl` y `styleUrl`.
- Usar inyección por función `inject()` en lugar del constructor.
- Formularios siempre **reactivos** (`ReactiveFormsModule`), nunca template-driven.
- Cadenas visibles para el usuario en español.

## Estilos

- SCSS con la metodología BEM anidada (`&__elemento`, `&--modificador`).
- Estilos propios del componente en su `.scss`; estilos globales solo en
  `src/styles.scss`.
- Usar la paleta y los componentes de Angular Material.

## HTTP y configuración

- La URL base de la API proviene de `environment.ts`; no hardcodear URLs en
  componentes.
- Configurar la API por entorno; producción usa `apiUrl: '/api'`.

## Prohibiciones

- No usar `any`.
- No suscribirse sin criterio dentro de plantillas.
- No introducir llamadas HTTP en los componentes.
- No dejar `console.log` en el código entregado.
