import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from './index'

export default {
  title: 'ModalTemplate',
  component: Modal,
} as ComponentMeta<typeof Modal>

const ModalTemplate: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const Open = ModalTemplate.bind({})

Open.args = {
  open: true,
}
