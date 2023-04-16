import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ButtonSort from './index'

export default {
  title: 'ButtonTemplate',
  component: ButtonSort,
} as ComponentMeta<typeof ButtonSort>

const ButtonTemplate: ComponentStory<typeof ButtonSort> = (args) => (
  <ButtonSort {...args} />
)

export const Test = ButtonTemplate.bind({})

Test.args = {}
