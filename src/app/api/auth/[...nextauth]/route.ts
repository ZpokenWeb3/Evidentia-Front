import NextAuth from 'next-auth/next';
import { options } from './options';
import { AuthOptions } from 'next-auth';

const handler = NextAuth(options) as AuthOptions;

export { handler as GET, handler as POST };
