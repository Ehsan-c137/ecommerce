export interface FilterProps {
   searchParams: URLSearchParams
   onSelect: (name: string, value: string) => void
}

export interface Product {
   id: string
   price: number
   category: string
   options?: {
      colors: string[]
      sizes: string[]
   }
}

export interface PriceFilterProps {
   minPrice: number
   maxPrice: number
   isLoading: boolean
   handleSetMinPrice: (min: number) => void
   handleSetMaxPrice: (max: number) => void
}

export interface FilterSectionProps extends FilterProps {
   title: string
   isLoading: boolean
   items: Array<{ name: string }>
   paramName: string
}
