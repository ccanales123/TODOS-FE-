import {
    AGREGAR_TAREA,
    AGREGAR_TAREA_EXITO,
    AGREGAR_TAREA_ERROR,
    COMENZAR_DESCARGA_TAREAS,
    DESCARGA_TAREAS_EXITO,
    DESCARGA_TAREAS_ERROR,
    OBTENER_TAREA_EDITAR,
    COMENZAR_EDICION_TAREA,
    TAREA_EDITADA_EXITO,
    TAREA_EDITADA_ERROR,
    OBTENER_TAREA_ELIMINAR,
    TAREA_ELIMINADA_EXITO,
    TAREA_ELIMINADA_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevaTareaAction(tarea) {
    return async (dispatch) => {
        dispatch( agregarTarea() );
        try {
            // insertar en la API
            await clienteAxios.post('/tasks', tarea);
            // Si todo sale bien, actualizar el state
           
           dispatch(agregarTareaExito(tarea));
            // Alerta
            Swal.fire(
                'Correcto', 
                'la tarea se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log("error",error);
            // si hay un error cambiar el state
            dispatch( agregarTareaError(true) );

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarTarea = () => ({
    type: AGREGAR_TAREA,
    payload: true
});

// si el producto se guarda en la base de datos
const agregarTareaExito = tarea => ({
    type: AGREGAR_TAREA_EXITO,
    payload: tarea
})

// si hubo un error
const agregarTareaError = estado => ({
    type: AGREGAR_TAREA_ERROR,
    payload: estado
});

export function obtenerTareasAction() {
    return async (dispatch) => {
        dispatch( descargarTareas() );
        try {
            const respuesta = await clienteAxios.get('tasks/');
            dispatch( descargaTareasExitosa(respuesta.data) )
        } catch (error) {
            console.log(error);
            dispatch( descargaTareasError() )
        }
    }
}

const descargarTareas = () => ({
    type: COMENZAR_DESCARGA_TAREAS,
    payload: true
});

const descargaTareasExitosa = tareas => ({
    type: DESCARGA_TAREAS_EXITO,
    payload: tareas
})
const descargaTareasError = () => ({
    type: DESCARGA_TAREAS_ERROR, 
    payload: true
});

// Colocar tarea en edición
export function obtenerTareaEditar(tarea) {
    return (dispatch) => {
        dispatch( obtenerTareaEditarAction(tarea) )
    }
}

const obtenerTareaEditarAction = tarea => ({
    type: OBTENER_TAREA_EDITAR,
    payload: tarea
})

// Edita un registro en la api y state
export function editarTareaAction(tarea) {
 
    return async (dispatch) => {
        dispatch( editarTarea() );

        try {
            console.log("tarea",tarea.completed)
            await clienteAxios.put(`/tasks/${tarea.id}`, tarea.completed);    
            dispatch( editarTareaExito(tarea) );
        } catch (error) {
            console.log(error);
            dispatch( editarTareaError() );
        }
    }
}
const editarTarea = () => ({
    type: COMENZAR_EDICION_TAREA
});

const editarTareaExito = tarea => ({
    type: TAREA_EDITADA_EXITO,
    payload: tarea
});

const editarTareaError = () => ({
    type: TAREA_EDITADA_ERROR,
    payload: true
})


// Selecciona y elimina la tarea
export function borrarTareaAction(id) {
    return async (dispatch) => {
        dispatch(obtenerTareaEliminar(id) );

        try {
            await clienteAxios.delete(`/tasks/${id}`);
            dispatch( eliminarTareaExito() );

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'La tarea se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarTareaError() );
        }
    }
}

const obtenerTareaEliminar = id => ({
    type: OBTENER_TAREA_ELIMINAR,
    payload: id
});
const eliminarTareaExito = () => ({
    type: TAREA_ELIMINADA_EXITO
})
const eliminarTareaError = () => ({
    type: TAREA_ELIMINADA_ERROR,
    payload: true
});