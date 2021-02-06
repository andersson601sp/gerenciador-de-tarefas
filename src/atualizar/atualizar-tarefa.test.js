import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import {  render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe('Teste docomponente de atualizar tarefa', () => {

    const tarefaId = 1;
    const tarefa = new Tarefa(tarefaId, 'Nova Tarefa', false);

    beforeEach(() => {
        localStorage['tarefas'] = JSON.stringify([tarefa]);
    });


    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefa id={tarefaId}/>, div);
        ReactDOM.unmountComponentAtNode(div);

    });

    it('Deve exibir a Modal de sucesso ao alterar uma tarefa', () => {
        const { getByTestId } =  render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(getByTestId('btn-atualizar'));
        expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    });

    it('deve atualizar uma tarefa', () => {
        const nomeTarefaAtualizada = 'Tarefa Atualizada';
        const { getByTestId } = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.change(getByTestId('txt-tarefa'), {target: { value : nomeTarefaAtualizada }});
        fireEvent.click(getByTestId('btn-atualizar'));
        const tarefasDb = JSON.parse(localStorage['tarefas']);
        expect(tarefasDb[0].nome).toBe(nomeTarefaAtualizada);
    })
})