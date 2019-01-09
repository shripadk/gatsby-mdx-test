// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMdx {
            edges {
              node {
                id
                tableOfContents
                parent {
                  ... on File {
                    absolutePath
                    name
                    sourceInstanceName
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        result.data.allMdx.edges.forEach(({ node }) => {
          const actualPath = node.parent.absolutePath
            .replace('.mdx', '')
            .replace(`${__dirname}/src/pages`, '');

          const options = {
            component: path.resolve('./src/gatsby-components/mdx-runtime.js'),
            context: {
              absPath: node.parent.absolutePath,
              tableOfContents: node.tableOfContents,
              id: node.id,
            },
          };

          createPage({
            path: actualPath,
            ...options,
          });
        });
      }),
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
