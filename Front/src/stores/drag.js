import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDragStore = defineStore('drag', () => {
  const dragState = ref({
    offset: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },

    direction: null,
    lastX: 0,

    elementData: {
      startX: 0,
      startY: 0,
      objWidth: 0,
      objHeight: 0,
      centerStartX: 0,
      centerStartY: 0,
      parentTop: 0,
      parentBottom: 0,
      parentLeft: 0,
      parentRight: 0,
      offsetX: 0,
      offsetY: 0
    },

    shouldDetach: false,
    swap: {oldIndex: null, newIndex: null, boardId: null, subpageId: null},

    draggingWholeBoard: false,
    currentBoard: null,
    originalBoardPosition: { x: 0, y: 0 }
  });
  const swapAnimation = ref({
    active: false,
    boardId: null,
    fromIndex: null,
    toIndex: null,
  })

  return { dragState , swapAnimation };
});
