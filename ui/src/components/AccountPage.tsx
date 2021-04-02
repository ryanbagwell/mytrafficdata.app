import React, { useState } from "react"
import Header from "./Header"

export default ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
