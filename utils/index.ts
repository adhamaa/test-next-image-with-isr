import { extractImgSrc } from '@plaiceholder/tailwindcss/utils'
import { getPlaiceholder } from 'plaiceholder'

const regex = /^https?:\/\/[^\/]+\//

export const trimUrl = (url: string) => url.replace(regex, '')

export const getImageFromPlaiceholder = async (image: string) => {
  const newPlaiceholder = trimUrl(image)
  const plaiceholder = image.includes('plaiceholder-[')
    ? extractImgSrc(image)
    : newPlaiceholder
  const { img, css } = await getPlaiceholder(plaiceholder)

  return { img, plaiceholder, css }
}

export const getImagesFromPlaiceholders = (...classNames: string[]) =>
  Promise.all(
    classNames.map(async (className) => {
      const newPlaiceholder = trimUrl(className)
      const plaiceholder = className.includes('plaiceholder-[')
        ? extractImgSrc(className)
        : newPlaiceholder
      const { img } = await getPlaiceholder(plaiceholder)

      return { className, ...img }
    })
  )
