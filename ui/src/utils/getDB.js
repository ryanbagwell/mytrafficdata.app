import getFirebaseApp from "./getFirebaseApp"

const app = getFirebaseApp()

export default () => app.database()
