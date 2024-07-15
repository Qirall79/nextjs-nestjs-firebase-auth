
# Next.js, Nest.js, Firebase auth starter

This is a starter project for those who want to build a fullstack app with Next.js on the front-end and Nest.js on the back-end. It helps you get started with an already built session based authentication using Firebase Auth service.


## Features

- Session based authentication
- Sign In / Sign Up
- Email/Password auth
- Social auth (Google/Facebook)


## Installation

Install the necessary packages with npm

```bash
  cd client; npm i
  cd ../server; npm i
```

## Environment Variables

To run this project, you will need to create a `.env` file on both the `client` and `server` directories with the following variables:

#### Client


- `NEXT_PUBLIC_FIREBASE_API_KEY`: firebase api key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: firebase auth domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: firebase project id
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: firebase storage bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: firebase sender id
- `NEXT_PUBLIC_FIREBASE_APP_ID`: firebase app id
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: firebase measurement id

(You get these from Firebase once you create a project)

- `NEXT_PUBLIC_API_URL`: your api url (will be `http://localhost:3001` by default if you're running the api locally)

#### Server

- `FIREBASE_PRIVATE_KEY`: your firebase Private Key
- `FIREBASE_PROJECT_ID`: firebase project id (same as above)
- `FIREBASE_CLIENT_EMAIL`: your firebase client email
- `DB_URL`: your `postgres` database url (you can change your db type if you don't want to use `postgres` in the `server/src/app.module.ts` file)

Database synchronization is set to `true` for development, make sure to set it to `false` in production (`server/src/app.module.ts`)

## Run Locally
Start the server

```bash
  cd server/
  npm run start:dev
```

Start client
```bash
  cd ../client/
  npm run dev
```

## Usage

Getting the user session:

#### Client components
```javascript
function App() {
  const session = useSession();
  return <Component />
}
```

#### Server components
```javascript
async function App() {
  const session = await getServerSession();
  return <Component />
}
```