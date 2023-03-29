import { useEffect, useRef, useState } from "react"

export const useOutside = (initialVisible: boolean) => {
	const [isShow, setIsShow] = useState(initialVisible)
	const ref = useRef<null | HTMLDivElement>(null)

	const hadlerClickOutside = (event: any) => {
		if (ref.current && !ref?.current?.contains(event.target)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener("click", hadlerClickOutside, true)

		return () => {
			document.removeEventListener("click", hadlerClickOutside, true)
		}
	})

	return { ref, isShow, setIsShow }
}
