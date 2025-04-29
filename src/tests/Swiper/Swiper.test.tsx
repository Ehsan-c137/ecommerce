import { fireEvent, render, screen } from "@testing-library/react"
import Swiper from "../../components/UI/Swiper/Swiper"
import { setReadOnlyProperty } from "@/lib/test/test-helpers"

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

   it("check swipe", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      const containerWidth = 300
      const containerScrollWidth = containerWidth * mockImages.length

      const listEl = screen.queryAllByRole("list")[0]

      setReadOnlyProperty(listEl, "offsetWidth", containerWidth)
      setReadOnlyProperty(listEl, "scrollWidth", containerScrollWidth)

      const startX = 0
      let endX = -60

      expect(listEl).toHaveStyle({
         transform: `translateX(0px)`,
      })

      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)

      expect(listEl).toHaveStyle({
         transform: `translateX(${-containerWidth}px)`,
      })

      endX = 60
      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)
      expect(listEl).toHaveStyle({
         transform: `translateX(${startX}px)`,
      })

      endX = 30
      fireEvent.mouseDown(listEl, { clientX: startX })
      fireEvent.mouseMove(listEl, { clientX: endX })
      fireEvent.mouseUp(listEl)
      expect(listEl).toHaveStyle({
         transform: `translateX(${startX}px)`,
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

   it("check active indicator", () => {
      render(<Swiper images={mockImages} isLoading={false} />)
      const containerWidth = 300
      const containerScrollWidth = containerWidth * mockImages.length

      const listEl = screen.queryAllByRole("list")[0]

      setReadOnlyProperty(listEl, "offsetWidth", containerWidth)
      setReadOnlyProperty(listEl, "scrollWidth", containerScrollWidth)

      expect(listEl).toHaveStyle({ transform: `translateX(0px)` })

      const firtsIndicator = screen.queryAllByTestId("indicator")[0]
      expect(firtsIndicator).toHaveClass("swiper_indicator_active")

      const secondIndicator = screen.queryAllByTestId("indicator")[1]
      expect(secondIndicator).not.toHaveClass("swiper_indicator_active")

      fireEvent.click(secondIndicator)
      expect(listEl).toHaveStyle({
         transform: `translateX(${-containerWidth}px)`,
      })
   })
})
