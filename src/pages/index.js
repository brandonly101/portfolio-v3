import React from "react";
import * as Scroll from "react-scroll";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import LandingThree from "../components/landingThree";
import Work from '../components/work';
import Projects from '../components/projects';

// Custom imports.
import homeStyles from '../style/home.module.scss';
import '../style/skills.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: props.height };
    }

    componentDidMount(){
        this.setState({ height: window.innerHeight });
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        let landingCircleImage = this.state.height < 600 ? null : <img src={require("../assets/images/selfportraitcircle.png")} alt=""/>;

        return (
            <>
                <div id="LandingBuffer" className={homeStyles.landingBuffer}>
                    <LandingThree/>
                    <div id="Landing" className={homeStyles.landing}>
                        <div className={homeStyles.content}>
                            <div className={homeStyles.image}>
                                {landingCircleImage}
                            </div>
                            <div className={homeStyles.paragraph}>
                                Welcome! I am a software engineer who loves all things software development, game development and
                                computer graphics!
                            </div>
                            <div className={homeStyles.links}>
                                <ul>
                                    <li key={0}><Scroll.Link href="" to="projects" rel="noopener noreferrer" smooth={true} duration={350} offset={-100}>Projects</Scroll.Link></li>
                                    <li key={1} className={homeStyles.liSpacer}/>
                                    <li key={2}><Scroll.Link href="" to="work" rel="noopener noreferrer" smooth={true} duration={350} offset={-100}>Work Experience</Scroll.Link></li>
                                    <li key={3} className={homeStyles.liSpacer}/>
                                    <li key={4}><Link to="/blog" rel="noopener noreferrer">Blog</Link></li>
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
    <Layout>
        <SEO title="Home" keywords={[`portfolio`, `react`, `graphics`, `games`]} />
        <Home/>
    </Layout>
);

export default IndexPage;
