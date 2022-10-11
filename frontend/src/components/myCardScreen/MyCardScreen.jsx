import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../context';
import male from '../../assets/avatarMale.svg'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import RadarChart from '../Charts/RadarChart';

function Card() {
    const { userID } = useContext(GlobalContext);
    const location = useLocation();
    return (
        <Container className='d-flex flex-column min-vw-100 min-vh-100' style={{ backgroundColor: '#3069B3' }}>
            <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                margin: '0 auto',
            }} />
            <Row className="mx-auto">
                {/* Need to update according to user avatar index */}
                <Col className='d-flex justify-content-center '>
                    <img className='rounded-circle mx-auto' src={male} alt="male" style={{ backgroundColor: '#FFFFFF' }} />
                </Col>
                <div style={{
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '28px',
                    color: '#FFFFFF',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    Let's meet {userID}
                </div>
                <div style={{
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '18px',
                    lineHeight: '22px',
                    color: '#FFFFFF',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    {userID} is Advisor, Altruistic, Personable, Intuitive, Diplomat.
                </div>
                <div style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    height: '300px',
                    margin: '0 auto',
                }}>
                    <Col className='d-flex justify-content-center'>
                        <div className='mx-auto'>
                            <RadarChart data={location.state.card} />
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
}

export default Card;