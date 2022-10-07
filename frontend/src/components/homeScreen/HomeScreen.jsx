import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import logo from '../../assets/tarockLogo.svg';
import testTick from '../../assets/testTick.svg'
import meActive from '../../assets/meActive.svg'
import cards from '../../assets/cards.svg'
import FeedCard from "../feedItems/FeedCard";
import testImageFeed from '../../assets/testImageFeed.svg'
import { Link } from "react-router-dom";
function HomeScreen() {
    const bottomNavItems = [testTick, cards, meActive]

    //get data from api and store in state
    const data = [
        {
            title: 'Tarock Personality Test',
            image: testImageFeed
        },
    ]
    return (
        <Container fluid className='bg-light pb-5 min-vh-100'>
            <Row>
                <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                    margin: '0 auto',
                }} />
            </Row>

            {data.map((item, index) => {
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

            <Row className="fixed-bottom py-3 mb-2 bg-light">
                <div className='d-flex py-4' style={{
                    width: 'fit-content',
                    margin: '0 auto',
                }}>
                    {bottomNavItems.map((bottomNavItem, index) => {
                        return (
                            <div key={index} className='px-5' style={{cursor:'pointer'}}>
                                <img src={bottomNavItem} alt='button' />
                            </div>
                        )
                    })}
                </div>
            </Row>
        </Container>
    )
}

export default HomeScreen;