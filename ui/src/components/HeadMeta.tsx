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
    <link rel="canonical" href="http://mysite.com/example" />
  </Helmet>
)
