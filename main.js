
let libros = [];
let usuarios = [];


function registrarLibro(libro) {
  libros.push(libro);
}


function registrarUsuario(usuario) {
  usuarios.push(usuario);
}


function prestarLibro(idUsuario, isbnLibro) {
  const usuario = usuarios.find(u => u.id === idUsuario);
  const libro = libros.find(l => l.isbn === isbnLibro);

  if (!usuario) {
    return 'Usuario no encontrado';
  }
  if (!libro) {
    return 'Libro no encontrado';
  }
  if (!libro.disponible) {
    return 'El libro no está disponible';
  }

  usuario.prestamos.push(isbnLibro);
  libro.disponible = false;
  return `Libro con ISBN ${isbnLibro} prestado a ${usuario.nombre}`;
}

function devolverLibro(idUsuario, isbnLibro) {
  const usuario = usuarios.find(u => u.id === idUsuario);
  const libro = libros.find(l => l.isbn === isbnLibro);

  if (!usuario) {
    return 'Usuario no encontrado';
  }
  if (!libro) {
    return 'Libro no encontrado';
  }
  if (!usuario.prestamos.includes(isbnLibro)) {
    return 'El libro no ha sido prestado a este usuario';
  }
  usuario.prestamos = usuario.prestamos.filter(isbn => isbn !== isbnLibro);
  libro.disponible = true;
  return `Libro con ISBN ${isbnLibro} devuelto por ${usuario.nombre}`;
}

function librosPrestadosPorUsuario(idUsuario) {
  const usuario = usuarios.find(u => u.id === idUsuario);
  if (!usuario) {
    return 'Usuario no encontrado';
  }

  const librosPrestados = usuario.prestamos.map(isbn => {
    const libro = libros.find(l => l.isbn === isbn);
    return libro ? libro.titulo : null;
  }).filter(titulo => titulo !== null);

  return librosPrestados;
}

function exportarDatosBiblioteca() {
  const datosBiblioteca = {
    libros: libros,
    usuarios: usuarios
  };
  return JSON.stringify(datosBiblioteca, null, 2); 
}

function importarDatosBiblioteca(json) {
  try {
    const datos = JSON.parse(json);
    libros = datos.libros || [];
    usuarios = datos.usuarios || [];
  } catch (e) {
    console.error("Error al importar el JSON", e);
  }
}

function menu() {
  let opcion = '';
  do {
    opcion = prompt(`
    Elige una opción:
    1. Registrar libro
    2. Registrar usuario
    3. Prestar libro
    4. Devolver libro
    5. Ver libros prestados por un usuario
    6. Exportar datos de la biblioteca
    7. Importar datos de la biblioteca
    8. Salir
    `);

    switch (opcion) {
      case '1':
        const isbn = prompt("Introduce el ISBN del libro:");
        const titulo = prompt("Introduce el título del libro:");
        const autor = prompt("Introduce el autor del libro:");
        const disponible = confirm("¿Está disponible el libro?");
        registrarLibro({ isbn, titulo, autor, disponible });
        alert("Libro registrado exitosamente");
        break;
      case '2':
        const idUsuario = parseInt(prompt("Introduce el ID del usuario:"));
        const nombreUsuario = prompt("Introduce el nombre del usuario:");
        const correoUsuario = prompt("Introduce el correo del usuario:");
        registrarUsuario({ id: idUsuario, nombre: nombreUsuario, correo: correoUsuario, prestamos: [] });
        alert("Usuario registrado exitosamente");
        break;
      case '3':
        const idPrestamo = parseInt(prompt("Introduce el ID del usuario para prestar el libro:"));
        const isbnPrestamo = prompt("Introduce el ISBN del libro a prestar:");
        const mensajePrestamo = prestarLibro(idPrestamo, isbnPrestamo);
        alert(mensajePrestamo);
        break;
      case '4':
        const idDevolucion = parseInt(prompt("Introduce el ID del usuario para devolver el libro:"));
        const isbnDevolucion = prompt("Introduce el ISBN del libro a devolver:");
        const mensajeDevolucion = devolverLibro(idDevolucion, isbnDevolucion);
        alert(mensajeDevolucion);
        break;
      case '5':
        const idBuscarLibros = parseInt(prompt("Introduce el ID del usuario para ver los libros prestados:"));
        const librosPrestados = librosPrestadosPorUsuario(idBuscarLibros);
        alert(librosPrestados.length > 0 ? `Libros prestados: ${librosPrestados.join(", ")}` : "El usuario no tiene libros prestados.");
        break;
      case '6':
        const datosExportados = exportarDatosBiblioteca();
        alert("Datos exportados a JSON:\n" + datosExportados);
        break;
      case '7':
        const jsonImportado = prompt("Introduce el JSON de datos para importar:");
        importarDatosBiblioteca(jsonImportado);
        alert("Datos importados exitosamente");
        break;
      case '8':
        alert("¡Hasta luego!");
        break;
      default:
        alert("Opción no válida. Intenta de nuevo.");
    }
  } while (opcion !== '8');
}

menu();
