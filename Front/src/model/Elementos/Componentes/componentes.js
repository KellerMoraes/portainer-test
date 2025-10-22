import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';
export class Titulo extends ElementoBase {
  static criar(args) {
    let content = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [
              { type: "text", text: "Título padrão ",marks: [{type: "textStyle",attrs: { color: "#003d7c" }}] }
            ]
          }
        ]
      }

    return {
      ...this.criarEstrutura({
        [$cms("type")]: "Componente",
        [$cms("name")]: "Titulo",
        [$cms("attrs")]: {},
      }),
      [$cms("content")]: content,
      [$cms("icon")]: args?.icon,
      [$cms("configs")]: ["Texto"],
      [$cms("group")]: args?.group,
      compName: "Titulo",
    }
  }
}

class Paragrafo extends ElementoBase {
  static criar(args) {
    let content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: 'text', text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsam, nihil excepturi quisquam optio minima maiores, natus magni voluptates rem officia perferendis quis! Quia quos veniam nihil! Molestias, quisquam explicabo?',
               marks: [{type: "textStyle",attrs: { color: "#003d7c", fontSize: "18px", fontFamily: 'Roboto', }}] 
            }],
        }
      ]
    }
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Parágrafo',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: content,// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms("configs")]: ["Texto"],
      [$cms('group')]: args?.group,
      compName: 'Paragrafo',
    };
  }
}
class Card extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Card',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: {titulo:'Título padrão',subtitulo: 'Subtítulo padrão',texto: 'Texto padrão'},// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Card',
    };
  }
}
class Container extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Container',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: 'Título padrão',// aqui no nível do item, fora dos attrs
      [$cms('container')]: [],// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Container',
    };
}
}
class Formulario extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Formulario',
        [$cms('name')]: 'Formulário',
        [$cms('attrs')]: {
        },
      }),
      [$cms('icon')]: args?.icon,
      [$cms('container')]: [],
      [$cms('group')]: args?.group,
      compName: 'Formulario',
    };
}
}

export const Elementos = {
 Titulo,
 Paragrafo,
 Card,
 Container,
 Formulario
};