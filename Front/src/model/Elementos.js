import * as Estruturais from '@/model/Elementos/Estrutura/ElementosEstruturais';
import * as Componentes from '@/model/Elementos/Componentes/componentes';

export const Elementos = {
  ...Estruturais.Elementos,
  ...Componentes.Elementos,
};

export function criarElemento(tipo, args) {
  const classe = Elementos[tipo];
  if (!classe || typeof classe.criar !== 'function') {
    throw new Error(`Tipo de elemento "${tipo}" não é válido.`);
  }
  
  return classe.criar(args); 
}