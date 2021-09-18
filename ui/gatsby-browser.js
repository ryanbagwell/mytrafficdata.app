const { GlobalStoreProvider } = require("./src/stores/global")
const React = require("react")
const CssBaseline = require("@material-ui/core/CssBaseline")

exports.wrapPageElement = ({ element, props }) => {
  return (
    <GlobalStoreProvider>
      <CssBaseline.default>{element}</CssBaseline.default>
    </GlobalStoreProvider>
  )
}
