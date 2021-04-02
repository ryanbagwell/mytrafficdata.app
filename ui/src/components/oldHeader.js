import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const AboutLink = styled(Link)`
  color: white;
  font-size: 15px;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1220px;
  padding: 1.45rem 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding-right: 20px;
  }
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <Wrapper>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
        <br />
      </h1>
      <AboutLink to="/about">About this project</AboutLink>
    </Wrapper>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
