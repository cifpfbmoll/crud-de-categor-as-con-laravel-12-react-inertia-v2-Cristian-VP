# 📊 Rúbrica de Evaluación: CRUD de Categorías

## Información General

| Campo | Valor |
|-------|-------|
| **Puntuación máxima** | 10 puntos |
| **Puntuación mínima para aprobar** | 5 puntos |
| **Modalidad** | Individual o parejas |

---

## Tarea 1: CRUD de Categorías (5 puntos)

### 1.1 Backend (2.5 puntos)

#### Migración (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | Todos los campos especificados, tipos correctos, restricciones (`unique`, `default`) aplicadas. |
| **Bien** | 0.4 | Campos correctos, falta alguna restricción menor. |
| **Suficiente** | 0.25 | Tabla creada pero faltan campos o tipos incorrectos. |
| **Insuficiente** | 0 | Migración ausente o no ejecutable. |

#### Modelo (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `$fillable` completo, `$casts` para boolean, relación `hasMany` definida. |
| **Bien** | 0.4 | `$fillable` correcto, falta `$casts` o relación. |
| **Suficiente** | 0.25 | Modelo básico sin configuración de atributos. |
| **Insuficiente** | 0 | Modelo ausente o con errores graves. |

#### Controlador (1 punto)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 1.0 | 4 métodos (index, store, update, destroy) completos. Validación correcta. Respuestas Inertia/JSON apropiadas. |
| **Bien** | 0.75 | Métodos implementados, validación básica, algún detalle menor. |
| **Suficiente** | 0.5 | Faltan métodos o validación incompleta. |
| **Insuficiente** | 0-0.25 | Controlador ausente o no funcional. |

#### Rutas (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | 4 rutas RESTful, middleware `auth` y `verified`, nombres asignados. |
| **Bien** | 0.4 | Rutas funcionales, falta middleware o nombres. |
| **Suficiente** | 0.25 | Rutas básicas sin protección. |
| **Insuficiente** | 0 | Rutas ausentes o erróneas. |

---

### 1.2 Frontend (2.5 puntos)

#### Tipos TypeScript (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | Interface `Category` completa con todos los campos tipados. Props de página tipadas. |
| **Bien** | 0.4 | Interface correcta, algún campo faltante. |
| **Suficiente** | 0.25 | Tipado básico o uso de `any`. |
| **Insuficiente** | 0 | Sin tipado TypeScript. |

#### Página Index (0.75 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.75 | Página completa con tabla, botón crear, modales, manejo de estado con hooks. |
| **Bien** | 0.5 | Página funcional con pequeños detalles a mejorar. |
| **Suficiente** | 0.35 | Listado básico sin modales o estado incompleto. |
| **Insuficiente** | 0-0.2 | Página ausente o no funcional. |

#### Componentes Tabla y Modal (0.75 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.75 | Componentes separados, reutilizables, props tipadas, formulario con validación visual. |
| **Bien** | 0.5 | Componentes funcionales, algún detalle de organización. |
| **Suficiente** | 0.35 | Todo en un archivo o sin separación de responsabilidades. |
| **Insuficiente** | 0-0.2 | Componentes ausentes o con errores graves. |

#### Navegación (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | Enlace "Categorías" en menú desktop y responsive, activo resaltado. |
| **Bien** | 0.4 | Enlace presente, falta en menú responsive. |
| **Suficiente** | 0.25 | Enlace básico sin estilos activos. |
| **Insuficiente** | 0 | Sin enlace de navegación. |

---

## Tarea 2: Relación Producto-Categoría (3 puntos)

### 2.1 Backend (1.5 puntos)

#### Migración Foreign Key (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `category_id` con `foreignId`, `constrained()`, `nullOnDelete()` o `cascadeOnDelete()`. |
| **Bien** | 0.4 | Foreign key correcta, falta constraint de eliminación. |
| **Suficiente** | 0.25 | Columna añadida sin foreign key constraint. |
| **Insuficiente** | 0 | Migración ausente o errónea. |

#### Relaciones Eloquent (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `belongsTo` en Product, `hasMany` en Category, tipos de retorno especificados. |
| **Bien** | 0.4 | Relaciones definidas, falta tipo de retorno. |
| **Suficiente** | 0.25 | Solo una relación definida. |
| **Insuficiente** | 0 | Sin relaciones. |

#### Controlador Actualizado (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `with('category')` en query, categorías pasadas a vista, validación de `category_id`. |
| **Bien** | 0.4 | Eager loading correcto, falta validación. |
| **Suficiente** | 0.25 | Categorías pasadas sin eager loading. |
| **Insuficiente** | 0 | Sin modificaciones al controlador. |

---

### 2.2 Frontend (1.5 puntos)

#### Tipos TypeScript Actualizados (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `Product` incluye `category_id?: number` y `category?: Category`. |
| **Bien** | 0.4 | Tipos actualizados, falta opcional o relación. |
| **Suficiente** | 0.25 | Tipos básicos sin relación. |
| **Insuficiente** | 0 | Sin actualización de tipos. |

#### Selector de Categoría en Modal (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | `<select>` con categorías activas, opción vacía, valor enlazado al estado. |
| **Bien** | 0.4 | Selector funcional, pequeños detalles UX. |
| **Suficiente** | 0.25 | Selector básico sin filtrar activas. |
| **Insuficiente** | 0 | Sin selector de categoría. |

#### Categoría en Tabla de Productos (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | Columna "Categoría" con nombre, badge con color si aplica, manejo de null. |
| **Bien** | 0.4 | Nombre mostrado, falta manejo de null o estilos. |
| **Suficiente** | 0.25 | Nombre mostrado sin estilos. |
| **Insuficiente** | 0 | Sin columna de categoría. |

---

## Tarea 3: Documentación y Entrega (2 puntos)

### 3.1 README.md (0.5 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.5 | README completo: instalación, uso, características, capturas de pantalla. Contenido personalizado. |
| **Bien** | 0.4 | README con la mayoría de secciones, falta algún detalle. |
| **Suficiente** | 0.25 | README básico con instalación y uso. |
| **Insuficiente** | 0 | README sin modificar o copiado sin adaptar. |

### 3.2 Resumen Reflexivo (0.75 puntos)

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.75 | Archivo `docs/REFLEXION.md` de máx. 1 página. Incluye proceso, dificultades, aprendizajes y opinión personal. Escrito con palabras propias, auténtico y reflexivo. |
| **Bien** | 0.5 | Resumen completo pero poco profundo o algo genérico. |
| **Suficiente** | 0.35 | Resumen muy breve o faltan secciones importantes. |
| **Insuficiente** | 0 | Ausente o claramente generado por IA sin personalizar. |

### 3.3 Vídeo Demostrativo (0.75 puntos) ⚠️ OBLIGATORIO

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| **Excelente** | 0.75 | Vídeo de 3-5 min mostrando CRUD categorías, relación con productos, explicación del código. Audio claro. |
| **Bien** | 0.5 | Vídeo completo pero sin explicación verbal o muy breve. |
| **Suficiente** | 0.35 | Vídeo incompleto, falta demostrar alguna funcionalidad. |
| **No presentado** | **-10** | **Sin vídeo = práctica no evaluable.** |

> ⚠️ **IMPORTANTE**: La entrega del vídeo es **obligatoria**. Sin vídeo, la práctica no será evaluada y se calificará con 0.

---

## Penalizaciones

| Penalización | Puntos | Motivo |
|--------------|--------|--------|
| **Plagio** | -10 | Código copiado de compañero sin atribución |
| **No funciona** | -2 | La aplicación no arranca |
| **Entrega tardía** | -0.5/día | Por cada día de retraso (máx -2) |
| **Archivos innecesarios** | -0.25 | Subir node_modules, vendor, .env |

---

## Escala de Calificación

| Nota | Rango | Descripción |
|------|-------|-------------|
| **Sobresaliente** | 9-10 | Todo completo y bien implementado |
| **Notable** | 7-8.9 | Funcionalidades completas con detalles menores |
| **Bien** | 6-6.9 | CRUD funcional con algunos fallos |
| **Suficiente** | 5-5.9 | Requisitos mínimos cumplidos |
| **Insuficiente** | <5 | No cumple requisitos mínimos |

---

## Checklist de Autoevaluación

Antes de entregar, verifica:

### Tarea 1: CRUD Categorías
- [ ] Migración ejecuta sin errores (`php artisan migrate`)
- [ ] Modelo tiene `$fillable` y `$casts`
- [ ] Controlador tiene los 4 métodos CRUD
- [ ] Rutas protegidas con `auth` middleware
- [ ] Interface TypeScript `Category` definida
- [ ] Página `/categories` muestra tabla
- [ ] Modal crear/editar funciona
- [ ] Enlace en navegación

### Tarea 2: Relación
- [ ] Columna `category_id` en tabla `products`
- [ ] Relación `belongsTo` en Product
- [ ] Relación `hasMany` en Category
- [ ] Selector de categoría en formulario de producto
- [ ] Categoría visible en tabla de productos

### Tarea 3: Documentación y Entrega
- [ ] README.md con instalación, uso, características y capturas
- [ ] Archivo `docs/REFLEXION.md` con resumen reflexivo personal
- [ ] Vídeo de 3-5 min subido a YouTube (o similar)
- [ ] Enlace del vídeo incluido en README
- [ ] Repositorio público y accesible

---

## Plantilla de Evaluación

### Alumno: _______________
### Fecha: _______________

| Criterio | Puntos | Máx | Comentarios |
|----------|--------|-----|-------------|
| **T1: Backend** | | 2.5 | |
| - Migración | | 0.5 | |
| - Modelo | | 0.5 | |
| - Controlador | | 1.0 | |
| - Rutas | | 0.5 | |
| **T1: Frontend** | | 2.5 | |
| - Tipos TS | | 0.5 | |
| - Página Index | | 0.75 | |
| - Componentes | | 0.75 | |
| - Navegación | | 0.5 | |
| **T2: Backend** | | 1.5 | |
| - Migración FK | | 0.5 | |
| - Relaciones | | 0.5 | |
| - Controlador | | 0.5 | |
| **T2: Frontend** | | 1.5 | |
| - Tipos TS | | 0.5 | |
| - Selector | | 0.5 | |
| - Tabla | | 0.5 | |
| **T3: Documentación** | | 2.0 | |
| - README.md | | 0.5 | |
| - Resumen Reflexivo | | 0.75 | |
| - Vídeo Demostrativo | | 0.75 | |
| **TOTAL** | | **10** | |
| | | | |
| **¿Vídeo entregado?** | ☐ Sí / ☐ No | | Sin vídeo = 0 |

---

*Rúbrica v2.0 - Diciembre 2024*
