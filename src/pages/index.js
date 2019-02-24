import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Work from '../components/work';
import Projects from '../components/projects';

// Custom imports.
import homeStyles from '../style/home.module.scss';
import '../style/skills.scss';

// Custom imports.

class Home extends React.Component {
    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <>
                <div id="Landing" className={homeStyles.landing}>
                    <div className={homeStyles.content}>
                        <div className={homeStyles.image}>
                            <img src={require("../assets/images/selfportraitcircle.png")}/>
                        </div>
                        <div className={homeStyles.paragraph}>
                            Welcome to my page! I am a software engineer who loves all things game development,
                            computer graphics and data visualizations!
                        </div>
                        <div className={homeStyles.links}>
                            <ul>
                                {/* <li key={0}><Scroll.Link href="" to="work" smooth={true} duration={350} offset={-100}>Work</Scroll.Link></li>, */}
                                <li key={0}>Work</li>
                                {/* <li key={1}><Scroll.Link href="" to="work-skills" smooth={true} duration={350} offset={-100}>Skills</Scroll.Link></li>, */}
                                <li key={1}>Skills</li>
                                <li key={2}><Link to="/projects">Projects</Link></li>
                                <li key={3}><a href="https://www.dropbox.com/s/gr6tw5nf7dvrwg1/LyBrandonResume.pdf?dl=0" target="_blank">Resume</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Work/>
                <Projects/>
            </>
        );
    }
}

const IndexPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Home />
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
);

export default IndexPage;
