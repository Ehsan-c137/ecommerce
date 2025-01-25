"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import "./DoubleRangePicker.css"
import { useSearchParams } from "next/navigation"

interface IProps {
   min: number
   max: number
   setMaxPrice: (value: number) => void
   setMinPrice: (value: number) => void
}

function DoubleRangePicker({ min, max, setMaxPrice, setMinPrice }: IProps) {
   const searchParams = useSearchParams()

   const [minVal, setMinVal] = useState(min)
   const [maxVal, setMaxVal] = useState(max)
   const minValRef = useRef(minVal)
   const maxValRef = useRef(maxVal)
   const range = useRef<HTMLInputElement | null>(null)

   const getPercent = useCallback(
      (value: number) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
   )

   useEffect(() => {
      if (searchParams.get("min price")) {
         setMinVal(Number(searchParams.get("min price")))
         minValRef.current = Number(searchParams.get("min price"))
      }

      if (searchParams.get("max price")) {
         setMaxVal(Number(searchParams.get("max price")))
         maxValRef.current = Number(searchParams.get("max price"))
      }
   }, [searchParams])

   useEffect(() => {
      const maxPercent = getPercent(maxVal)
      const minPercent = getPercent(minValRef.current)
      if (range.current) {
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [maxVal, getPercent])

   useEffect(() => {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(maxValRef.current)

      if (range.current) {
         range.current.style.left = `${minPercent}%`
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [minVal, getPercent])

   return (
      <div className="slider">
         <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
               const value = Math.min(Number(event.target.value), maxVal - 1)
               setMinVal(value)
               minValRef.current = value
            }}
            onMouseUp={() => {
               setMinPrice(minVal)
            }}
            onTouchEnd={() => {
               setMinPrice(minVal)
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 ? "5" : "auto" }}
            aria-label="minimum price"
         />
         <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
               const value = Math.max(Number(event.target.value), minVal + 1)
               setMaxVal(value)
               maxValRef.current = value
            }}
            onMouseUp={() => {
               setMaxPrice(maxVal)
            }}
            onTouchEnd={() => {
               setMaxPrice(maxVal)
            }}
            className="thumb thumb--right"
            aria-label="maximum price"
         />
         <div className="slider__track" />
         <div ref={range} className="slider__range" />
         <div className="slider__left-value">{minVal}$</div>
         <div className="slider__right-value">{maxVal}$</div>
      </div>
   )
}

export default DoubleRangePicker
