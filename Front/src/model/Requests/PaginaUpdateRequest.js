import { $cms } from '@/helpers/cmsProviderHelper';
export class PaginaUpdateRequest {
    constructor(id, nome, caminho, conteudo, inicial, final, publicado, tipo, configuracao,alteracao,exclusao){
        this[$cms('id')] = id
        this[$cms('name')] = nome
        this[$cms('path')] = caminho
        this[$cms('content')] = conteudo
        this[$cms('startsAt')] = inicial
        this[$cms('endsAt')] = final
        this[$cms('alteredAt')] = alteracao
        this[$cms('excludedAt')] = exclusao
        this[$cms('published')] = publicado
        this[$cms('configs')] = configuracao
        this[$cms('type')] = tipo
    }
}