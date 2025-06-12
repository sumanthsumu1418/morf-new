import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from 'next-auth/providers/credentials'



export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
   
    async authorize(credentials, req) {
      
      
       return credentials
      
     
    }

    }),
    GoogleProvider({
      idToken: true,
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization:{
        params:{
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: "302e45a48f05c1f8361z7a360fdfwe3e",
  callbacks: {
    async session({ session, token }) { 

      
      session = { ...session, ...token };
      return session;
    },
   async jwt({ token, user, account, profile, isNewUser }) {    
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account?.access_token;
        token.idToken=account?.id_token
        token.provider=account?.provider
      }
      
      
      

      return token;
    },
    async redirect({ url, baseUrl }) {
      return url      
    }
  },
});
