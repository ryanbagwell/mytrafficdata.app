export default path => {
  return fetch(
    `${process.env.GATSBY_FIREBASE_DATABASE_URL}/${path}.json?shallow=true`
  ).then(resp => resp.json())
}
