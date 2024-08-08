/* eslint-disable import/no-unused-modules */

import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({ graphql, reporter, actions }) => {
  const { createPage } = actions

  const result = await graphql<Queries.AllDebunkContentQuery>(`
    query AllDebunkContent {
      allContentYaml {
        nodes {
          fields {
            slug
            index
          }
        }
      }
    }
  `)

  if (result.errors || !result.data?.allContentYaml) {
    reporter.panicOnBuild(result.errors)
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query')
    return
  }

  for (const node of result.data.allContentYaml.nodes ?? []) {
    // skip 00 template
    if (!+node.fields.index) continue

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/layouts/debunk.tsx`),
      context: {
        index: node.fields.index,
      },
    })
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  if (node.internal.type === `ContentYaml`) {
    const slug = createFilePath({ node, getNode, basePath: 'content' })

    actions.createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    actions.createNodeField({
      name: 'index',
      node,
      value: slug.replace(/\D/g, ''),
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  actions.createTypes(`
    type ContentYaml implements Node {
      title: String!
      tag: String!
      subtitle: String!
      fields: ContentYamlFields!
      arguments: [ContentYamlArguments!]!
    }

    type ContentYamlArguments {
      summary: String!
      more: [ContentYamlArgumentsMore!]!
      sources: [ContentYamlArgumentsSources!]!
    }

    type ContentYamlArgumentsMore {
      p: String
    }

    type ContentYamlArgumentsSources {
      text: String!
      link: String!
    }

    type ContentYamlFields {
      slug: String!
      index: String!
    }
  `)
}
