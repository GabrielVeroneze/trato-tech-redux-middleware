import { createListenerMiddleware } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '@/store'
import { carregarUmaCategoria } from '@/store/reducers/categorias'

export const itensListener = createListenerMiddleware()

export const startAppListening = itensListener.startListening.withTypes<
    RootState,
    AppDispatch
>()

startAppListening({
    actionCreator: carregarUmaCategoria,
    effect: async () => {
        console.log("carregando itens")
    },
})
