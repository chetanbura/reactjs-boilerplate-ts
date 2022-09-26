import { render, screen } from '@testing-library/react';

import { Loader } from './loader';

describe('Loader', () => {
  it('should render successfully', async () => {
    render(<Loader text="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
