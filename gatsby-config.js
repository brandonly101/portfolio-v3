module.exports = {
    siteMetadata: {
        title: `Brandon Ly`,
        description: `Portfolio`,
        author: `Brandon Ly`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/src/content/blog`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/images/favicons/favicon64x64.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
        `gatsby-plugin-sass`,
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [], // just in case those previously mentioned remark plugins sound cool :)
                "excerpt_separator": `<!-- end -->`
            }
        }
    ],
}
