import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
//GOOGLE_CLIENT_ID=552808854470-6bvekbg5og0j28r3jdr5fm96s3csjg9f.apps.googleusercontent.com
//GOOGLE_CLIENT_SECRET=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

export const options: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
}
