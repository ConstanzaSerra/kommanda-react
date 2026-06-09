# Clase React — Frontend con React

Punto de partida: `clase-odm/4-repo-comandas` (API completa con persistencia en MongoDB).

En esta clase se agrega un frontend React al proyecto, incorporando la estructura de monorepo (`backend/` + `frontend/`). Se parte de una pantalla estática y se construye progresivamente: componentización, estado local, comunicación con la API mock y finalmente carga asincrónica de datos.

---

## `clase-react/base`

Reestructuración del repositorio para alojar dos proyectos: el backend Express existente se mueve a `backend/`, y se incorpora la aplicación React inicial en `frontend/`.

- El `frontend/` es una app Create React App que muestra una lista de productos de ropa (el dominio original del proyecto base)
- El `backend/` contiene todo el código de las clases anteriores sin modificaciones
- A partir de aquí todas las clases de React trabajan exclusivamente sobre `frontend/`

---

## `clase-react/1-separando-componentes`

Se refactoriza la pantalla principal para extraer componentes reutilizables. El punto de partida tiene todo el HTML hardcodeado inline en un único componente.

- Se extrae `NavBar` para el encabezado con logo y slogan
- Se extrae `Titulo` para el título de sección
- Se extrae `CardPlato` para la tarjeta individual de cada plato
- Se extrae `ListaPlatos` que mapea la lista de datos a tarjetas
- Los datos de los platos pasan de 12 cards idénticas de "Pizza" a una constante `PLATOS` con nombres, imágenes y precios reales

---

## `clase-react/2-estado-local`

Se introduce `useState` para registrar qué platos seleccionó el usuario antes de armar la comanda.

- `CardPlato` incorpora un estado local `seleccionado` con `useState`
- Al hacer click en una tarjeta se alterna su estado y se aplica la clase CSS `selected` para feedback visual
- Se agrega un botón "Agregar a comanda" con su función `agregarAComanda` que por ahora solo loguea los platos seleccionados

---

## `clase-react/3-agregando-a-comanda`

Se conecta el botón de la comanda con la API mock y se corrigen detalles del modelo de datos.

- Se agrega un campo `id` numérico a cada plato de la constante `PLATOS`
- Se corrige `new Promise.resolve()` → `Promise.resolve()` en `api.js`
- `agregarAComanda` pasa a ser `async` y llama a `putCommanda` de la API mock; muestra un alert de confirmación con la cantidad de platos agregados

---

## `clase-react/4-levantando-estado`

Se sube el estado de selección desde `CardPlato` hacia `Home` (lifting state up), para que el componente padre controle qué platos están seleccionados y pueda pasarlos a `agregarAComanda`.

- El estado `seleccionado` sale de `CardPlato`; ahora `Home` mantiene la lista completa de platos con su flag de selección
- `CardPlato` pasa a ser un componente controlado: recibe `seleccionado` y `alSeleccionarPlato` como props
- `ListaPlatos` recibe `platos` y `cambiarSeleccionPlato` como props y los delega a cada tarjeta
- `agregarAComanda` en `Home` puede ahora filtrar `platos.filter(p => p.seleccionado)` correctamente
- Se corrige `<navbar>` por `<nav>` (elemento HTML semánticamente correcto)

---

## `clase-react/5-cargando-platos`

Se reemplaza la lista hardcodeada por una carga asincrónica desde la API, introduciendo `useEffect` y el patrón de carga con estado vacío inicial.

- La constante `PLATOS` desaparece del componente; el estado inicial es un array vacío `[]`
- `useEffect` dispara una función async `cargarPlatos` al montar el componente, que llama a `getPlatos()` de la API mock y actualiza el estado
- Mientras los datos no llegan se muestra `"Cargando..."` (renderizado condicional)
- `getPlatos` pasa a devolver objetos con `id` para que el estado de selección funcione igual que antes
