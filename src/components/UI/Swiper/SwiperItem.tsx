import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import styles from "./Swiper.module.css"

export default function CarouselItem({
   image,
   activeIndex,
   index,
}: {
   image: TProduct
   activeIndex: number
   index: number
}) {
   return (
      <li className={styles.swiper_item}>
         <Image
            src={image.main_image + "?imwidth=320"}
            alt={`Slide ${index} ${image.name}`}
            className={clsx(styles.swiper_img, {
               "active opacity-100": index === activeIndex,
            })}
            style={{
               objectFit: "cover",
            }}
            draggable={false}
            unoptimized
            width={254}
            height={311}
         />

         <Link href={`product/${image.slug}`}>
            <p
               className={clsx("text-starttruncate text-titleActive", {
                  "active opacity-100 transition translate-x-0":
                     index === activeIndex,
               })}
            >
               {image.name}
            </p>
         </Link>
      </li>
   )
}
