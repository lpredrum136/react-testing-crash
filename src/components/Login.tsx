import { useState, ChangeEvent, FormEvent } from 'react';

export interface LoginProps {
  shouldRemember: boolean;
  onUsernameChange: (username: string) => void;
  onPasswordChange: (password: string) => void;
  onRememberChange: (remember: boolean) => void;
  onSubmit: (username: string, password: string, remember: boolean) => void;
}

const Login = ({
  shouldRemember,
  onUsernameChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
}: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(shouldRemember);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    onUsernameChange(value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    onPasswordChange(value);
  };

  const handleRememberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setRemember(checked);
    onRememberChange(checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password, remember);
  };

  return (
    <form data-testid='login-form' onSubmit={handleSubmit}>
      <label htmlFor='username'>Username:</label>

      <input
        data-testid='username'
        type='text'
        name='username'
        value={username}
        onChange={handleUsernameChange}
      />

      <label htmlFor='password'>Password:</label>

      <input
        data-testid='password'
        type='password'
        name='password'
        value={password}
        onChange={handlePasswordChange}
      />

      <label>
        <input
          data-testid='remember'
          name='remember'
          type='checkbox'
          checked={remember}
          onChange={handleRememberChange}
        />
        Remember me?
      </label>

      <button type='submit' data-testid='submit'>
        Sign in
      </button>
    </form>
  );
};

export default Login;
