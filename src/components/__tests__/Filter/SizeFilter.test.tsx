import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { SizeFilter } from "@/components/Filter"

const sizes = ["xl", "m", "s"]

const handlQueryParam = jest.fn()

describe("render size filters", () => {
   it("show loading state", () => {
      render(
         <SizeFilter
            sizes={sizes}
            isLoading={true}
            searchParams={new URLSearchParams()}
            onSelect={handlQueryParam}
         />
      )

      const loadingEl = screen.queryByLabelText("size filter loading")
      expect(loadingEl).toBeDefined()
   })
   it("shows sizes", () => {
      render(
         <SizeFilter
            sizes={sizes}
            isLoading={false}
            searchParams={new URLSearchParams()}
            onSelect={handlQueryParam}
         />
      )

      sizes.map((c) => {
         const size = screen.queryByLabelText(c)
         expect(size).toBeDefined()
      })
   })

   it("check if size selected", () => {
      const mockSelect = jest.fn()

      render(
         <SizeFilter
            sizes={sizes}
            isLoading={false}
            searchParams={new URLSearchParams()}
            onSelect={mockSelect}
         />
      )

      sizes.map((size) => {
         const sizeEl = screen.getByText(size.toUpperCase())
         const labelEl = sizeEl.closest("label")
         expect(labelEl).toHaveStyle({
            borderColor: "#e6e7e8",
         })
      })
      sizes.map((size) => {
         const sizeEl = screen.getByText(size.toUpperCase())
         fireEvent.click(sizeEl)
         expect(mockSelect).toHaveBeenCalledWith("size", size)
      })
   })
})
