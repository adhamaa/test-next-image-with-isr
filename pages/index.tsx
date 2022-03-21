import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { ImageGrid, ImageGridItem } from '../components/ImageGrid'
import {
  getImageFromPlaiceholder,
  getImagesFromPlaiceholders,
  trimUrl,
} from '../utils'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export const getStaticProps = async () => {
  //* for single image
  // const { img, plaiceholder, css } = await getImageFromPlaiceholder(
  //   'plaiceholder-[/sakura.jpeg]'
  // )

  //* for multiple images
  const images = await getImagesFromPlaiceholders(
    'plaiceholder-[/waterfall.jpeg]',
    'plaiceholder-[/sakura.jpeg]',
    'plaiceholder-[/mountain.jpg]',
    'plaiceholder-[/flower.jpg]'
  )

  return {
    props: {
      time: new Date().toISOString(),
      images,
      // img,
      // css,
      // plaiceholder,
    },
    // revalidate: 1,
  }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  time,
  images,
  //   img,
  //   css,
  //   plaiceholder,
}) => {
  const dialogRef = useRef<any>(null)
  const [imgOnLoad, setImgOnLoad] = useState(false)

  const openDialog = () => {
    dialogRef.current.classList.remove('fade-out')
    dialogRef.current.classList.add('fade-in')
    dialogRef.current.showModal()
  }
  const closeDialog = () => {
    dialogRef.current.classList.remove('fade-in')
    dialogRef.current.classList.add('fade-out')
    dialogRef.current.close()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-center">
        <div>
          <h1>{time}</h1>
          <dialog ref={dialogRef} className="backdrop max-w-[32ch] p-12">
            <button
              className="absolute top-0 right-0 rounded-full p-2"
              onClick={closeDialog}
            >
              <AiOutlineCloseCircle size={28} />
            </button>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Delectus, explicabo veritatis? Delectus reiciendis aspernatur
              porro illum aliquid nemo minima laboriosam, vel tempore deleniti
              nobis aut.
            </p>
          </dialog>
          <button
            onClick={openDialog}
            className="rounded-lg bg-slate-300 p-3 text-stone-700"
          >
            Open Modal
          </button>
        </div>
      </header>

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

        {/* <ImageGrid columns={2}>
          <ImageGridItem key={plaiceholder}>
            <div
              className={`absolute inset-0 h-full w-full ${plaiceholder} fade-out scale-150 transform opacity-0 blur-2xl filter`}
              style={css}
            />
            <Image
              {...img}
              className="fade-in opacity-100"
              onLoad={(e) => setImgOnLoad(true)}
            />
          </ImageGridItem>
        </ImageGrid>

        <ImageGrid columns={2}>
          <ImageGridItem key={plaiceholder}>
            <div
              className={`absolute inset-0 h-full w-full ${plaiceholder} fade-out scale-150 transform opacity-0 blur-2xl filter`}
              style={css}
            />
            <img
              {...img}
              className="fade-in opacity-100"
              onLoad={(e) => console.log('loadImg 2', e)}
            />
          </ImageGridItem>
        </ImageGrid> */}

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

        <ImageGrid columns={2}>
          {images.map(({ className, ...image }) => (
            <ImageGridItem key={className}>
              <div
                className={`absolute inset-0 h-full w-full ${className} fade-out scale-150 transform blur-2xl filter`}
              />
              <Image {...image} className="fade-in" />
              {/* <img
                {...image}
                className="fade-in opacity-100"
              /> */}
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
