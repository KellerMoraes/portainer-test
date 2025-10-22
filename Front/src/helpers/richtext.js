import { Mark, mergeAttributes, Extension, Node } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'
import { ListItem } from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
export const FontWeight = Mark.create({
  name: 'fontWeight',

  addAttributes() {
    return {
      weight: {
        default: 400,
        parseHTML: element => element.style.fontWeight || (element.tagName === 'STRONG' ? 700 : null),
        renderHTML: attributes => {
          if (!attributes.weight) return {}
          if (attributes.weight === 700) {
            return {}
          }
          return { style: `font-weight: ${attributes.weight}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'strong' },
      { style: 'font-weight' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    if (HTMLAttributes.weight === 700) {
      return ['strong', mergeAttributes(HTMLAttributes), 0]
    }
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontWeight:
        (weight) =>
        ({ commands }) => {
          return commands.setMark(this.name, { weight })
        },
        unsetFontWeight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
        toggleFontWeight:
        (weight) =>
        ({ editor,commands }) => {
          const currentWeight = editor.getAttributes('fontWeight').weight
          if(currentWeight == weight){
            return commands.setMark(this.name, { weight: 400 })
          }
          return commands.setMark(this.name, { weight })
        },
    }
  },
})
export const ListItemExtended = ListItem.extend({
  name: 'listItemExtended',

  addAttributes() {
    return {
      ...this.parent?.(),
      color: {
        default: null,
        parseHTML: element => element.style.color || null,
        renderHTML: attrs => {
          if (!attrs.color) return {}
          return { style: `color: ${attrs.color}` }
        },
      },
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize || null,
        renderHTML: attrs => {
          if (!attrs.fontSize) return {}
          return { style: `font-size: ${attrs.fontSize}` }
        },
      },
      fontWeight: {
        default: null,
        parseHTML: element => element.style.fontWeight || null,
        renderHTML: attrs => {
          if (!attrs.fontWeight) return {}
          return { style: `font-weight: ${attrs.fontWeight}` }
        },
      },
      fontStyle: {
        default: null,
        parseHTML: element => element.style.fontStyle || null,
        renderHTML: attrs => {
          if (!attrs.fontStyle) return {}
          return { style: `font-style: ${attrs.fontStyle}` }
        },
      },
    }
  },
})
export const TextTransform = Mark.create({
  name: 'textTransform',

  addAttributes() {
    return {
      type: { 
        default: null, 
        parseHTML: element => element.style.textTransform || null,
        renderHTML: attributes => {
          if (!attributes.type) return {}
          return { style: `text-transform: ${attributes.type}` }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        style: 'text-transform',
        getAttrs: value => value
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setTransform:
        type =>
        ({ commands }) =>
          commands.setMark(this.name, { type }),

      unsetTransform:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),

      toggleTransform:
        type =>
        ({ state, commands }) => {
          const { from, to, empty } = state.selection
          let isActive = false

          if (!empty) {
            state.doc.nodesBetween(from, to, node => {
              if (node.marks) {
                node.marks.forEach(mark => {
                  if (mark.type.name === this.name && mark.attrs.type === type) {
                    isActive = true
                  }
                })
              }
            })
          }

          if (isActive) {
            return commands.unsetMark(this.name)
          }

          return commands.setMark(this.name, { type })
        },
    }
  },
})

export const SmartSelectAll = Extension.create({
  name: 'smartSelectAll',

  addCommands() {
    return {
      smartSelectAll:
        () =>
        ({ state, dispatch }) => {
          const { doc } = state

          // Se não há filhos, nada a fazer
          if (doc.childCount === 0) {
            return false
          }

          // Ignora trailing paragraph vazio (ProseMirror-trailingBreak)
          let lastIndex = doc.childCount - 1
          const lastNode = doc.child(lastIndex)
          if (lastNode && lastNode.type.name === 'paragraph' && lastNode.content.size === 0) {
            lastIndex -= 1
          }

          if (lastIndex < 0) {
            // só havia o parágrafo trailing — não seleciona nada
            return false
          }

          // Percorre os nós até lastIndex para achar o primeiro e o último textblock
          let from = null
          let to = null
          let pos = 0 // posição corrente (posição do início do próximo nó é pos)
          for (let i = 0; i <= lastIndex; i++) {
            const node = doc.child(i)
            const nodeStartPos = pos + 1           // primeira posição "dentro" do nó
            const nodeEndPos = pos + node.nodeSize - 1 // última posição "dentro" do nó

            if (node.isTextblock) {
              if (from === null) from = nodeStartPos
              to = nodeEndPos
            }

            pos += node.nodeSize
          }

          // se não encontrou textblocks válidos, aborta
          if (from == null || to == null || from > to) {
            return false
          }

          if (dispatch) {
            const sel = TextSelection.create(doc, from, to)
            dispatch(state.tr.setSelection(sel))
          }

          return true
        },
    }
  },
})
export function applyMarksToListItems(editor) {

  const { state, view } = editor
  const { tr, selection } = state
  const { from, to } = selection

  state.doc.nodesBetween(from, to, (node, pos) => {
    // checa se é um LI
    if (node.type.name === 'listItemExtended' && node.content.childCount === 1) {
      const firstChild = node.content.firstChild
      if (firstChild.type.name === 'paragraph') {
        // pega os marks do parágrafo
        const marks = firstChild.marks

        // cria attrs para o LI baseado nos marks
        const attrs = { ...node.attrs }
        marks.forEach(mark => {
          if (mark.type.name === 'textStyle') {
            if (mark.attrs.color) attrs.color = mark.attrs.color
            if (mark.attrs.fontSize) attrs.fontSize = mark.attrs.fontSize
            if (mark.attrs.fontWeight) attrs.fontWeight = mark.attrs.fontWeight
            if (mark.attrs.fontStyle) attrs.fontStyle = mark.attrs.fontStyle
          }
        })

        // atualiza o LI com os attrs (o bullet agora herda o estilo)
        tr.setNodeMarkup(pos, undefined, attrs)
      }
    }
  })

  view.dispatch(tr)
}
export const BulletListWithMarks = BulletList.extend({
  addCommands() {
    return {
      toggleBulletListWithMarks:
        () =>
        ({ commands, editor }) => {
          commands.toggleBulletList()
          applyParagraphMarksToLi(editor)
          return true
        },
    }
  },
})