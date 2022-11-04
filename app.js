const process = require('process');
const moduloTareas = require('./funcionesDeTarea');

const tareas = process.argv[2];
let titulo = process.argv[3];
let estado = process.argv[4];

switch (tareas) {
    case "listar":
        const tareasArray = moduloTareas.leerArchivo();
        tareasArray.forEach(tarea => {
            console.log(`${tarea.titulo} - ${tarea.estado}`);
        });
        break;
    case "detalle":
        console.log(moduloTareas.detalle(titulo, estado));
        break;
    case "crear":
        console.log(moduloTareas.crearTarea(titulo, estado));
        break;
    case "filtrar":
        console.log(moduloTareas.filtrarPorEstado(titulo, estado));
        break;
    case "editar":
        console.log(moduloTareas.editarTarea(titulo, estado));
        break;
    case undefined:
        console.log("ATENCIÓN: ¡Tienes que pasar una acción!",
            "\nLas acciones disponibles son: 'listar', 'detalle', 'crear', 'filtrar' y 'editar'.");
        break;
    default:
        console.log("No entiendo qué quieres hacer.");
        break;
}