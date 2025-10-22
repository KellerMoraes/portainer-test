import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';
import { gerarId } from '@/helpers/gerarId';

class Pagina extends ElementoBase {
  static criar(args) {
    // ARGS: NAME, IDDOMAIN, STARTDATE
    const subpaginaInicial = SubPagina.criar({name: "subpagina 1"});
    // const subpaginaInicial2 = SubPagina.criar({name:"subpagina 2"});
    // const subpaginaInicial3 = SubPagina.criar({name:"subpagina 3"});
    return {
      [$cms('content')]: [subpaginaInicial],
      // [$cms('type')]: tipo,
      [$cms('configs')]: {
        [$cms('attrs')]: {},
        [$cms('meta')]: args[$cms('meta')],
        [$cms('image')]: {
          [$cms('show')]: false,
          [$cms('desktop')]: null,
          [$cms('mobile')]: null,
          [$cms('imagePosition')]: null,
        },
      },
    };
  }
  static adicionarSubpagina(pagina, subpagina = null) {
    const novaSub = subpagina || SubPagina.criar();
    pagina[$cms('container')].push(novaSub);
    return novaSub;
  }
}
// class Pagina extends ElementoBase {
//   static criar(args) {
//     // ARGS: NAME, IDDOMAIN, STARTDATE
//     const subpaginaInicial = SubPagina.criar({name: "subpagina 1"});
//     const subpaginaInicial2 = SubPagina.criar({name:"subpagina 2"});
//     const subpaginaInicial3 = SubPagina.criar({name:"subpagina 3"});
//     return {
//       ...this.criarEstrutura({ 
//         [$cms('type')]: 'pagina', 
//         [$cms('name')]: args[$cms('name')],
//       }),
//       [$cms('container')]: [subpaginaInicial, subpaginaInicial2,subpaginaInicial3],
//       [$cms('startDate')]: args[$cms('startDate')],
//       [$cms('configs')]: {
//         [$cms('image')]: {
//           [$cms('show')]: false,
//           [$cms('desktop')]: '',
//           [$cms('mobile')]: '',
//           [$cms('imagePosition')]: '',
//         },
//       },
//     };
//   }
//   static adicionarSubpagina(pagina, subpagina = null) {
//     const novaSub = subpagina || SubPagina.criar();
//     pagina[$cms('container')].push(novaSub);
//     return novaSub;
//   }
// }
class Board {
static criar({ posicao = { x: 1800, y: 1800 }, subpaginas = [], subpaginaAtiva = 0,subpaginaAtivaId = null, depth = 0 } = {}) {
  return {
    [$cms('id')]: `board-${gerarId()}`,
    posicao,
    subpaginas,
    subpaginaAtiva,
    subpaginaAtivaId,
    depth
   };
}

}

class Linha extends ElementoBase {
  static criar(args) {
    // Cria a coluna (sem filhos inicialmente)
    const coluna = Coluna.criar({icon: "mdi-view-column", group: "colunas"});

    // Se um componente for fornecido, adiciona à coluna
    if (args?.component) {
      coluna[$cms('container')].push(args?.component);
    }

    // Cria a estrutura da linha com a coluna
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Linha',
        [$cms('name')]: 'Linha',  // A linha sempre terá ao menos uma coluna
          // A linha sempre terá ao menos uma coluna
        [$cms('attrs')]: {
          [$cms('style')]: { 'background': '#ffffff', 'min-height': 105 },
          [$cms('bgStyle')]: 'Cor sólida',
        },
      }),
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Linha',
      [$cms('structure')]: [12],
      [$cms('container')]: [coluna]
  }
}
}

class Coluna extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
      [$cms('type')]: 'Coluna',
      [$cms('name')]: 'Coluna',
      [$cms('attrs')]: {
        [$cms('style')]: { 'background': '#ffffff' },
        [$cms('bgStyle')]: 'Cor sólida',
      },
    }),
    [$cms('icon')]: args?.icon,
    [$cms('group')]: args?.group,
    compName: 'Coluna',
    [$cms('container')]: []
  }
}
}

class SubPagina extends ElementoBase {
  static criar(args) {
    return { 
      ...this.criarEstrutura({
      [$cms('type')]: 'Subpagina',
      [$cms('name')]: args?.name ?? "Subpágina",
      [$cms('attrs')]: {
        [$cms('visibility')]: { [$cms('name')]: 'display', [$cms('value')]: 'block', [$cms('extension')]: null },
        [$cms('image')]: { [$cms('show')]: false, [$cms('desktop')]: '', [$cms('mobile')]: '', [$cms('imagePosition')]: '' },
      },
    }),
    [$cms('container')]: [],
    compName: 'Subpagina',

  };
  }
}

export const Elementos = {
  Pagina,
  SubPagina,
  Linha,
  Coluna,
  Board
//   Celula,
};