import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

interface criarTarefaProps {
    fork: unknown
    dispatch: unknown
    action: unknown
    busca: unknown
    textoCarregando: string
    textoSucesso: string
    textoErro: string
}

const criarTarefa = async ({
    fork,
    dispatch,
    action,
    busca,
    textoCarregando,
    textoSucesso,
    textoErro,
}: criarTarefaProps) => {
    toast({
        title: 'Carregando',
        description: textoCarregando,
        status: 'loading',
        duration: 2000,
        isClosable: true,
    })

    const tarefa = fork(async (api) => {
        await api.delay(1000)

        return await busca()
    })

    const resposta = await tarefa.result

    if (resposta.status === 'ok') {
        toast({
            title: 'Sucesso!',
            description: textoSucesso,
            status: 'success',
            duration: 2000,
            isClosable: true,
        })

        dispatch(action(resposta.value))
    }

    if (resposta.status === 'rejected') {
        toast({
            title: 'Erro',
            description: textoErro,
            status: 'error',
            duration: 2000,
            isClosable: true,
        })
    }
}

export default criarTarefa
