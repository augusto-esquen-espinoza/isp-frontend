# ISP Customers — Aplicación Web (Frontend)

Aplicación web en Angular para la gestión de clientes y la visualización de
indicadores de natalidad. Consume la API del microservicio `isp-backend`.
Forma parte del Reto Técnico II.

## Tabla de contenido

- [Descripción](#descripción)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Funcionalidades](#funcionalidades)
- [Integración con el backend](#integración-con-el-backend)
- [Pruebas](#pruebas)
- [Estructura del proyecto](#estructura-del-proyecto)

## Descripción

Interfaz web que permite:

1. Consultar clientes en una tabla con paginación y ordenamiento.
2. Filtrar clientes por DNI o email.
3. Registrar nuevos clientes mediante un formulario validado.
4. Consultar los indicadores de natalidad en tarjetas, tabla y gráfico.

## Stack tecnológico

| Componente | Tecnología |
| --- | --- |
| Framework | Angular 18 (standalone components) |
| Lenguaje | TypeScript 5.5 (modo estricto) |
| UI | Angular Material 18 |
| Gráficos | ng2-charts 6 + Chart.js 4 |
| HTTP | `@angular/common/http` + `fetch` |
| Estado/Reactividad | RxJS |
| Testing | Jasmine + Karma |
| Gestor de paquetes | npm |

## Requisitos

- Node.js 18.19+ o 20.11+ (probado con Node 22).
- npm.
- El backend `isp-backend` en ejecución (por defecto en `http://localhost:8080`).

## Instalación y ejecución

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Asegúrate de tener el backend en ejecución (`docker compose up` en el repo
   `isp-backend`).

3. Levanta el servidor de desarrollo:

   ```bash
   npm start
   ```

4. Abre `http://localhost:4200` en el navegador.

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo en `http://localhost:4200`. |
| `npm run build` | Build de producción en `dist/isp-frontend`. |
| `npm test` | Pruebas unitarias con Karma (modo watch). |
| `npm test -- --watch=false --browsers=ChromeHeadless` | Pruebas en CI. |

## Funcionalidades

### Consulta de clientes

Tabla (`MatTable`) con paginación y ordenamiento. Se cargan todos los clientes
al entrar a la vista.

### Filtro por DNI o email

El componente de búsqueda permite elegir el criterio (DNI o email), ingresar el
valor y consultar. El botón **Limpiar** restablece el listado completo.

### Formulario de creación

Formulario reactivo con validaciones:

- `nombre` y `apellido`: obligatorios, máximo 100 caracteres.
- `email`: obligatorio y con formato válido.
- `dni`: obligatorio, exactamente 8 dígitos.
- `fechaNacimiento`: obligatoria, mediante datepicker (no permite fechas
  futuras).

Al guardar correctamente se notifica y se redirige al listado. Los errores del
backend (400/409) se muestran al usuario.

### Indicadores

Vista con:

- Tarjetas resumen: total de clientes, mes/año con más nacimientos y mes/año
  con menos nacimientos.
- Gráfico de barras de la tasa de natalidad por mes.
- Tabla de nacimientos por mes/año.

## Integración con el backend

La URL de la API se configura en los archivos de entorno:

- `src/environments/environment.ts` (desarrollo):
  `apiUrl: 'http://localhost:8080/api'`.
- `src/environments/environment.production.ts` (producción): `apiUrl: '/api'`.

El servicio `CustomerService` (`src/app/core/services/customer.service.ts`)
consume los endpoints:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `POST` | `/api/customers` | Crear cliente. |
| `GET` | `/api/customers?dni=&email=` | Consultar/filtrar clientes. |
| `GET` | `/api/indicators` | Obtener indicadores. |

El backend permite CORS para `http://localhost:4200`.

## Pruebas

```bash
# Linux/macOS
npm test -- --watch=false --browsers=ChromeHeadless

# Windows (PowerShell)
npm test -- --watch=false --browsers=ChromeHeadless
```

Si Chrome no está en la ruta por defecto, define `CHROME_BIN`:

```powershell
$env:CHROME_BIN = "C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Pruebas incluidas:

- `customer-form.component.spec.ts`: formulario inválido, no se llama a la API
  con datos inválidos, envío correcto (incluye el formato de fecha) y manejo de
  error 409.
- `app.component.spec.ts`: se renderiza el shell de la aplicación.

## Estructura del proyecto

```
src/
├── environments/                 # Configuración por entorno (apiUrl)
├── styles.scss                   # Estilos globales
└── app/
    ├── app.config.ts             # Providers: router, http, animations, charts
    ├── app.routes.ts             # Rutas con lazy loading
    ├── app.component.*           # Shell con toolbar y navegación
    ├── core/
    │   ├── models/               # Interfaces de dominio
    │   └── services/             # CustomerService (HTTP)
    └── features/
        ├── customers/
        │   ├── customer-list/    # Tabla de clientes
        │   ├── customer-form/    # Formulario de creación
        │   └── search-filter/    # Filtro por DNI/email
        └── indicators/
            └── indicators-dashboard/  # Indicadores (tarjetas, tabla, gráfico)
```

## Notas

- El archivo `.npmrc` del proyecto fija el registry público de npm para que la
  instalación sea reproducible. Si tu organización usa un registry privado,
  puedes eliminarlo o ajustarlo.
