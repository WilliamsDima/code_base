import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Select from './index'

export default {
  title: 'ModalTemplate',
  component: Select,
} as ComponentMeta<typeof Select>

const SelectTemplate: ComponentStory<typeof Select> = (args) => (
  <Select {...args} />
)

export const Template = SelectTemplate.bind({})

Template.args = {}
