import Container from 'react-bootstrap/Container';
import Header from '../common/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ReactComponent as DefaultCard} from '../../assets/cards/default.svg';
import {ReactComponent as Avatar} from '../../assets/avatar.svg';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';

const CardsScreen = () => {
    const navigate = useNavigate();
    const onMyCardClick = () => {
        navigate('/myCard');
    }

    return (
        <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#FAE8E7' }}>
            <Header/>
            <div className='mx-auto' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '28px',
                color: '#49304D'
            }}>
                Tarock Cards
            </div>
            <Container className='flex-grow-1 overflow-auto p-4'>
                <Row>
                    <Col className='col-6 d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={onMyCardClick}>
                        <Row>
                            <Col className='col-12 d-flex justify-content-center position-relative'>
                                <DefaultCard/>
                                <Avatar className='position-absolute top-50 start-50 translate-middle w-25 h-25'/>
                            </Col>
                            <Col className='col-12 d-flex justify-content-center mt-2' style={{
                                fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: '14px',
                                lineHeight: '14px',
                                color: '#49304D',
                            }}>
                                Tarock Card
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer isCardsActive={true}/>
        </Container>
    );
}

export default CardsScreen;