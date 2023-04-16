import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ButtonClearInput from './index'

export default {
  title: 'ButtonTemplate',
  component: ButtonClearInput,
} as ComponentMeta<typeof ButtonClearInput>

const ButtonTemplate: ComponentStory<typeof ButtonClearInput> = (args) => (
  <ButtonClearInput {...args} />
)

export const Test = ButtonTemplate.bind({})

Test.args = {}
