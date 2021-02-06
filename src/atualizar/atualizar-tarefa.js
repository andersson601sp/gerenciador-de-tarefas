import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter'; 

function AtualizarTarefa(props){

    const [tarefa, setTarefa] = useState('');
    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect(() => {
        if(carregarTarefa) {
            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : []; 
            const tarefa = tarefas.filter(
                t => t.id === parseInt(props.id)
            )[0];

            setTarefa(tarefa.nome);    
            setCarregarTarefa(false);   
        }

    },[carregarTarefa, props]);

    function voltar(event){
        event.preventDefault();
        navigate('/');
    }

    function handleFecharModal(){
        navigate('/');
    }

    function atualizar(event){
        event.preventDefault();
        setFormValidado(true);
        setExibirModal(true);
        if (event.currentTarget.checkValidity() === true) {
            //obtem as tarefas 
            const tarefasDb = localStorage['tarefas'];
            let tarefas = tarefasDb ? JSON.parse(tarefasDb) : []; 
  
            //persiste a tarefa
            tarefas = tarefas.map(tarefaObj => {
              if(tarefaObj.id === parseInt(props.id)){
                  tarefaObj.nome = tarefa;
              }   
              return tarefaObj;
            });
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event){
        setTarefa(event.target.value);
    }

    return (
        <div>
            <h3 className="text-center">Atualizar</h3>
            <Jumbotron>
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Digite a tarefa"
                           minLength="5"
                           maxLength="100"
                           required
                           data-testid="txt-tarefa" 
                           onChange={handleTxtTarefa}
                           value={tarefa} />
                        <Form.Control.Feedback type="invalid"> 
                             A tarefa deve conter ao menos 3 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                    <Button
                        variant="success"
                        type="submit"
                        data-testid="btn-atualizar">Atualizar
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light" onClick={voltar}>Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal}  data-testid="modal" >
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  data-testid="modal-body" >
                        Tarefa Atualizada com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        variant="success"
                        onClick={handleFecharModal}
                        >
                           Continuar
                        </Button>
                    </Modal.Footer>
                </Modal> 
            </Jumbotron>
        </div>
    )
}

AtualizarTarefa.propTypes = {
    id: PropTypes.number.isRequired
}

export default AtualizarTarefa;