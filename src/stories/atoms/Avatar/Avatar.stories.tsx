import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Avatar from './index'

export default {
  title: 'AvatarTemplate',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const AvatarTemplate: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
)

export const Src = AvatarTemplate.bind({})

Src.args = {
  src: 'https://sun1-83.userapi.com/impg/CafINlJbiaLtmHJDRavJelOHaKZxU49bT_cr8w/_d6frYBe4xs.jpg?size=2160x2160&quality=96&sign=dc7cddfca73e700359776a92eeba92d8&type=album',
  name: 'Dmitry Williams',
}

export const Name = AvatarTemplate.bind({})

Name.args = {
  src: '',
  name: 'Dmitry Williams',
}
