import React from "react"
import { useAppSelector } from "../../hooks/hooks"

const Home = () => {

  const { template } = useAppSelector(state => state.main)

  return (
    <div className="flex flex-row justify-center items-center">
        <p>{template}</p>
    </div>
  )
}

export default Home
