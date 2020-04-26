/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import "./layout.css"
import styled from 'styled-components';

const Main = styled.main`
  padding: 25px;
`





const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle="Speed Reports" />
      <div>
        <Main>{children}</Main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
