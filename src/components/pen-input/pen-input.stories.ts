import type { Meta } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import type { PenInput } from './pen-input';

const { events, args, argTypes, template } = getStorybookHelpers<PenInput>('pen-input');

const meta = {
  title: 'Components/Input',
  component: 'my-element',
  args,
  argTypes,
  render: args => template(args),
  parameters: {
    actions: {
      handles: events,
    },
  },
} satisfies Meta<PenInput>;

console.log('argTypes', argTypes);

export default meta;

export const Default = {
  args: {
    label: 'Name',
    value: 'Florian',
  },
};

export const Description = {
  args: {
    ...Default.args,
    description: 'Enter your name',
  },
};
