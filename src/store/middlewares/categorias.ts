import { createListenerMiddleware } from '@reduxjs/toolkit'
import { adicionarTodasAsCategorias, carregarCategorias, carregarUmaCategoria } from '@/store/reducers/categorias'
import categoriasService from '@/services/categorias'
import criarTarefa from './utils/criarTarefa'

export const listener = createListenerMiddleware()

listener.startListening({
    actionCreator: carregarCategorias,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        await criarTarefa({
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

listener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async () => {
        console.log('carregar apenas uma categoria')
    },
})
