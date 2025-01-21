import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation
} from 'react-router';
import { loginUser } from '../api';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = new URL(request.url).searchParams.get('redirectTo') || '/host';
  try {
    await loginUser({ email, password });
    localStorage.setItem('loggedIn', true);
    const response = redirect(redirectTo);
    response.body = true;
    throw response;
  } catch (err) {
    return err;
  }
}

export default function Login() {
  const message = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <div className='login-container'>
      <h1>Sign in to your account</h1>
      {message && <h2 className='red'>{message}</h2>}
      {error && <h2 className='red'>{error.message}</h2>}
      <Form
        className='login-form'
        method='post'
        replace
      >
        <input
          name='email'
          type="email"
          placeholder='Email address'
        />
        <input
          name='password'
          type="password"
          placeholder='Password'
        />
        <button disabled={navigation.state == 'submitting'}>
          {navigation.state == 'submitting' ? 'Logging in...' : 'Log in'}
        </button>
      </Form>
    </div>
  );
}