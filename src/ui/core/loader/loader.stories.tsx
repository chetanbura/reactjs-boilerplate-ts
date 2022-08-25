import { Meta, Story } from '@storybook/react';

import { ILoaderProps, Loader } from './loader';

export default {
  title: 'UI/Loader',
  component: Loader,
} as Meta;

const Template: Story<ILoaderProps> = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const LoaderWithText = Template.bind({});
LoaderWithText.args = {
  text: 'Loading...',
};
