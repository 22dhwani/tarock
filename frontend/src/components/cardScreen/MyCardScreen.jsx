import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import { useContext } from 'react';
import { GlobalContext } from '../../context';
import male from '../../assets/avatarMale.svg'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import RadarChart from '../Charts/RadarChart';
import strengths from '../../assets/myCard/strengths.svg';
import weakness from '../../assets/myCard/weakness.svg';
import superpower from '../../assets/myCard/superpower.svg';
import blindSpot from '../../assets/myCard/blindSpot.svg';
import idealEnv from '../../assets/myCard/idealEnv.svg';
import share from '../../assets/myCard/share.svg';

function MyCard() {
    const { userID } = useContext(GlobalContext);
    const location = useLocation();
    return (
        <Container className='d-flex flex-column min-vh-100' style={{ backgroundColor: '#3069B3' }}>
            <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                margin: '0 auto',
            }} />
            <div className="mx-auto">
                {/* Need to update according to user avatar index */}
                <div className='d-flex justify-content-center'>
                    <img className='rounded-circle mx-auto' src={male} alt="male" style={{ backgroundColor: '#FFFFFF' }} />
                </div>
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
                    <div className='d-flex justify-content-center'>
                        <div className='mx-auto'>
                            <RadarChart data={location.state.card} />
                        </div>
                    </div>
                </div>
                <Row className='mx-auto' style={{
                    background: '#FFFFFF',
                    borderRadius: '8px 8px 0px 0px'
                }}>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <img src={strengths} alt='strengths'/>
                    </Col>
                    <Col>
                        <div>
                            Advisor, Altruistic, Personable, Intuitive, Diplomat
                        </div>
                    </Col>
                </Row>
                <Row className='mx-auto' style={{
                    background: '#FFFFFF',
                    opacity: '0.9',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <img src={weakness} alt='weakness'/>
                    </Col>
                    <Col>
                        <div>
                            Goes on tengents, Not meticulous
                        </div>
                    </Col>
                </Row>
                <Row className='mx-auto' style={{
                    background: '#FFFFFF',
                    opacity: '0.8',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <img src={superpower} alt='superpower'/>
                    </Col>
                    <Col>
                        <div>
                            Intuition
                        </div>
                    </Col>
                </Row>
                <Row className='mx-auto' style={{
                    background: '#FFFFFF',
                    opacity: '0.7',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <img src={blindSpot} alt='blind spot'/>
                    </Col>
                    <Col>
                        <div>
                            Organization
                        </div>
                    </Col>
                </Row>
                <Row className='mx-auto' style={{
                    background: '#FFFFFF',
                    opacity: '0.6',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Col className='col-4 d-flex justify-content-center align-self-center'>
                        <img src={idealEnv} alt='ideal environment'/>
                    </Col>
                    <Col>
                        <div>
                            Group
                        </div>
                    </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                    <img src={share} alt='share'/>
                </div>
            </div>
        </Container>
    );
}

export default MyCard;