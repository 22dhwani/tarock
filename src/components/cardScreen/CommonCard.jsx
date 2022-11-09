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
import Swipper from '../Swipper';
import patternTarockBlue from '../../assets/patternTarockBlue.svg';
import deck from '../../assets/footer/cards.svg';
import './card.css'
const CommonCard = ({ user, cardData, showDescription, showShare, children }) => {
    const radarView = <div>
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
            {user.name} is {cardData.description.STRENGTHS.replaceAll(';', ',')}.
        </div>
        <div style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.6) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            height: '300px',
            margin: '0 auto',
            width: '100%',
        }} >
            <div className='d-flex justify-content-center'>
                <div className='mx-auto'>
                    <RadarChart apiResponse={cardData.dimensional_values} enableLabels={true} />
                </div>
            </div>
        </div>
    </div>

    const descriptionView = <>

        {showDescription &&
            <div className='py-0' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#49304D'
            }}>
                <Row className='mx-auto px-3 py-1' style={{
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
                <Row className='mx-auto px-3 py-1' style={{
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
                <Row className='mx-auto px-3 py-1' style={{
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
                <Row className='mx-auto pz-3 py-1' style={{
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
    </>

    return (
        <Container className='d-flex flex-column min-vh-100' >
            <div style={{
                backgroundImage: `url(${patternTarockBlue})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Header />
                <div className='d-flex justify-content-center'>
                    {
                        (user.avatar_index == 1) &&
                        <img className='rounded-circle mx-auto' src={male} alt="male" style={{ backgroundColor: '#FFFFFF' }} />
                    }
                    {
                        (user.avatar_index == 0) &&
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
                    Let's meet {user.name}
                </div>
            </div>


            {/* <Container className="overflow-auto d-flex flex-column m-auto" style={{

            }}> */}
                {showShare ? <Swipper data={ [radarView, descriptionView]} /> : radarView}
                {
                    showShare &&
                    <Link to={`/share/${user.internal_user_id}`}>
                        <div className='d-flex mt-5'>
                            <img src={share} alt='share' className='px-3'/>
                            <div style={{
                                display: 'flex',
                                width: 'fit-content',
                                alignItems: 'center',
                                margin: 'auto',
                                borderRadius: '8px',
                                backgroundColor: 'black',
                                color: 'white',
                                cursor:'pointer',
                                padding: '10px',
                            }}
                            onClick={() => navigate('/cards')}
                            >
                                <img src={deck} alt='deck' width='40px' />
                            </div>
                        </div>
                    </Link>
                }
            {/* </Container> */}
                {children}
        </Container>
    );
}

export default CommonCard;