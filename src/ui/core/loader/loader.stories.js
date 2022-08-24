import { Loader } from './loader';

export default {
  title: 'UI/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const LoaderWithText = Template.bind({});
LoaderWithText.args = {
  text: 'Loading...',
};
