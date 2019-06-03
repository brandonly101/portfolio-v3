// Node package imports.
import React from 'react';

// Custom imports.
import SEO from "../components/seo";
import Layout from "../components/layout";
import aboutStyles from '../style/about.module.scss';

export default class About extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="About" keywords={[`portfolio`, `react`, `graphics`, `games`]} />
                <div className={aboutStyles.aboutMiniLanding}/>
                <div className={aboutStyles.aboutDescription}>
                    <img src={require("../assets/images/about/me.png")} alt=""/>
                    <div className={aboutStyles.paragraph}>
                        Hello! I'm Brandon Ly! I am a software and graphics engineer.
                        I really enjoy the following:
                        <ul>
                            <li>3D Computer Graphics and Rendering</li>
                            <li>Video Games and Game Development</li>
                            <li>VR and AR Gaming and Experiences</li>
                            <li>Data Visualizations and 3D Simulations</li>
                            <li>Web Development</li>
                        </ul>
                        I was born and raised near Los Angeles, and still find joy
                        in exploring the nooks and crannies of this large city. In my spare time I
                        play video games and listen to (read: heavily analyze) music.<br/>
                        <br/>
                        If you want to get in touch, feel free to reach out to me! Check out the links
                        at the bottom of the site.
                    </div>
                </div>
            </Layout>
        );
    }
}
