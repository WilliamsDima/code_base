import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkbox from './index'

export default {
  title: 'CheckboxTemplate',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const CheckboxTemplate: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
)

export const Test = CheckboxTemplate.bind({})

Test.args = {}
