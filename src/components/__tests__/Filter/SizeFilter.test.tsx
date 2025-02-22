import { expect, it } from "@jest/globals"
import { render, screen } from "@testing-library/react"
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
})
