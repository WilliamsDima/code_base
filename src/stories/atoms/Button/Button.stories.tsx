import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './index'

export default {
  title: 'ButtonTemplate',
  component: Button,
} as ComponentMeta<typeof Button>

const ButtonTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
)

export const ShadowClick = ButtonTemplate.bind({})

ShadowClick.args = {
  shadowClick: true,
  children: 'ShadowClick',
}

export const PulseAnim = ButtonTemplate.bind({})

PulseAnim.args = {
  pulseAnim: true,
  shadowClick: false,
  children: 'PulseAnim',
}

export const StyleRed = ButtonTemplate.bind({})

StyleRed.args = {
  pulseAnim: true,
  shadowClick: false,
  children: 'StyleRed',
  style: {
    color: 'red',
  },
}
