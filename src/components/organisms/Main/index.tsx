import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/hooks"
import Filter from "../../molecules/Filter"
import { listAll, ref, getDownloadURL } from 'firebase/storage'
import './styles.scss'
import { useAuth } from "../../../api/firebase"


const Main = () => {

  const { storage, user } = useAuth()
  const { codeBase } = useAppSelector(store => store.main)

  const [testUrl, setTestUrl] = useState('')

  const pathToFile = user?.providerData[0].uid
  // 1668606657776 - это ид папки
  const imageListRef = ref(storage, `images-${pathToFile}/1668606657776/`)

  const getImages = async () => {
    const { items } = await listAll(imageListRef)
    items.forEach(async (item: any) => {
      const url = await getDownloadURL(item)
      console.log('url', url)
      setTestUrl(url)
    })
    console.log('res', items);
    
  }

  useEffect(() => {
    console.log('codeBase', codeBase);
    getImages()
  }, [codeBase])

  return (
    <div className="main">
      <Filter />

      <img src={testUrl}/>
    </div>
  )
}

export default Main
