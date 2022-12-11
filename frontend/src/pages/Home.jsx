import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Feeds from "../components/Feed/Feeds";
import homeHeader from '../assets/header.svg'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';

function Home() {
    // Get data from api and store in state
    const feedData = [
        {
            header: homeHeader,
          
        }
    ]
    return (
        <>
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FFFFFF' }}>
            <Header/>
            
            <Container className="flex-grow-1 overflow-auto">
                {feedData.map((item, index) => {
                    return (
                        <Row key={index} className='pb-4'>
                            {/* add color:'black' to style prop if you want to change text color */}
                           
                            <Feeds
                                header={item.header}
                              />
                    
                        </Row>
                    )
                })}
            </Container>
        
        <Footer isTestActive={true}/>
        </Container>
        
        </>
    )
}

export default Home;