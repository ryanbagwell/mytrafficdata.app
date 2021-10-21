import React from "react"
import { Helmet } from "react-helmet"

interface HeadMeta {
  title: string
  description?: string
}

export default ({ title, description }: HeadMeta) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
  </Helmet>
)
