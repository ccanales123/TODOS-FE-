import { combineReducers } from 'redux';
import tareasReducer from './tareasReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    tareas: tareasReducer,
    alerta: alertaReducer 
});