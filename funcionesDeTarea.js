const fs = require('fs');
const path = require('path');

const moduloTareas = {
    leerArchivo: function () {
        const tareasJSON = fs.readFileSync(path.join(__dirname, 'app-tareas', 'tareas.json'), 'utf-8');
        const tareasParseadas = JSON.parse(tareasJSON);
        return tareasParseadas;
    },

    escribirJSON: function (tareas) {
        fs.writeFileSync(path.join(__dirname, 'app-tareas', 'tareas.json'), JSON.stringify(tareas, null, 3), 'utf-8');
        return "Archivo JSON actualizado.";
    },

    detalle: function (titulo, estado) {

        const tareas = this.leerArchivo();
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].titulo === titulo) {
                return tareas[i];
            }
        }
        return "Debes escribir la tarea de la que quieres información.";
    },
    crearTarea: function (titulo, estado) {
        let error = [];
        !titulo && error.push("Debes escribir el título de la nueva tarea que quieres crear.");
        if (error.length) {
            return error;
        }

        let tareas = this.leerArchivo();
        const ultimaTarea = tareas[tareas.length - 1].titulo;
        const nuevaTarea = {
            titulo: titulo,
            estado: "Pendiente"
        }
        tareas.push(nuevaTarea);
        this.escribirJSON(tareas);
        return "¡Nueva tarea creada!";
    },

    editarTarea: function (titulo, estado) {
        let error = [];
        !titulo && error.push("Debes escribir la tarea que quieres editar.");
        !estado && error.push("Debes escribir también el estado de la tarea que quieres editar.");
        if (error.length) {
            return error;
        }

        let tareas = this.leerArchivo();
        const tareasEditadas = tareas.map(tarea => {
            if (tarea.titulo === titulo) {
                tareaModificada = {
                    titulo: titulo,
                    estado: estado
                }
                return tareaModificada;
            }
            return tarea;
        });
        this.escribirJSON(tareasEditadas);
        return tareasEditadas;
    },

    filtrarPorEstado: function (estado) {
        let error = [];
        !estado && error.push("Debes escribir el estado de la tarea que estás buscando.");
        if (error.length) {
            return error;
        }
        const tareas = this.leerArchivo();
        const tareasFiltradas = tareas.filter(tarea => {
            return tarea.estado.toUpperCase().includes(estado.toUpperCase());
        });
        return tareasFiltradas.length ? tareasFiltradas : "No se encontraron resultados para: " + estado;
    }
}

module.exports = moduloTareas;