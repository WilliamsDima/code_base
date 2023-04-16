import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Input from './index'

export default {
  title: 'InputTemplate',
  component: Input,
} as ComponentMeta<typeof Input>

const InputTemplate: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
)

export const ShadowClick = InputTemplate.bind({})

ShadowClick.args = {}
