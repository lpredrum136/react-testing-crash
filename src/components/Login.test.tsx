import Login, { LoginProps } from './Login';
import { fireEvent, render } from '@testing-library/react';

const renderLogin = (props: Partial<LoginProps> = {}) => {
  const defaultProps: LoginProps = {
    onPasswordChange: () => {
      return;
    },
    onUsernameChange: () => {
      return;
    },
    onRememberChange: () => {
      return;
    },
    onSubmit: () => {
      return;
    },
    shouldRemember: true,
  };

  return render(<Login {...defaultProps} {...props} />);
};
const testUsername = 'test username';

const testPassword = 'test password';

describe('<Login />', () => {
  test('should display a blank login form with remember me checked by default', async () => {
    const { findByTestId } = renderLogin();
    const loginForm = await findByTestId('login-form');

    expect(loginForm).toHaveFormValues({
      username: '',
      password: '',
      remember: true,
    });
  });

  test('should allow entering a username', async () => {
    const onUsernameChange = jest.fn();
    const { findByTestId } = renderLogin({ onUsernameChange });
    const username = await findByTestId('username');

    fireEvent.change(username, { target: { value: testUsername } });

    expect(onUsernameChange).toHaveBeenCalledWith(testUsername);
  });

  test('should allow entering a password', async () => {
    const onPasswordChange = jest.fn();
    const { findByTestId } = renderLogin({ onPasswordChange });
    const password = await findByTestId('password');

    fireEvent.change(password, { target: { value: testPassword } });
    expect(onPasswordChange).toHaveBeenCalledWith(testPassword);
  });

  test('should allow toggling remember me', async () => {
    const onRememberChange = jest.fn();
    const { findByTestId } = renderLogin({ onRememberChange });
    const remember = await findByTestId('remember');

    fireEvent.click(remember);
    expect(onRememberChange).toHaveBeenCalledWith(false);

    fireEvent.click(remember);
    expect(onRememberChange).toHaveBeenCalledWith(true);
  });

  test('should submit the form with username, password and remember', async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = renderLogin({ onSubmit, shouldRemember: false });

    const username = await findByTestId('username');
    const password = await findByTestId('password');
    const remember = await findByTestId('remember');
    const submit = await findByTestId('submit');

    fireEvent.change(username, { target: { value: testUsername } });
    fireEvent.change(password, { target: { value: testPassword } });
    fireEvent.click(remember);
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith(testUsername, testPassword, true);
  });
});
