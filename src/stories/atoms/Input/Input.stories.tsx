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

export const Value = InputTemplate.bind({})

Value.args = {
  value: 'Value input',
  block: true,
}

export const Error = InputTemplate.bind({})

Error.args = {
  value: 'Error input',
  block: true,
  error: {
    message: 'Some error',
  },
}
