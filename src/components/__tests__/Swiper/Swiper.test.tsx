import { fireEvent, render, screen } from "@testing-library/react"
import Swiper from "../../UI/Swiper/Swiper"
import { setReadOnlyProperty } from "@/utils/test-helpers"

describe("<Swiper/>", () => {
   const mockImages = [
      {
         id: 1,
         main_image: "/test-image-1.jpg",
         slug: "test-product-1",
         name: "test image-1",
      },
      {
         id: 2,
         main_image: "/test-image-2.jpg",
         slug: "test-product-2",
         name: "test image-2",
      },
   ]
   it("render images", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      for (const [index, imageItem] of Object.entries(mockImages)) {
         const image = screen.queryByAltText(`Slide ${index} ${imageItem.name}`)

         expect(image).toHaveAttribute(
            "src",
            imageItem.main_image + "?imwidth=320"
         )
      }
   })

   it("goes to next item", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      const containerWidth = 300
      const containerScrollWidth = containerWidth * mockImages.length

      const listEl = screen.queryAllByRole("list")[0]

      setReadOnlyProperty(listEl, "offsetWidth", containerWidth)
      setReadOnlyProperty(listEl, "scrollWidth", containerScrollWidth)

      const startX = 0
      const endX = -60

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(${-containerWidth}px)`,
      })
   })

   it("check start, end - mouse", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      const containerWidth = 300
      const containerScrollWidth = containerWidth * mockImages.length

      const listEl = screen.queryAllByRole("list")[0]

      setReadOnlyProperty(listEl, "offsetWidth", containerWidth)
      setReadOnlyProperty(listEl, "scrollWidth", containerScrollWidth)

      let startX = 0
      let endX = 50

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      const minOffsetX = containerScrollWidth - containerWidth
      startX = 0
      endX = -(minOffsetX + 1)
      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(${-minOffsetX}px)`,
      })
   })

   it("check start, end - touch", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      const containerWidth = 300
      const containerScrollWidth = containerWidth * mockImages.length

      const listEl = screen.queryAllByRole("list")[0]

      setReadOnlyProperty(listEl, "offsetWidth", containerWidth)
      setReadOnlyProperty(listEl, "scrollWidth", containerScrollWidth)

      let startX = 0
      let endX = 50

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] })
      fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] })
      fireEvent.touchEnd(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      const minOffsetX = containerScrollWidth - containerWidth
      startX = 0
      endX = -(minOffsetX + 1)
      fireEvent.touchStart(listEl, { changedTouches: [{ clientX: startX }] })
      fireEvent.touchMove(listEl, { changedTouches: [{ clientX: endX }] })
      fireEvent.touchEnd(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(${-minOffsetX}px)`,
      })
   })
})
