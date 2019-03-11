import { Link } from "gatsby";
import React from "react";

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
        const scrollTop = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        if (scrollTop > 0) {
            this.setState({ isScrolled: true });
        } else {
            this.setState({ isScrolled: false });
        }
    }

    render() {
        var headerClass = [
            headerStyles.headerContainer,
            this.state.isScrolled ? headerStyles.headerScrolled : ""
        ].join(' ');

        return (
            <div className={headerClass}>
                <div className={headerStyles.header}>
                    {/* <Container>
                        <Row>
                            <Col xs={5} sm={5} className={headerStyles.logo}> */}
                            <div className={headerStyles.logo}>
                                <a href="/">
                                    <div className={headerStyles.title}>
                                        <div className={headerStyles.main}>Brandon Ly</div>
                                        <div className={headerStyles.sub}>Game Developer and Software Engineer</div>
                                    </div>
                                </a>
                            </div>
                            {/* </Col>
                            <Col xs={7} sm={7} className={headerStyles.menu}> */}
                            <div className={headerStyles.menu}>
                                <div className={headerStyles.elem}>
                                    <Link to="/">Home</Link>
                                </div>
                                <div className={headerStyles.elem}>
                                    <Link to="/blog/">Blog</Link>
                                </div>
                                <div className={headerStyles.elem}>
                                    <Link to="/about/">About</Link>
                                </div>
                            </div>
                            {/* </Col>
                        </Row>
                    </Container> */}
                </div>
            </div>
        );
    }
}
