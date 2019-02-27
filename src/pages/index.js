import React from "react";
import * as Scroll from "react-scroll";

import Layout from "../components/layout";
import SEO from "../components/seo";
import LandingThree from "../components/landingThree";
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
                <div id="LandingBuffer" className={homeStyles.landingBuffer}>
                    <LandingThree/>
                    <div id="Landing" className={homeStyles.landing}>
                        <div className={homeStyles.content}>
                            <div className={homeStyles.image}>
                                <img src={require("../assets/images/selfportraitcircle.png")} alt=""/>
                            </div>
                            <div className={homeStyles.paragraph}>
                                Welcome to my page! I am a software engineer who loves all things game development,
                                computer graphics and data visualizations!
                            </div>
                            <div className={homeStyles.links}>
                                <ul>
                                    <li key={1}><Scroll.Link href="" to="projects" rel="noopener noreferrer" smooth={true} duration={350} offset={-100}>Projects</Scroll.Link></li>
                                    <li key={0}><Scroll.Link href="" to="work" rel="noopener noreferrer" smooth={true} duration={350} offset={-100}>Work Experience</Scroll.Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={homeStyles.bodyContent}>
                    <Projects/>
                    <Work/>
                </div>
            </>
        );
    }
}

const IndexPage = () => (
    <>
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <Home/>
        </Layout>
    </>
);

export default IndexPage;
