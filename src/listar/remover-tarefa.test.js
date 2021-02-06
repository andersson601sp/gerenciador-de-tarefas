import ReactDOM from 'react-dom';
import RremoverTarefa from './remover-tarefa';
import Tarefa from '../models/tarefa.model';
import {  render, fireEvent, getByTestId } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { exact } from 'prop-types';
import RemoverTarefa from './remover-tarefa';


describe('Teste do componente remoçao de tarefas', () => {

    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(1, nomeTarefa, false);

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <RemoverTarefa
                tarefa = {tarefa}
                recarregarTarefas ={() => false } />, div);
                ReactDOM.unmountComponentAtNode(div);        
    });

    it('Deve exibir a modal', () => {
        const { getByTestId } = render(
            <RemoverTarefa
               tarefa={tarefa}
               recarregarTarefas={() => false} />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
    });

    it('Deve remover uma tarefa', () => {
        localStorage['tarefas'] = JSON.stringify([tarefa]);
        const { getByTestId } = render (
            <RemoverTarefa
                 tarefa={tarefa}
                 recarregarTarefas={() => false} />
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-remover'));
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        expect(tarefasDb.length).toBe(0);
    })

})

