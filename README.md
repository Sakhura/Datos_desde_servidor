# ☠ Kuromi's User List — Fetch API

| | |
|---|---|
| 📅 **Fecha** | 20 de febrero de 2026 |
| 👩‍🏫 **Docente** | Sabina Romero |

Proyecto demostrativo que usa la **Fetch API** para obtener datos de un servidor externo de manera asíncrona. Muestra una lista de usuarios obtenidos desde **JSONPlaceholder**, una API pública y gratuita ideal para aprender. Diseñado con estética **Gothic Kawaii de Kuromi** (Sanrio).

---

## 📁 Estructura del Proyecto

```
kuromi-user-list/
├── index.html   → Estructura HTML con la lista vacía
├── app.js       → Lógica JavaScript (Fetch API + DOM)
├── style.css    → Estilos Gothic Kawaii (Kuromi)
└── README.md    → Este archivo
```

---

## 🚀 ¿Cómo ejecutar?

1. Descarga los archivos del proyecto.
2. Abre `index.html` en tu navegador (doble clic).
3. Haz clic en el botón **☠ ¡Cargar Usuarios! ☠**
4. ¡Los 10 usuarios aparecerán con animación!

> ✅ No necesitas API Key ni crear cuenta. JSONPlaceholder es 100% pública y gratuita.

---

## 🌐 API Utilizada

### JSONPlaceholder
**URL:** `https://jsonplaceholder.typicode.com/users`

Es una API pública gratuita creada especialmente para practicar. Devuelve datos de prueba (usuarios, posts, comentarios) sin necesidad de registro.

**Respuesta de ejemplo:**
```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "company": { "name": "Romaguera-Crona" }
  },
  ...10 usuarios en total
]
```

---

## 🧠 Los 4 pasos del ejercicio

### Paso 1 — HTML: lista vacía con `id="userList"`
```html
<!-- En index.html: lista vacía que JavaScript va a llenar -->
<ul id="userList"></ul>
```

### Paso 2 — fetch: pedir datos al servidor
```javascript
// fetch() va a la URL y trae los datos
// await = "espera hasta que lleguen los datos"
const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
```

### Paso 3 — .json(): convertir la respuesta
```javascript
// La respuesta llega como texto → .json() la convierte
// a un array de objetos que podemos usar en JavaScript
const usuarios = await respuesta.json();
```

### Paso 4 — forEach + appendChild: iterar y mostrar
```javascript
// Por cada usuario del array, creamos un <li> y lo añadimos a la lista
usuarios.forEach(function(usuario) {
    const li = document.createElement('li'); // crear el <li>
    li.textContent = usuario.name;           // poner el nombre
    userList.appendChild(li);               // añadir a la lista del HTML
});
```

---

## 🔄 Flujo completo

```
[Click en botón]
       ↓
  fetch(URL_API)
  → await (esperar respuesta del servidor)
       ↓
  ¿respuesta.ok?
   ↙        ↘
  SÍ          NO
   ↓           ↓
respuesta.json()  throw Error
→ await            ↓
   ↓          mostrarError()
usuarios.forEach()
→ crear <li> por cada usuario
→ userList.appendChild(li)
   ↓
Lista visible en pantalla ✅
```

---

## 🧩 Conceptos clave

| Concepto | ¿Qué es? | Ejemplo |
|---|---|---|
| `fetch(url)` | Pide datos a un servidor por internet | `fetch('https://...')` |
| `async` | Marca una función que puede esperar cosas lentas | `async function cargar()` |
| `await` | Pausa hasta que llegue una respuesta | `const r = await fetch(url)` |
| `.json()` | Convierte texto de la API a objeto JavaScript | `const datos = await r.json()` |
| `forEach` | Recorre cada elemento de un array | `datos.forEach(item => ...)` |
| `createElement` | Crea un elemento HTML nuevo | `document.createElement('li')` |
| `appendChild` | Agrega un elemento dentro de otro | `lista.appendChild(li)` |
| `try / catch` | Maneja errores sin romper la página | `try { ... } catch(e) { ... }` |

---

## ⚠️ Manejo de errores

El proyecto maneja 3 tipos de situaciones:

| Situación | ¿Qué pasa? |
|---|---|
| Todo OK (código 200) | Se muestran las tarjetas de usuarios |
| Error del servidor (404, 500, etc.) | Se muestra mensaje de error con el código |
| Sin internet | `catch` atrapa el error de red y lo muestra |

---

## 🎨 Diseño

La interfaz usa la paleta de colores de **Kuromi** (personaje de Sanrio):

- **Fondo negro/morado** `#1a1025` — oscuro como el lado travieso de Kuromi
- **Morado brillante** `#a855f7` — color signature del personaje
- **Rosa kawaii** `#f472b6` — los cachetes y detalles
- **Carita de Kuromi** hecha 100% con CSS (sin imágenes)
- **Animaciones escalonadas** en las tarjetas (aparecen una por una)
- **Fuentes Fredoka One + Nunito** — redondeadas y kawaii

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (variables CSS, animaciones, gradientes, `clip-path`)
- JavaScript ES6+ (async/await, fetch, forEach, template literals)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — API pública gratuita
- [Google Fonts](https://fonts.google.com/) — Fredoka One y Nunito