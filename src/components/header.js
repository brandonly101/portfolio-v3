import { Link } from "gatsby";
import React from "react";
import { Container, Row, Col } from "reactstrap";

import headerStyles from "../style/header.module.scss";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isScrolled: false };
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    scrollHandler(e) {
        if (document.documentElement.scrollTop > 0) {
            this.setState({ isScrolled: true });
        } else {
            this.setState({ isScrolled: false });
        }
    }

    render() {
        var headerClass = [
            headerStyles.header,
            this.state.isScrolled ? headerStyles.headerScrolled : ""
        ].join(' ');

        return (
            <div className={headerStyles.headerContainer}>
                <div className={headerClass}>
                    <Container>
                        <Row>
                            <Col xs={12} md={5} className={headerStyles.logo}>
                                <a href="/">
                                    <div className={headerStyles.title}>
                                        <div className={headerStyles.main}>Brandon Ly</div>
                                        <div className={headerStyles.sub}>Game Developer and Software Engineer</div>
                                    </div>
                                </a>
                            </Col>
                            <Col xs={12} md={7} className={headerStyles.menu}>
                                <div className={headerStyles.elem}>
                                    <Link to="/">Home</Link>
                                </div>
                                <div className={headerStyles.elem}>
                                    <Link to="/blog/">Blog</Link>
                                </div>
                                <div className={headerStyles.elem}>
                                    <Link to="/about/">About</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
