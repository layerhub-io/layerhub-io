import { fabric } from "fabric"

export function loadFabricImageFromURL(src: string) {
  return new Promise((resolve) => {
    fabric.Image.fromURL(src, function (img) {
      resolve(img)
    })
  })
}

export function hasCorsDisabled(src: string) {
  return new Promise((resolve, reject) => {
    try {
      let http1 = new XMLHttpRequest()
      http1.open("HEAD", src)
      http1.onreadystatechange = function () {
        if (this.status === 200) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
      http1.send()
    } catch (err) {
      reject(false)
    }
  })
}

export function loadImageFromURL(src: string): Promise<HTMLImageElement> {
  return new Promise(async (resolve) => {
    const isCorsDisabled = await hasCorsDisabled(src)
    const image = new Image()
    image.src = src
    console.log("he")
    // console.log(isCorsDisabled)
    // if (isCorsDisabled) {
    //   image.crossOrigin = "Anonymous"
    // }
    image.onload = () => {
      console.log("loaded")
      resolve(image)
    }
  })
}
