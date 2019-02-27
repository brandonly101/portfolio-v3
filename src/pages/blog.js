// Node package imports.
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

// Custom imports.
import Layout from "../components/layout";
// import BlogPostArticle from "../components/article.js";
import blogStyles from '../style/blog.module.scss';

export default class Blog extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges;

        let postExcerpts = [];
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i].node;

            const divider = (i + 1 !== posts.length) ? <div className={blogStyles.blogDivider}/> : null;

            const postExcerpt = (
                <div key={i} className={blogStyles.blogDescription}>
                    <Link to={post.frontmatter.path}>
                        <div className={blogStyles.title}>
                                {post.frontmatter.title}
                        </div>
                        <div className={blogStyles.date}>{post.frontmatter.date}</div>
                        <div
                            className={blogStyles.content}
                            dangerouslySetInnerHTML={{ __html: '<p>' + post.excerpt + '</p>' }}
                        />
                    </Link>
                    {divider}
                </div>
            );

            postExcerpts.push(postExcerpt);
        }

        return (
            <Layout>
                <Helmet title="Blog" />
                <div className={blogStyles.blogMiniLanding}/>
                {postExcerpts}
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        path
                        title
                    }
                }
            }
        }
    }
`
