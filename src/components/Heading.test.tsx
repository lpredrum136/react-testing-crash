import { render } from '@testing-library/react';
import Heading from './Heading';

describe('<Heading />', () => {
  test('should render hello world from props', () => {
    const { getByText } = render(<Heading name='world' />);
    const linkElement = getByText(/hello world/i);
    expect(linkElement).toBeInTheDocument();
  });
});
