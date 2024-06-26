import styles from './Carousel.module.css'
import { Image, Carousel as AntCarousel } from 'antd'
import carouselImage1 from '../../assets/images/carousel_1.jpg'
import carouselImage2 from '../../assets/images/carousel_2.jpg'
import carouselImage3 from '../../assets/images/carousel_3.jpg'

export const Carousel = () => {
  return (
    <AntCarousel autoplay className={styles.silder}>
      <Image src={carouselImage1}></Image>
      <Image src={carouselImage2}></Image>
      <Image src={carouselImage3}></Image>
    </AntCarousel>
  )
}
