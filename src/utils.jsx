import { redirect } from 'react-router';

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem('loggedIn') || false;
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    const response = redirect(`/login?message=You must login first.&redirectTo=${pathname}`);
    response.body = true;
    throw response;
  }
  return null;
}