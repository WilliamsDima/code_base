import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import type { RootState, AppDispatch } from '../store/index'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useOutside = (initialVisible: boolean) => {

    const [isShow, setIsShow] = useState(initialVisible)
    const ref = useRef<null | HTMLDivElement>(null)

    const hadlerClickOutside = (event: any) => {


        if (ref.current && !ref?.current?.contains(event.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', hadlerClickOutside, true)

        return () => {
            document.removeEventListener('click', hadlerClickOutside, true)
        }
    })

    return { ref, isShow, setIsShow }

}