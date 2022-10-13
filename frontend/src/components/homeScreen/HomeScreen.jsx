import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FeedCard from "../feedItems/FeedCard";
import testImageFeed from '../../assets/testImageFeed.svg'
import { Link } from "react-router-dom";
import Header from '../common/Header';
import Loading from '../common/Loading';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useContext } from "react";
import { GlobalContext } from '../../context';
import { useNavigate } from "react-router-dom";
import Footer from '../common/Footer';

function HomeScreen() {
    const { userId, setUserId } = useContext(GlobalContext);
    const { isLoading, data } = useVisitorData();
    const navigate = useNavigate();
    if (isLoading) {
        return <Loading/>;
    }
    if (data) {
        // Determine if user exists in database.
        fetch(`http://35.184.195.100:3000/api/user/${data.visitorId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setUserId(data[0].internal_user_id);
                } else {
                    navigate('/signin');
                }
            })
            .catch((err) => {
                console.log(err.message)
            });
    }

    // Only render if user ID exists.
    if (userId) {
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
}

export default HomeScreen;