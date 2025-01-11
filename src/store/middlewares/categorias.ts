import { createListenerMiddleware } from '@reduxjs/toolkit'
import { createStandaloneToast } from '@chakra-ui/toast'
import { adicionarTodasAsCategorias, carregarCategorias } from '@/store/reducers/categorias'
import categoriasService from '@/services/categorias'

const { toast } = createStandaloneToast()

export const listener = createListenerMiddleware()

listener.startListening({
    actionCreator: carregarCategorias,
    effect: async (action, { dispatch, fork, unsubscribe }) => {
        toast({
            title: 'Carregando',
            description: 'Carregando categorias',
            status: 'loading',
            duration: 2000,
            isClosable: true,
        })

        const tarefa = fork(async (api) => {
            await api.delay(1000)

            return await categoriasService.buscar()
        })

        const resposta = await tarefa.result

        if (resposta.status === 'ok') {
            toast({
                title: 'Sucesso!',
                description: 'Categorias carregadas com sucesso!',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            dispatch(adicionarTodasAsCategorias(resposta.value))

            unsubscribe()
        }

        if (resposta.status === 'rejected') {
            toast({
                title: 'Erro',
                description: 'Erro na busca de categorias',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    },
})
