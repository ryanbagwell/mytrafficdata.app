import type {FirebaseApp} from '@firebase/app-types';

// type ModuleType = typeof import('firebase/dist/index.esm.js');

let instance: any = null;

export default async () => {
  if (instance || typeof window === 'undefined') return instance;
  //const fb = await import('firebase/dist/index.esm.js')
  const fb = await import('firebase')
  await import("firebase/firestore");
  await import("firebase/database");
  await import("firebase/auth");
  instance = fb.default
   try {
    instance.app()
  } catch {
    instance.initializeApp({
      apiKey: `${process.env.GATSBY_FIREBASE_API_KEY}`,
      databaseURL: `${process.env.GATSBY_FIREBASE_DATABASE_URL}`,
      authDomain: `${process.env.GATSBY_FIREBASE_AUTH_DOMAIN}`,
      projectId: `${process.env.GATSBY_FIREBASE_PROJECT_ID}`,
    })
  }
  return instance
}
