# Blog
Blog project using Node and MongoDB.

Este proyecto es una aplicacion web que consiste en una pagina principal en la que se puede leer un resumen de todas las entradas del blog, cada entrada muestra hasta 100 caracteres, 
si se desea ver una entrada completa, o ver una en una de forma independiente, se debera hacer click en el enlace "Read more". Esto te mostrara solo la entrada selecionada. Tambien
se pueden borrar entradas seleccionando el icono de basura en cada entrada, esto la elimina de la base de datos en la que se encuentra almacenada.
A su vez existen pestanias en la barra de navegacion que llevan a diferentes seccion, siendo una "Compose", seccion en la que se pueden crear entradas propias. Todas las entradas
se guardan en una base de Datos usando MongoDB y Mongoose.
La aplicacion esta diseniada utilizando ejs para simplificar la interaccion entre el HTML y el servidor.
