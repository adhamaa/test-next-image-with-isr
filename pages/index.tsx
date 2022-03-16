import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ImageGrid, ImageGridItem } from '../components/image-grid'
import { getImagesFromPlaiceholders } from '../utils'

export const getStaticProps = async () => {
  // for single image
  // const { img } = await getPlaiceholder(extractImgSrc('plaiceholder-[/sakura.jpeg]'))

  // for multiple images
  const images = await getImagesFromPlaiceholders(
    'plaiceholder-[/windows11.jpeg]',
    'plaiceholder-[/sakura.jpeg]'
  )

  return {
    props: {
      images,
      // img,
      // plaiceholder,
    },
  }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
  // img,
  // plaiceholder,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js! + Plaiceholder
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          render blur images before the original image is loaded
        </p>

        {/* <div className="next-image relative my-8 overflow-hidden">
          <div
            className={`absolute inset-0 h-full w-full ${plaiceholder} scale-150 transform blur-2xl filter`}
          />
          <Image {...img} />
        </div> */}

        {/* {images.map(({ className, ...image }) => (
          <div
            key={className}
            className="next-image relative my-8 overflow-hidden"
          >
            <div
              className={`absolute inset-0 h-full w-full ${className} scale-150 transform blur-2xl filter`}
            />
            <Image {...image} />
          </div>
        ))} */}

        <ImageGrid>
          {images.map(({ className, ...image }) => (
            <ImageGridItem key={className}>
              <div
                className={`absolute inset-0 h-full w-full ${className} scale-150 transform blur-2xl filter`}
              />
              <Image {...image} />
            </ImageGridItem>
          ))}
        </ImageGrid>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
