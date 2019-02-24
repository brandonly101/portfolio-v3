// Node package imports.
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom imports.
import Layout from "../components/layout";
import { Container, Row, Col } from 'reactstrap';
import aboutStyles from '../style/about.module.scss';

export default class About extends React.Component {
    render() {
        return (
            <Layout>
                <div className={aboutStyles.aboutMiniLanding}/>
                <div className={aboutStyles.aboutDescription}>
                    <img src={require("../assets/images/about/me.png")}/>
                    <div className={aboutStyles.paragraph}>
                            Hello! I'm Brandon Ly! I am a game developer and software engineer.
                            I really enjoy the following:
                            <ul>
                                <li>3D Computer Graphics</li>
                                <li>Video Games and Video Game Development</li>
                                <li>VR and AR Gaming and Experiences</li>
                                <li>Data Visualizations</li>
                            </ul>
                            I was born and raised near Los Angeles, and still find joy
                            in exploring the large city through new events. In my spare time I
                            play video games and listen to music.<br/>
                            <br/>
                            If you want to get in touch, feel free to reach out to me! Check out the links
                            at the bottom of the site.
                    </div>
                </div>
            </Layout>
        );
    }
}
