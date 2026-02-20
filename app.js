// ╔══════════════════════════════════════════════════════════╗
// ║   KUROMI'S USER LIST — app.js                            ║
// ║   API: https://jsonplaceholder.typicode.com/users        ║
// ║   Tema: obtener datos de un servidor con fetch           ║
// ╚══════════════════════════════════════════════════════════╝

// ══════════════════════════════════════════════════════════
//  📌 PASO 1: REFERENCIAS AL DOM
//
//  "Agarramos" los elementos HTML por su id.
//  Es como decirle a JavaScript:
//  "oye, guárdame ese elemento en una variable
//   para que yo pueda usarlo más tarde"
// ══════════════════════════════════════════════════════════
const btnCargar   = document.getElementById('btnCargar');
const estadoCarga = document.getElementById('estadoCarga');
const panelError  = document.getElementById('panelError');
const textoError  = document.getElementById('textoError');
const userList    = document.getElementById('userList');   // la <ul> vacía del HTML
const contador    = document.getElementById('contador');
const textoContador = document.getElementById('textoContador');

// ══════════════════════════════════════════════════════════
//  🌐 URL DE LA API
//
//  Esta es la "dirección" del servidor al que le vamos
//  a pedir los datos. Es como la dirección de una tienda,
//  pero en internet y nos devuelve información en JSON.
//
//  JSONPlaceholder es una API PÚBLICA Y GRATUITA.
//  No necesita API Key ni registro. ¡Perfecta para aprender!
// ══════════════════════════════════════════════════════════
const URL_API = 'https://jsonplaceholder.typicode.com/users';

// ══════════════════════════════════════════════════════════
//  🚀 FUNCIÓN PRINCIPAL: cargarUsuarios()
//
//  Esta función se ejecuta cuando el usuario hace clic
//  en el botón "¡Cargar Usuarios!".
//
//  "async" significa que esta función puede ESPERAR
//  cosas lentas (como respuestas de internet) sin
//  congelar toda la página.
// ══════════════════════════════════════════════════════════
async function cargarUsuarios() {

  // ── Preparar la interfaz para cargar ──────────────────
  mostrarEstado('cargando');
  btnCargar.disabled = true; // desactivar el botón mientras carga
  userList.innerHTML = '';   // limpiar lista anterior

  // ── try/catch: el "escudo" de los errores ─────────────
  //
  //  "try"   → "intenta hacer esto..."
  //  "catch" → "pero si algo falla, haz esto otro"
  //
  //  Es como intentar abrir una puerta:
  //  try  = intentar abrir
  //  catch = si está cerrada con llave, buscar la llave
  try {

    // ══════════════════════════════════════════════════
    //  📡 PASO 2: HACER LA PETICIÓN CON FETCH
    //
    //  fetch(url) le dice al navegador:
    //  "ve a esa dirección y tráeme lo que encuentres"
    //
    //  "await" significa "espera a que llegue la respuesta
    //  antes de continuar con la siguiente línea"
    //  Sin "await", el código seguiría corriendo antes
    //  de que lleguen los datos. ¡Eso causaría errores!
    // ══════════════════════════════════════════════════
    const respuesta = await fetch(URL_API);

    // ── Verificar si la respuesta fue exitosa ──────────
    //
    //  Cuando pedimos datos, el servidor nos responde con
    //  un "código de estado":
    //  200 = OK, todo bien ✅
    //  404 = No encontrado ❌
    //  500 = Error del servidor 💥
    //
    //  respuesta.ok = true  si el código está entre 200-299
    //  respuesta.ok = false si hubo algún error
    if (!respuesta.ok) {
      throw new Error(`¡Ups! Error del servidor: ${respuesta.status}`);
    }

    // ══════════════════════════════════════════════════
    //  📦 PASO 3: CONVERTIR LA RESPUESTA A JSON
    //
    //  La respuesta llega como texto plano.
    //  .json() lo convierte a un objeto JavaScript
    //  que podemos usar fácilmente.
    //
    //  JSON se ve así:
    //  [
    //    { "id": 1, "name": "Leanne Graham", "email": "..." },
    //    { "id": 2, "name": "Ervin Howell",  "email": "..." },
    //    ...
    //  ]
    // ══════════════════════════════════════════════════
    const usuarios = await respuesta.json();

    // ══════════════════════════════════════════════════
    //  📋 PASO 4: ITERAR Y CREAR ELEMENTOS <li>
    //
    //  "forEach" recorre cada usuario del array.
    //  Por cada usuario creamos un <li> y lo
    //  agregamos a la lista del HTML.
    //
    //  Es como tener una lista de personas y escribir
    //  el nombre de cada una en un papelito diferente.
    // ══════════════════════════════════════════════════
    usuarios.forEach(function(usuario) {
      // Crear el elemento <li> para este usuario
      const li = crearTarjetaUsuario(usuario);

      // Agregar el <li> al <ul id="userList"> del HTML
      // appendChild = "agrega este hijo al final del padre"
      userList.appendChild(li);
    });

    // ── Mostrar el contador de usuarios ───────────────
    textoContador.textContent = `✦ ${usuarios.length} usuarios invocados exitosamente ✦`;
    contador.classList.remove('hidden');

    // ── Mostrar la lista ───────────────────────────────
    mostrarEstado('listo');

  } catch (error) {
    // Si algo falló en el try, llegamos aquí
    // "error.message" tiene la descripción del problema
    mostrarEstado('error', error.message);

  } finally {
    // "finally" SIEMPRE se ejecuta, haya error o no.
    // Reactivamos el botón pase lo que pase.
    btnCargar.disabled = false;
  }
}

// ══════════════════════════════════════════════════════════
//  🎨 FUNCIÓN: crearTarjetaUsuario()
//
//  Recibe un objeto "usuario" con sus datos
//  y devuelve un elemento <li> ya armado y estilizado.
//
//  ¿Qué tiene el objeto usuario?
//  {
//    id:      1,
//    name:    "Leanne Graham",
//    email:   "Sincere@april.biz",
//    company: { name: "Romaguera-Crona" },
//    ...más datos que no usamos
//  }
// ══════════════════════════════════════════════════════════
function crearTarjetaUsuario(usuario) {

  // 1. Crear el elemento <li> vacío
  const li = document.createElement('li');

  // 2. Darle la clase CSS para que se vea bonito
  li.className = 'user-card';

  // 3. Obtener la inicial del nombre para el avatar
  //    ej: "Leanne Graham" → "L"
  const inicial = usuario.name.charAt(0).toUpperCase();

  // 4. Rellenar el contenido con template literals
  //    Los template literals usan ` ` (acento grave)
  //    y permiten poner variables con ${variable}
  li.innerHTML = `
    <div class="user-avatar">${inicial}</div>

    <div class="user-info">
      <div class="user-nombre">${usuario.name}</div>
      <div class="user-email">
        <span>✉</span> ${usuario.email}
      </div>
      <div class="user-empresa">
        <span>☠</span> ${usuario.company.name}
      </div>
    </div>

    <div class="user-id">#${usuario.id}</div>
  `;

  // 5. Devolver el <li> completo
  return li;
}

// ══════════════════════════════════════════════════════════
//  🎭 FUNCIÓN: mostrarEstado()
//
//  Controla qué se muestra en pantalla según el estado:
//  - 'cargando' → spinner de puntos saltarines
//  - 'listo'    → lista de usuarios (ya se agregaron al DOM)
//  - 'error'    → mensaje de error
// ══════════════════════════════════════════════════════════
function mostrarEstado(estado, mensajeError = '') {

  // Primero ocultamos todo
  estadoCarga.classList.add('hidden');
  panelError.classList.add('hidden');

  // Luego mostramos solo lo que necesitamos
  if (estado === 'cargando') {
    estadoCarga.classList.remove('hidden');
    contador.classList.add('hidden');

  } else if (estado === 'error') {
    textoError.textContent = mensajeError || '¡Algo salió mal!';
    panelError.classList.remove('hidden');
  }

  // 'listo' no necesita mostrar nada extra porque
  // los <li> ya fueron agregados al <ul> directamente
}