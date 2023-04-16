import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Loading } from './index'

export default {
  title: 'LoadingTemplate',
  component: Loading,
} as ComponentMeta<typeof Loading>

const LoadingTemplate: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
)

export const active = LoadingTemplate.bind({})

active.args = {
  active: true,
}
