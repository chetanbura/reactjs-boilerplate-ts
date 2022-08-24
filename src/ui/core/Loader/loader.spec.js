import { render, screen } from '@testing-library/react';

import { Loader } from './loader';

describe('Loader', () => {
  it('should render successfully', async () => {
    // Placeholder test designed to fail, so you look at me :)
    render(<Loader />);
    expect(screen.getByText('Does Not Exist')).toBeVisible();
  });
});
