import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FeedCard from "../feedItems/FeedCard";
import testImageFeed from '../../assets/testImageFeed.svg'
import { Link } from "react-router-dom";
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';

function HomeScreen() {
    // Get data from api and store in state
    const feedData = [
        {
            title: 'Tarock Personality Test',
            image: testImageFeed
        },
    ]
    return (
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FFFFFF' }}>
            <Header/>
            
            <Container className="flex-grow-1 overflow-auto">
                {feedData.map((item, index) => {
                    return (
                        <Row key={index} className='pb-4'>
                            {/* add color:'black' to style prop if you want to change text color */}
                            <Link to='/test' style={{textDecoration:'none'}}>
                            <FeedCard
                                title={item.title}
                                image={item.image} />
                            </Link>
                        </Row>
                    )
                })}
            </Container>

            <Footer isTestActive={true}/>
        </Container>
    )
}

export default HomeScreen;