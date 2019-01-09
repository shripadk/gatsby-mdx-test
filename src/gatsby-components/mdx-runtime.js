import React, { Component } from 'react'
import { graphql } from 'gatsby'

import MDXRenderer from 'gatsby-mdx/mdx-renderer'

export default class MDXRuntimeTest extends Component {
  render() {
    const { data, ...props } = this.props

    return (
      <MDXRenderer {...props}>{data.mdx.code.body}</MDXRenderer>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
    }
  }
`
