import Container from 'react-bootstrap/Container';
import logo from '../../assets/tarockLogo.svg';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../context';
import male from '../../assets/avatarMale.svg'
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import RadarChart from '../Charts/RadarChart';
import strengths from '../../assets/myCard/strengths.svg';
import weakness from '../../assets/myCard/weakness.svg';
import superpower from '../../assets/myCard/superpower.svg';
import blindSpot from '../../assets/myCard/blindSpot.svg';
import idealEnv from '../../assets/myCard/idealEnv.svg';
import share from '../../assets/myCard/share.svg';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';

const MyCard = () => {
    const { userId } = useContext(GlobalContext);
    const [cardData, setCardData] = useState({});
    useEffect(() => {
        fetch(`http://35.184.195.100:3000/api/result?userId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const type = data[0].result_code;
                    fetch(`http://35.184.195.100:3000/api/card/${type}`)
                        .then(response => response.json())
                        .then(data => setCardData(data))
                        .catch(err => console.log(err.message));
                }
            })
            .catch(err => console.log(err.message));
    }, [userId]);
    if (userId && cardData.description) {
        return (
            <Container className='d-flex flex-column vh-100' style={{ backgroundColor: '#3069B3' }}>
                <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5' style={{
                    margin: '0 auto',
                }} />
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
                    Let's meet {userId}
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
                    {userId} is {cardData.description.STRENGTHS.replace(';', ',')}.
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
                                <RadarChart data={cardData.dimensional_values} />
                            </div>
                        </div>
                    </div>
                    <div className='py-3'>
                        <Row className='mx-auto' style={{
                            background: '#FFFFFF',
                            borderRadius: '8px 8px 0px 0px'
                        }} >
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
                        <Row className='mx-auto' style={{
                            background: '#FFFFFF',
                            opacity: '0.9',
                            backdropFilter: 'blur(10px)'
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
                        <Row className='mx-auto' style={{
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
                        <Row className='mx-auto' style={{
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
                        <Row className='mx-auto py-2' style={{
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
                </Container>
                <Link to= '/user'>
                    <div className='d-flex justify-content-center py-3'>
                        <img src={share} alt='share' />
                    </div>
                </Link>
            </Container>
        );
    } else {
        return <Loading/>
    }
}

export default MyCard;