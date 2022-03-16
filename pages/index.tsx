import * as React from 'react'
import type { NextPage, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { extractImgSrc } from '@plaiceholder/tailwindcss/utils'
import backgroundImage1 from '../public/windows11.jpeg'
import backgroundImage2 from '../public/sakura.jpeg'

const getImagesFromPlaiceholders = (...classNames) =>
  Promise.all(
    classNames.map(async (className) => {
      const { img } = await getPlaiceholder(extractImgSrc(className))

      return { className, ...img }
    })
  )

export const getStaticProps = async () => {
  // const plaiceholder = 'plaiceholder-[/windows11.jpeg]'
  // const plaiceholder = 'plaiceholder-[/sakura.jpeg]'
  // const { img } = await getPlaiceholder(extractImgSrc(plaiceholder))

  const images = await getImagesFromPlaiceholders(
    'plaiceholder-[/assets/unsplash/alexander-ant-oR7HxvOe2YE.jpg]',
    'plaiceholder-[/assets/unsplash/alexander-ant-r7xdS9hjYYE.jpg]',
    'plaiceholder-[/assets/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]',
    'plaiceholder-[/assets/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]',
    'plaiceholder-[/assets/unsplash/solen-feyissa-tek55norwaQ.jpg]',
    'plaiceholder-[/assets/unsplash/solen-feyissa-WX1siNmy_R4.jpg]'
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
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>

        <div className="next-image relative my-8 overflow-hidden">
          <div
            className={`absolute inset-0 h-full w-full ${plaiceholder} scale-150 transform blur-2xl filter`}
          />
          <Image {...img} />
        </div>

        <div className="relative w-full overflow-hidden">
          {/* <div className="plaiceholder-[/windows11.jpeg] -z-10 block h-96 w-full scale-150 transform blur-2xl" /> */}
          {/* <div className="plaiceholder-[/sakura.jpeg] -z-10 block h-96 w-96 scale-150 transform blur-2xl" /> */}
          {/* <Image src={backgroundImage1} /> */}
          {/* <Image src={backgroundImage2} /> */}
          {/* <div
            className={`absolute inset-0 h-full w-full ${plaiceholder} scale-150 transform blur-2xl filter`}
          />
          <Image {...img} /> */}
        </div>
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
