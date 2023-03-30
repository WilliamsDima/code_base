/* eslint-disable react-hooks/exhaustive-deps */
import { CardContent, Typography, Chip } from '@mui/material'
import './styles.scss'
import { FC } from 'react'
import { IItemCode } from '../../../appTypes/types'
import Code from '../Code'
import CaruselImg from '../CaruselImg'

type ContentType = {
  item: IItemCode
  images: null | any[]
  handleImage: (value: string) => void
}

const CardItemContent: FC<ContentType> = ({ item, images, handleImage }) => {
  return (
    <CardContent>
      <Typography gutterBottom variant="h4" component="p">
        {item.title}
      </Typography>

      <div className="tags">
        {item.tags.map((tag) => {
          return (
            <Chip
              sx={{ mr: 1, mb: 1, fontSize: 14 }}
              key={tag.id}
              label={tag.value}
              variant="outlined"
            />
          )
        })}
      </div>

      <Typography
        gutterBottom
        variant="h4"
        component="p"
        sx={{ whiteSpace: 'pre-line' }}
      >
        {`${item.description}`}
      </Typography>

      {!!item.code && (
        <Code
          code={item.code}
          copy={item.copy}
          id={item.id}
          language={item.language}
        />
      )}

      {!!images?.length && (
        <div className="carusel_wrapper">
          <CaruselImg images={images} handleImage={handleImage} />
        </div>
      )}
    </CardContent>
  )
}

export default CardItemContent
