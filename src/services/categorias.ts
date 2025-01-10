import { Categoria } from '@/types/Categoria'
import instance from '@/common/config/api'

const categoriasService = {
    buscar: async () => {
        const resposta = await instance.get<Categoria[]>('/categorias')

        return resposta.data
    },
}

export default categoriasService
