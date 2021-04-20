import React from 'react';
import { useHistory } from 'react-router-dom';
//import Swal from 'sweetalert2';


// Redux
import { useDispatch } from 'react-redux';
import { borrarTareaAction, obtenerTareaEditar } from '../actions/tareaActions';

const Tarea = ({tarea}) => {
    const { name, description, id, created_at} = tarea;

    const dispatch = useDispatch();
    const history = useHistory(); 

    const fetchDetails = tarea => console.log(tarea);

    var cts = created_at,
    cdate = (new Date(cts)).toString();
    return ( 

        <tr onClick={() => fetchDetails(tarea)}>
            <td>{name}</td>
            <td>{cdate}</td>
            <td>{description}</td>
        </tr>

       
     );
}
 
export default Tarea;