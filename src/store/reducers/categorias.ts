import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createStandaloneToast } from '@chakra-ui/toast'
import { resetarCarrinho } from '@/store/reducers/carrinho'
import { Categoria } from '@/types/Categoria'
import categoriasService from '@/services/categorias'

const { toast } = createStandaloneToast()

const initialState: Categoria[] = []

export const carregarCategorias = createAction('categorias/carregarCategorias')
export const carregarUmaCategoria = createAction('categorias/carregarUmaCategoria')

export const buscarCategorias = createAsyncThunk(
    'categorias/buscar',
    categoriasService.buscar
)

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        adicionarTodasAsCategorias: (state, { payload }) => {
            return payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetarCarrinho.type, () => {
                toast({
                    title: 'Sucesso!',
                    description: 'Compra completada com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
    },
})

export const { adicionarTodasAsCategorias } = categoriasSlice.actions

export default categoriasSlice.reducer
