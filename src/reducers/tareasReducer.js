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
    TAREA_ELIMINADA_ERROR,
    TAREA_ELIMINADA_EXITO
} from '../types';

// cada reducer tiene su propio state
const initialState = {
    tareas: [],
    error: null,
    loading: false,
    tareaeditar: null,
    tareaeliminar: null,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case COMENZAR_DESCARGA_TAREAS:
        case AGREGAR_TAREA:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_TAREA_EXITO:
            return {
                ...state,
                loading: false,
                tareas: [...state.tareas, action.payload]
            }
        case AGREGAR_TAREA_ERROR:
        case DESCARGA_TAREAS_ERROR:
        case TAREA_EDITADA_ERROR:
        case TAREA_ELIMINADA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_TAREAS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                tareas: action.payload.tasks
            }
        case OBTENER_TAREA_EDITAR:
            return {
                ...state,
                tareaeditar: action.payload
            }
        case TAREA_EDITADA_EXITO:
            return {
                ...state,
                tareaeditar: null,
                tareas: state.tareas.map( tarea => 
                    tarea.id === action.payload.id ? tarea = action.payload : tarea
                )
            }
        case OBTENER_TAREA_ELIMINAR:
            return {
                ...state,
                tareaeliminar: action.payload
            }
        case TAREA_ELIMINADA_EXITO:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== state.tareaeliminar),
                tareaeliminar: null
            }
        default:
            return state;
    }
}