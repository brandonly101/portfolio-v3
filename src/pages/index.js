import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "reactstrap";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const Text = () => (
    <div>
        <h1>God Bless Hot Reloading (now if only I had two monitors...)</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
        </div>
    </div>
);

const IndexPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Container>
            <Row>
                <Col><Text/></Col>
                <Col><Text/></Col>
                <Col><Text/></Col>
            </Row>
        </Container>
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
);

export default IndexPage;
