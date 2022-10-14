import Container from 'react-bootstrap/Container';
import Header from '../common/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ReactComponent as DefaultCard} from '../../assets/cards/default.svg';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';
import Footer from '../common/Footer';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';

const CardsScreen = () => {
    const { userId } = useContext(GlobalContext);
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const onMyCardClick = () => {
        navigate('/myCard');
    }
    useEffect(() => {
        fetch(`http://35.184.195.100:3000/api/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUserData(data[0]);
                }
            })
            .catch(err => console.log(err.message));
    }, [userId]);

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
                                {
                                    (userData.avatar_index == 1) &&
                                    <img className='rounded-circle position-absolute top-50 start-50 translate-middle w-25 h-auto' src={male} alt="male" style={{ backgroundColor: '#FFFFFF' }} />
                                }
                                {
                                    (userData.avatar_index == 0) &&
                                    <img className='rounded-circle position-absolute top-50 start-50 translate-middle w-25 h-auto' src={female} alt="female" style={{ backgroundColor: '#FFFFFF' }} />
                                }
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