import { createListenerMiddleware } from '@reduxjs/toolkit'
import { adicionarTodasAsCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from '@/store/reducers/categorias'
import { RootState, AppDispatch } from '@/store'
import { Categoria } from '@/types/Categoria'
import categoriasService from '@/services/categorias'
import criarTarefa from './utils/criarTarefa'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
>()

startAppListening({
    actionCreator: carregarCategorias,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        await criarTarefa<Categoria[]>({
            fork,
            dispatch,
            action: adicionarTodasAsCategorias,
            busca: categoriasService.buscar,
            textoCarregando: 'Carregando categorias',
            textoSucesso: 'Categorias carregadas com sucesso!',
            textoErro: 'Erro na busca de categorias',
        })

        unsubscribe()
    },
})

startAppListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { dispatch, fork }) => {
        const nomeCategoria = action.payload

        await criarTarefa<Categoria>({
            fork,
            dispatch,
            action: adicionarUmaCategoria,
            busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
            textoCarregando: `Carregando categoria ${nomeCategoria}`,
            textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso!`,
            textoErro: `Erro na busca da categoria ${nomeCategoria}`,
        })
    },
})
