import { useRef, useState, RefObject } from "react"

export function getRefValue<C>(ref: RefObject<C>) {
   return ref.current as C
}

export function useStateRef<S>(
   defaultValues: S
): [S, (value: S) => void, RefObject<S>] {
   const ref = useRef<S>(defaultValues)
   const [state, _setState] = useState<S>(defaultValues)
   const setState = (value: S) => {
      _setState(value)
      ref.current = value
   }

   return [state, setState, ref]
}
