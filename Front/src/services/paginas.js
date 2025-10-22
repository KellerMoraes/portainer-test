import { $cms } from "@/helpers/cmsProviderHelper"
import api from "@/services/api/api"
const pagina = {
  buscar(id) {
    console.log(id)
    return new Promise((resolve, reject) => {
      api
        .get("pagina/buscar/", { params: {id}})
        .then(response => {
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },
  criar(pagina) {
    // console.log(pagina)
    return new Promise((resolve, reject) => {
      api
        .post("pagina", pagina)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },
  alterar(pagina) {
    console.log(pagina)
    return new Promise((resolve, reject) => {
      api
        .put(`/pagina/${pagina[$cms('id')]}`,pagina)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },
  undoDelete(id) {
    return new Promise((resolve, reject) => {
      api
        .put(`/pagina/undo/${id}`)
        .then(response => {
          console.log(response)
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },
  deletar(id) {
    return new Promise((resolve, reject) => {
      api
        .delete(`/pagina/${id}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },

  listar() {
    return new Promise((resolve, reject) => {
      api
        .get("pagina/listar")
        .then(response => {
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },
  upload(arquivo) {
    return new Promise((resolve, reject) => {
      api
        .post("arquivo/upload", arquivo, {headers: {"Content-Type": "multipart/form-data"}})
        .then(response => {
          resolve(response.data)
        })
        .catch(erro => {
          reject(erro)
        })
    })
  },

}

export default pagina