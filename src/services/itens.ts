import { Produto } from '@/types/Produto'
import instance from '@/common/config/api'

const itensService = {
    buscar: async () => {
        const resposta = await instance.get<Produto[]>('/itens')

        return resposta.data
    },
}

export default itensService
