import Container from 'react-bootstrap/Container';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';
import RadarChart from '../Charts/RadarChart';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import strengths from '../../assets/myCard/strengths.svg';
import weakness from '../../assets/myCard/weakness.svg';
import superpower from '../../assets/myCard/superpower.svg';
import blindSpot from '../../assets/myCard/blindSpot.svg';
import idealEnv from '../../assets/myCard/idealEnv.svg';
import Header from '../common/Header';
import share from '../../assets/myCard/share.svg';
import { Link } from 'react-router-dom';

const Card = ({ userData, cardData, showDescription, showShare }) => {
    return (
        <Container className='d-flex flex-column h-100 flex-grow-1'>
            <Header/>
            <div className='d-flex justify-content-center'>
                {
                    (userData.avatar_index == 1) &&
                    <img className='rounded-circle mx-auto' src={male} alt="male" style={{ backgroundColor: '#FFFFFF' }} />
                }
                {
                    (userData.avatar_index == 0) &&
                    <img className='rounded-circle mx-auto' src={female} alt="female" style={{ backgroundColor: '#FFFFFF' }} />
                }
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
                Let's meet {userData.name}
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
            }}
                className='py-3'>
                {userData.name} is {cardData.description.STRENGTHS.replaceAll(';', ',')}.
            </div>
            <Container className="flex-grow-1 overflow-auto">
                <div style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '8px',
                    height: '300px',
                    margin: '0 auto',
                }} >
                    <div className='d-flex justify-content-center'>
                        <div className='mx-auto'>
                            <RadarChart apiResponse={cardData.dimensional_values} enableLabels={true}/>
                        </div>
                    </div>
                </div>
                {
                    showDescription &&
                    <div className='py-3' style={{
                        fontFamily: 'Montserrat',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#49304D'
                    }}>
                        <Row className='mx-auto p-3' style={{
                            background: '#FFFFFF',
                            borderRadius: '8px 8px 0px 0px',
                            fontSize: '18px',
                            lineHeight: '24px'
                        }}>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <img src={strengths} alt='strengths' />
                            </Col>
                            <Col>
                                {
                                    cardData.description.STRENGTHS.split(";").map((strength, index) => {
                                        return (
                                            <div key={index}>
                                                {strength.trim()}
                                            </div>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row className='mx-auto p-3' style={{
                            background: '#FFFFFF',
                            opacity: '0.9',
                            backdropFilter: 'blur(10px)',
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#49304D',
                        }}>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <img src={weakness} alt='weakness' />
                            </Col>
                            <Col>
                                {
                                    cardData.description.WEAKNESS.split(";").map((strength, index) => {
                                        return (
                                            <div key={index}>
                                                {strength.trim()}
                                            </div>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row className='mx-auto p-3' style={{
                            background: '#FFFFFF',
                            opacity: '0.8',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <img src={superpower} alt='superpower' />
                            </Col>
                            <Col>
                                <div>
                                    {cardData.description.SUPERPOWER}
                                </div>
                            </Col>
                        </Row>
                        <Row className='mx-auto p-3' style={{
                            background: '#FFFFFF',
                            opacity: '0.7',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <img src={blindSpot} alt='blind spot' />
                            </Col>
                            <Col>
                                <div>
                                    {cardData.description.BLINDSPOT}
                                </div>
                            </Col>
                        </Row>
                        <Row className='mx-auto p-3' style={{
                            background: '#FFFFFF',
                            opacity: '0.6',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '0px 0px 8px 8px'
                        }}>
                            <Col className='col-4 d-flex justify-content-center align-self-center'>
                                <img src={idealEnv} alt='ideal environment' />
                            </Col>
                            <Col>
                                <div>
                                    {cardData.description.IDEALENVIRONMENT}
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
            {
                showShare &&
                <Link to={`/share/${userData.internal_user_id}`}>
                    <div className='d-flex justify-content-center py-3 mt-auto'>
                        <img src={share} alt='share' />
                    </div>
                </Link>
            }
        </Container>
    );
}

export default Card;