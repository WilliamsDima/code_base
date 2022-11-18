import React from "react"
import './styles.scss'
import { useAppSelector } from "../../../hooks/hooks"
import Empty from "../../atoms/Empty"
import Main from "../../organisms/Main"
import { Container } from "@mui/material"

const HomeTemplate = () => {

  const { user } = useAppSelector(store => store.main)
  return (
    <Container maxWidth="lg" sx={{mt: 5}}>
      {user ? <Main /> :  <Empty />}
    </Container>
  )
}

export default HomeTemplate
