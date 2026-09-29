# Regla: Pruebas

## Estrategia

- Pruebas unitarias con **Jasmine + Karma** (configuración por defecto de
  Angular).
- Configurar `TestBed` con `imports: [<ComponenteStandalone>]` y proveer lo
  necesario (`provideRouter`, `provideAnimations`, `provideHttpClientTesting`,
  `provideNativeDateAdapter`).
- Usar `HttpTestingController` para simular respuestas del backend; nunca
  realizar peticiones reales.
- Llamar `httpMock.verify()` en `afterEach`.

## Convenciones

- Archivo: `<nombre>.component.spec.ts` junto al componente.
- `describe`: nombre de la clase.
- `it`: describe el comportamiento esperado en lenguaje natural.
- Preferir aserciones sobre el estado/expuesto por el componente antes que sobre
  internos de Angular Material.

## Comandos

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

En Windows, definir `CHROME_BIN` si Chrome no está en la ruta por defecto.
