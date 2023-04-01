import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Tag from './index'

export default {
  title: 'TagTemplate',
  component: Tag,
} as ComponentMeta<typeof Tag>

const TagTemplate: ComponentStory<typeof Tag> = (args) => <Tag {...args} />

export const Show = TagTemplate.bind({})

Show.args = {
  children: 'Tag',
}
