// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import { EffectCoverflow, EffectFade, Navigation, Pagination } from 'swiper'
import Data from '../data.json'
import { getImagesFromPlaiceholders } from '../utils'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useOnLoadImages } from '../hooks/useOnLoadImages'
import { ImageGrid, ImageGridItem } from '../components/ImageGrid'

// interface IState {
//   status: boolean
//   naturalWidth: number
//   naturalHeight: number
// }

export const getStaticProps = async () => {
  const arr = Data.map(({ image }) => image)
  const images = await getImagesFromPlaiceholders(...arr)

  return {
    props: {
      images,
    },
    // revalidate: 1,
  }
}

const Slider: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  //   const [imgLoaded, setImgLoaded] = useState<IState>({
  //     status: false,
  //     naturalWidth: 0,
  //     naturalHeight: 0,
  //   })

  return (
    <>
      <Swiper
        className="sswiper h-screen bg-blue-200 text-9xl font-light"
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        navigation={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, EffectFade, Navigation]}
      >
        {images.map(({ className, ...image }, i) => (
          <SwiperSlide
            key={className}
            className={`relative grid place-items-center text-white`}
            virtualIndex={i}
          >
            <div
              className={`absolute inset-0 h-full w-full ${className} scale-150 transform blur-2xl filter`}
            />
            <Image
              {...image}
              className="fade-in h-full w-full object-cover object-[top_40%]"
            />
            {/* <Image
              className={`absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]`}
              src={image.src}
              width={image.width}
              height={image.height}
              onLoadingComplete={(e) => setImgLoaded({ status: true, ...e })}
            /> */}
            <h4 className="absolute tracking-widest">{Data[i].name}</h4>
          </SwiperSlide>
        ))}
      </Swiper>

      <ImageGrid columns={2}>
        {images.map(({ className, ...image }) => (
          <ImageGridItem key={className}>
            <div
              className={`absolute inset-0 h-full w-full ${className} scale-150 transform blur-2xl filter`}
            />
            <Image {...image} className="fade-in" />
          </ImageGridItem>
        ))}
      </ImageGrid>

      <style jsx global>{`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          background-color: transparent !important;
          border: none !important;
          color: white !important;
          font-size: 2rem !important;
          font-weight: bold !important;
          padding: 0.5rem !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.3s ease-in-out !important;
        }
      `}</style>
    </>
  )
}

export default Slider
{
  /* <img
              className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]"
              src={slideContent.image}
            /> */
}
{
  /* <Image
              className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]"
              src={slideContent.image}
              width={2000}
              height={700}
            /> */
}
{
  /* <h1 className="text-center text-2xl font-bold">
              {slideContent.id}
            </h1>
            <h1 className="text-center text-2xl font-bold">
              {slideContent.name}
            </h1> */
}
