import { $cms } from '@/helpers/cmsProviderHelper';
export class PaginaRequest {
    constructor(nome, caminho, conteudo, inicial, final, publicado, tipo, configuracao){
        this[$cms('name')] = nome
        this[$cms('path')] = caminho
        this[$cms('content')] = conteudo
        this[$cms('startsAt')] = inicial
        this[$cms('endsAt')] = final
        this[$cms('published')] = publicado
        this[$cms('configs')] = configuracao
        this[$cms('type')] = tipo
    }
}