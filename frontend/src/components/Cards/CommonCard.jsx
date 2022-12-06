import Container from 'react-bootstrap/Container';
import { getAvatar } from '../../utils/userUtil';
import RadarChart from '../Charts/RadarChart';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Header from '../Header/Header';
import Swipper from '../Swipper/Swipper';
import patternTarockBlue from '../../assets/patternTarockBlue.svg';
import styles from './Cards.module.css';
import match from '../../assets/cards/matchBtn.svg';

const CommonCard = ({ user, cardData, showDescription, showShare, onMatchClick, children }) => {
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
        <div>

            <div className='justify-content-center'>
                <div className='mt-3 mx-auto'>
                    <div className={styles['radarchart']}>
                        <RadarChart userData={cardData.dimensional_values} enableLabels={true} />
                    </div>
                </div>

            </div>
            {
                onMatchClick &&
                <div className='d-flex justify-content-center mt-4' onClick={() => onMatchClick()}>
                    <img src={match} alt='match' />
                </div>
            }
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
        <Container className='d-flex flex-column ' >
            <div style={{
                backgroundImage: `url(${patternTarockBlue})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Header />
                <div className='d-flex justify-content-center'>
                    <img className='rounded-circle mx-auto' src={getAvatar(user.avatar_index)} alt="avatar" style={{ backgroundColor: '#FFFFFF' }} />
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
                    {user.name} is
                </div>
            </div>

            {showShare ? <Swipper data={[radarView, descriptionView]} /> : radarView}
            <div style={{
                display: showShare ? 'block' : 'none'
            }} className='mt-5'>
                <a href='/test' style={{ display: 'flex', justifyContent: 'center', fontSize: '12px' }}>Not even close?</a>
            </div>
            {children}
        </Container>
    );
}

export default CommonCard;
