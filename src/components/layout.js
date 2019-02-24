import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCopyright, faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import Header from "./header";
import Footer from "./footer";

// Font Awesome import library adds
library.add(faAngleUp);
library.add(faAngleDown);
library.add(faCopyright);
library.add(faEnvelope);
library.add(faLinkedin);
library.add(faGithub);

const Layout = ({ children }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
            <>
                <Header siteTitle={data.site.siteMetadata.title} />
                <main>{children}</main>
                <Footer/>
            </>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
