import './button.css';

/**
 * Primary UI component for user interaction
 */
export interface IButtonProps {
  primary?: boolean;
  backgroundColor?: any;
  size?: string;
  label: string;
}

export const Button = ({ primary, backgroundColor, size, label, ...props }: IButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};
