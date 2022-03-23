// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import { EffectCoverflow, EffectFade, Navigation, Pagination } from 'swiper'
import Data from '../data.json'
console.log('Data:', Data)
import { getImagesFromPlaiceholders } from '../utils'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useOnLoadImages } from '../hooks/useOnLoadImages'

interface IState {
  status: boolean
  naturalWidth: number
  naturalHeight: number
}

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
  const [imgLoaded, setImgLoaded] = useState<IState>({
    status: false,
    naturalWidth: 0,
    naturalHeight: 0,
  })
  console.log('imgLoaded:', imgLoaded)

  return (
    <>
      <Swiper
        className="h-[500px] bg-blue-200 text-9xl font-light"
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
            className={`relative grid place-items-center text-white ${className} scale-150 transform blur-2xl filter`}
            virtualIndex={i}
          >
            <Image
              className={`absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]`}
              src={image.src}
              width={image.width}
              height={image.height}
              onLoadingComplete={(e) => setImgLoaded({ status: true, ...e })}
            />
            <h4 className="absolute text-6xl tracking-widest">
              {Data[i].name}
            </h4>
          </SwiperSlide>
        ))}
      </Swiper>
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
