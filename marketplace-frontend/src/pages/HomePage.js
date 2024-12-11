import React from "react";
import NavBar from "../components/NavBar";
import ControlledCarousel from "../components/ControlledCarousel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';


function HomePage() {
    return (
        <div>
            <NavBar />
            <div  className="HeroSection">
            <Container>
            <Row>
                <Col >
                    <ControlledCarousel className="carousel" />
                </Col>
                {/* <Col >
                    <Row className="h-cards">
                        <Col><HeroCard bg={hCard} classname="hc1" title="Title" text="this is the content" xs={6} md={4}/></Col>
                        <Col><HeroCard xs={6} md={4}/></Col>
                    </Row>
                </Col> */}
                {/* xs={12} md={8} */}
            </Row>
            </Container> 
            </div>
            <div >
                <Container className="Section2">
                    <Row md={4}>
                        <Col xs={6} className="col1">
                            <CloudUploadIcon className="uploadIcon" style={{fontSize: "50px"}} />
                            <h5 className="section2Head">Easy Listing</h5>
                            <p>Post your items for sale in just minutes.</p>
                        </Col>
                        <Col xs={6} className="col1">
                            <AnalyticsIcon className="uploadIcon" style={{fontSize: "50px"}} />
                            <h5 className="section2Head">Grow Your Sales</h5>
                            <p>Reach a wide audience and boost your earnings.</p>
                        </Col>
                        <Col className="col1">
                            <MarkUnreadChatAltIcon className="uploadIcon" style={{fontSize: "50px"}} />
                            <h5 className="section2Head">Engage Buyers</h5>
                            <p>Communicate directly with buyers for better transactions.</p>
                        </Col>
                        <Col className="col1">
                            <SafetyCheckIcon className="uploadIcon" style={{fontSize: "50px"}} />
                            <h5 className="section2Head">Trusted Platform</h5>
                            <p>Sell securely with our dedicated seller protections.</p>
                        </Col>
                    </Row>
                </Container>
            </div> 
        </div>
    )
};

export default HomePage;