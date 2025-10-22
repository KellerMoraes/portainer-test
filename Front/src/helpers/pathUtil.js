import { $cms } from '@/helpers/cmsProviderHelper';

// Ajuste no findItemByPath
export function findItemByPath(data, path) {
  // console.log(data[$cms('container')])
  
  // Se não for array, mas for objeto com filhos (root único), iniciamos com seus filhos
  let current = Array.isArray(data) ? data : data[$cms('container')];
  console.log(path)
  
  for (let i = 0; i < path.length; i++) {
    const step = path[i];
    // console.log(current)
    
    if (!Array.isArray(current)) {
      throw new Error(`Esperado array, mas recebeu ${typeof current} em passo ${i}`);
    }
    // console.log(step)
    const item = current.find(el => el[$cms('id')] === step[$cms('id')]);
    if (!item) {
      throw new Error(`Item com ID ${step[$cms('id')]} não encontrado`);
    }
    
    const nextStep = path[i + 1];
    if (nextStep) {
      current = item[$cms('container')];
    } else {
      current = item;
    }
  }
  
  return current;
}
