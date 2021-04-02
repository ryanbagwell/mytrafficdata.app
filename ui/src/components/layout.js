/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./oldHeader"
import styled from "styled-components"
import GlobalStyle from "../style/global"

const Main = styled.main`
  padding: 25px;
`

const GHBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header siteTitle="Speed Reports" />
      <div>
        <Main>{children}</Main>
      </div>
      <GHBadge>
        <a href="https://github.com/ryanbagwell/lidar-speed-camera">
          <img
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_left_white_ffffff.png?resize=149%2C149"
            alt="Fork me on GitHub"
            data-recalc-dims="1"
          />
        </a>
      </GHBadge>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
