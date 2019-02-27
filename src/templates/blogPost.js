// Node package imports.
import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

// Custom imports.
import Layout from "../components/layout";
// import BlogPostArticle from "../components/article.js";
import blogStyles from '../style/blog.module.scss';

export default class BlogPost extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        return (
            <Layout>
                <Helmet title={post.frontmatter.title}/>
                <div className={blogStyles.blogMiniLanding}/>
                <div className={blogStyles.blogDescription}>
                    <div className={blogStyles.title}>
                        {post.frontmatter.title}
                    </div>
                    <div className={blogStyles.date}>{post.frontmatter.date}</div>
                    <div className={blogStyles.content} dangerouslySetInnerHTML={{ __html: post.html }}/>
                </div>
            </Layout>
        );
    }
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`
