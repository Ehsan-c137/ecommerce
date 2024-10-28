"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import "./DoubleRangePicker.css"
import useHandleQueryParams from "@/utils/useHandleQueryParams"
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
   const minValRef = useRef(min)
   const maxValRef = useRef(max)
   const range = useRef(null)

   // Convert to percentage
   const getPercent = useCallback(
      (value) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
   )

   // Set width of the range to decrease from the left side
   useEffect(() => {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(maxValRef.current)

      if (range.current) {
         range.current.style.left = `${minPercent}%`
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [minVal, getPercent])

   // Set width of the range to decrease from the right side
   useEffect(() => {
      const minPercent = getPercent(minValRef.current)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
         range.current.style.width = `${maxPercent - minPercent}%`
      }
   }, [maxVal, getPercent])

   useEffect(() => {
      const delayChange = setTimeout(() => {
         setMaxPrice(maxVal)
      }, 500)

      return () => {
         clearTimeout(delayChange)
      }
   }, [maxVal, setMaxPrice])

   useEffect(() => {
      const delayChange = setTimeout(() => {
         setMinPrice(minVal)
      }, 500)

      return () => clearTimeout(delayChange)
   }, [setMinPrice, minVal])

   return (
      <div className="container w-full">
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
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 && "5" }}
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
            className="thumb thumb--right"
         />

         <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">{minVal}$</div>
            <div className="slider__right-value">{maxVal}$</div>
         </div>
      </div>
   )
}

export default DoubleRangePicker
