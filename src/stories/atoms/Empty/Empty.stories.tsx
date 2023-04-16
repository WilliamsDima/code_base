import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Empty from './index'

export default {
  title: 'EmptyTemplate',
  component: Empty,
} as ComponentMeta<typeof Empty>

const EmptyTemplate: ComponentStory<typeof Empty> = (args) => (
  <Empty {...args} />
)

export const Shadow = EmptyTemplate.bind({})

Shadow.args = {}
