import { describe, expect, it } from "@jest/globals"
import SwiperItem from "../../UI/Swiper/SwiperItem"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

const mockProduct = {
   main_image: "/test-image.jpg",
   slug: "test-product",
   name: "test image",
}

describe("SwiperItem", () => {
   it("renders active item correctly", () => {
      render(<SwiperItem image={mockProduct} activeIndex={0} index={0} />)
      const image = screen.getByAltText("Slide 0 test image")
      const title = screen.getByText("test image")

      expect(image.classList).toContain("active")
      expect(title.classList).toContain("active")
   })

   it("renders not active item correctly", () => {
      render(<SwiperItem image={mockProduct} activeIndex={0} index={1} />)
      const image = screen.getByAltText("Slide 1 test image")
      const title = screen.getByText("test image")

      expect(image.classList).not.toContain("active")
      expect(title.classList).not.toContain("active")
   })

   it("has correct image attributes", () => {
      render(<SwiperItem index={0} image={mockProduct} activeIndex={0} />)
      const image = screen.getByAltText("Slide 0 test image")

      expect(image.getAttribute("src")).toBe(
         mockProduct.main_image + "?imwidth=320"
      )
   })
})
