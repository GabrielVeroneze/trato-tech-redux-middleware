import { ActionCreatorWithPayload, ForkedTask, ForkedTaskExecutor } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'
import { Categoria } from '@/types/Categoria'

export interface Tarefa {
    fork: <T>(executor: ForkedTaskExecutor<T>) => ForkedTask<T>
    dispatch: AppDispatch
    action: ActionCreatorWithPayload<
        unknown,
        'categorias/adicionarTodasAsCategorias'
    >
    busca: () => Promise<Categoria[]>
    textoCarregando: string
    textoSucesso: string
    textoErro: string
}
