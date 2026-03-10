import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Usuario administrador (en producción, esto debería estar en una base de datos)
const ADMIN_USER = {
  id: "1",
  email: "admin@velourstudio.com",
  name: "Valentina Ríos",
  // Password hasheado: "velour2024"
  // Generado con: bcrypt.hashSync("velour2024", 10)
  password: "$2a$10$rQYHV.xJXJH8qPwMnqzJSeO/9.FmHEH9qZ9YZVmq7xK1N4nYfhQ4m",
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Verificar email
        if (credentials.email !== ADMIN_USER.email) {
          return null;
        }

        // Verificar password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          ADMIN_USER.password,
        );

        if (!isValidPassword) {
          return null;
        }

        // Retornar usuario sin el password
        return {
          id: ADMIN_USER.id,
          email: ADMIN_USER.email,
          name: ADMIN_USER.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutos
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "velour-studio-secret-key-dev",
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
});

export { handler as GET, handler as POST };
