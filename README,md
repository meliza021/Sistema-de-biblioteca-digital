# 3. Sistema de biblioteca digital**

Crea un sistema de gestión de libros utilizando objetos y JSON. El sistema debe permitir registrar libros, usuarios y préstamos.

1. Crea un array llamado `libros`, donde cada elemento sea un objeto con las propiedades:
   - `isbn` (string)
   - `titulo` (string)
   - `autor` (string)
   - `disponible` (boolean)
2. Crea un array llamado `usuarios`, donde cada usuario tenga:
   - `id` (número)
   - `nombre` (string)
   - `correo` (string)
   - `prestamos` (array de ISBNs de libros prestados)
3. Implementa una función `registrarLibro(libro)` que agregue un nuevo libro al array `libros`.
4. Implementa una función `registrarUsuario(usuario)` que agregue un nuevo usuario al array `usuarios`.
5. Crea una función `prestarLibro(idUsuario, isbnLibro)` que:
   - Verifique si el libro está disponible.
   - Agregue el ISBN del libro al array `prestamos` del usuario.
   - Marque el libro como no disponible.
6. Crea una función `devolverLibro(idUsuario, isbnLibro)` que:
   - Elimine el ISBN del libro del array `prestamos` del usuario.
   - Marque el libro como disponible.
7. Crea una función `librosPrestadosPorUsuario(idUsuario)` que retorne un array con los títulos de los libros prestados por ese usuario.
8. Implementa `exportarDatosBiblioteca()` que convierta los arrays `libros` y `usuarios` en una cadena JSON conjunta.
9. Implementa `importarDatosBiblioteca(json)` que cargue datos desde una cadena JSON y los asigne a los arrays `libros` y `usuarios`.