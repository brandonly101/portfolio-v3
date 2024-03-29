// Node package imports.
import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

// Custom imports.
import SEO from "../components/seo";
import Layout from "../components/layout";
import blogStyles from '../style/blog.module.scss';

export default class Blog extends React.Component {
    render() {
        const posts = this.props.data.allMarkdownRemark.edges;

        let postExcerpts = [];
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i].node;

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
                    <div className={blogStyles.blogDivider}/>
                </div>
            );

            postExcerpts.push(postExcerpt);
        }

        return (
            <Layout>
                <SEO title="Blog" keywords={[`portfolio`, `react`, `graphics`, `games`]} />
                <div className={blogStyles.blogMiniLanding}/>
                {postExcerpts}
                <div className={blogStyles.blogSpacer}/>
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
