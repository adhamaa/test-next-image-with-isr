import { extractImgSrc } from '@plaiceholder/tailwindcss/utils'
import { getPlaiceholder } from 'plaiceholder'

export const getImagesFromPlaiceholders = (...classNames: string[]) =>
  Promise.all(
    classNames.map(async (className) => {
      const { img } = await getPlaiceholder(extractImgSrc(className))

      return { className, ...img }
    })
  )
