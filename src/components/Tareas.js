import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';
import { useHistory } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    borrarTareaAction,
    obtenerTareaEditar,
    crearNuevaTareaAction,
    obtenerTareasAction,
    editarTareaAction
} from '../actions/tareaActions';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../Sidebar.css';
import { IconContext } from 'react-icons';
import Select from 'react-select';
import { BsFillTrashFill, BsPencil, BsPlusCircle } from "react-icons/bs";
import Swal from 'sweetalert2';
import active from '../active.PNG';
import inactive from '../inactive.PNG';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tareas = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, guardarName] = useState('');
    const [description, guardarDescription] = useState('');
    const [sidebar, setSidebar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const showSidebar = () => setSidebar(!sidebar);

    const dispatch = useDispatch();
    useEffect(() => {
        const cargarTareas = () => dispatch(obtenerTareasAction());
        cargarTareas();
    }, []);

    // Confirmar si desea eliminarlo
    const confirmarEliminarTarea = id => {

        // preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "La tarea que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // pasarlo al action
                setSidebar(!sidebar)
                dispatch(borrarTareaAction(id));
            }
        });
    }
    // tarea a editar

    const [tareaEdit, guardarTarea] = useState({
        id:'',
        name: '',
        description: '',
        completed: ''

    })

    const tareaeditar = useSelector(state => state.tareas.tareaeditar);

    // llenar el state automaticamente
    useEffect(() => {
        guardarTarea(tareaeditar);
    }, [tareaeditar]);

    const onChangeFormulario = e => {
        guardarTarea({
            ...tareaEdit,
            [e.name] : e.value
        })
        
    }
 
    const options = [
        { value: true, label: 'Status : Completed', name: 'completed' },
        { value: false, label: 'Status : Pending' ,name: 'completed' },
    ];

    // Acceder al state del store
    const tareas = useSelector(state => state.tareas.tareas);
    const error = useSelector(state => state.tareas.error);
    const cargando = useSelector(state => state.tareas.loading);
    const alerta = useSelector(state => state.alerta.alerta);

    // mandar llamar el action de tareaAction
    const agregarTarea = tarea => dispatch(crearNuevaTareaAction(tarea));
    // cuando el usuario haga submit
    const submitNuevaTarea = e => {
        setShow(false)
        e.preventDefault();
        // validar formulario
        if (name === '' || description === '') {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }
        // si no hay errores
        dispatch(ocultarAlertaAction());
        // crear la nueva tarea
        agregarTarea({
            name,
            description
        });
    }
    const fetchDetails = tarea => {
        dispatch(obtenerTareaEditar(tarea));
        setSidebar(!sidebar)
    };

    const redireccionarEdicion = () => {
        setSidebar(!sidebar)
        dispatch(editarTareaAction(tareaEdit));
    }

    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fa fa-home">New Task</i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitNuevaTarea}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title (Required)</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={name}
                                onChange={e => guardarName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                required
                                as="textarea" 
                                rows={3}
                                value={description}
                                onChange={e => guardarDescription(e.target.value)} />
                        </Form.Group>
                        <Button  variant="outline-light" onClick={handleClose}>
                            Cancel
                        </Button>{' '}
                        <Button  variant="outline-info" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="text-center">Cargando....</p> : null}

            <nav className="navbar navbar-light bg-white">
                <a className="navbar-brand">Tasks</a>
                <Button variant="primary" onClick={handleShow}>
                    <BsPlusCircle></BsPlusCircle>Add Task
                </Button>
            </nav>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Created</th>
                        <th scope="col">Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.length === 0 ? 'No hay tareas' : (
                        tareas.map(tarea => (
                            <tr onClick={() => fetchDetails(tarea)} key={tarea.id}>
                                <td>{tarea.completed == false ? <img src={inactive} /> : <img src={active} />}</td>
                                <td>{tarea.name}</td>
                                <td>{moment(tarea.cdate).format("L")}</td>
                                <td>{tarea.description}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <IconContext.Provider value={{ color: '#000' }}>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                    </ul>

                    {
                        !tareaeditar ? '' :
                            <div className="center-bar">
                                <div className="item-bar">
                                    <h1>{tareaeditar.name}</h1>
                                </div>
                                <div className="item-bar">
                                    <Select
                                        defaultValue={tareaeditar.completed}
                                        onChange={onChangeFormulario}
                                        options={options}
                                        
                                    />
                                </div>
                                <div className="item-bar">
                                    <h4><b>Created</b></h4>
                                    {moment(tareaeditar.created_at).format("L")}
                                </div>
                                <div className="item-bar">
                                    <h4><b>Description</b></h4>
                                    {tareaeditar.description}
                                </div>
                                <Button
                                    onClick={() => confirmarEliminarTarea(tareaeditar.id)}
                                    variant="outline-light"><BsFillTrashFill></BsFillTrashFill>Delete
                                </Button>{' '}
                                <Button
                                    onClick={() => redireccionarEdicion()}
                                    variant="outline-light"><BsPencil></BsPencil> Edit </Button>{' '}
                            </div>

                    }
                </nav>
            </IconContext.Provider>
        </Fragment>


    );
}

export default Tareas;