import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { buildSettings } from '../buildSettings.js'

let getAllParts = async () => {
  let allPartsStorage = localStorage.getItem('allParts')
  if(allPartsStorage){
    let parts = JSON.parse(allPartsStorage)
    return parts
  } else {
    let routeUrl = ""
    if(buildSettings.isProduction){
      routeUrl = "https://3derox.com:3000/allParts"
    } else {
      routeUrl = "http://localhost:3000/allParts"
    }
    let parts = await fetch(routeUrl)
    console.log(parts.response.status)
    return await parts.json();
  }
}

let gotParts = await getAllParts()

export const usePartStore = defineStore('parts', () => {
  const allParts = gotParts
  let currentPart = ''
  const partInStorage = localStorage.getItem('parts')
  if(partInStorage) {
    let parsedPart = JSON.parse(partInStorage)
    currentPart = parsedPart
  }

  watch(() => allParts, (state) => {
    localStorage.setItem('allParts', JSON.stringify(state))
  }, {deep: true})

  function setPart(part){
    this.currentPart = part
    localStorage.setItem('parts', JSON.stringify(part))
  }

  return {
    allParts,
    currentPart,
    setPart,
  }
})
