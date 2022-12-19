import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import { getUserChartImageData } from '../../utils/chartAssets';
import { getAvatar } from '../../utils/userUtil';
import Header from '../Header/Header';
import Swipper from '../Swipper/Swipper';

const CommonCard = ({ user, cardData, showDescription, showShare, onMatchClick, children }) => {

    const chartDataImage = getUserChartImageData(cardData.personality_category)

    const radarView = <div>
        <div
            style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '22px',
                alignItems: 'center',
                textAlign: 'center'
            }}
            className='py-3'
        >
            <div className='w-100 d-flex flex-wrap justify-content-center px-4 gap-2 pt-2'>
                {cardData.description.STRENGTHS.split(';').map((value, index) => {
                    return (
                        <span
                            key={index}
                            className="rounded-pill"
                            style={{
                                background: 'rgba(255,255,255,0.25)',
                                padding: "2px 10px",
                                fontSize: '12px',
                                fontWeight: '500'
                            }}
                        >
                            {value}
                        </span>
                    )
                })}
            </div>
        </div>
        <div>
            <div
                className="position-relative"
                style={{
                    height: '300px',
                    marginTop: '3rem',
                    marginBottom: '3rem',
                }}
            >
                <img src={chartDataImage.bg} alt="" style={{width: '100%',height: "100%", objectFit: 'contain',}} />
                <img src={chartDataImage.chart} alt="" style={{width: '100%',height: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: '0'}} />
            </div>
            {
                onMatchClick &&
                <div className="d-flex justify-content-center pb-5 mt-2">
                    <button className='d-flex border-0 rounded-pill mt-4 bg-white' style={{color: "#49304D", padding: '0.5rem 1.2rem'}} onClick={() => onMatchClick()}>
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.874999 8.52L0.875 17.48C0.875 19.4898 2.51016 21.125 4.52 21.125C6.52983 21.125 8.165 19.4898 8.165 17.48L8.165 8.52C8.165 6.51017 6.52983 4.875 4.52 4.875C2.51016 4.875 0.874999 6.51017 0.874999 8.52ZM7.275 17.48C7.275 18.9991 6.03912 20.235 4.52 20.235C3.00088 20.235 1.765 18.9991 1.765 17.48L1.765 10.9006C2.43326 11.6735 3.4194 12.165 4.52 12.165C5.6206 12.165 6.60674 11.6735 7.275 10.9006L7.275 17.48Z" fill="#49304D" stroke="#49304D" strokeWidth="0.25"/>
                            <path d="M17.7651 13.48L17.7651 4.52C17.7651 2.51016 16.13 0.875 14.1201 0.875C12.1103 0.875 10.4751 2.51016 10.4751 4.52L10.4751 13.48C10.4751 15.4898 12.1103 17.125 14.1201 17.125C16.13 17.125 17.7651 15.4898 17.7651 13.48ZM11.3651 4.52C11.3651 3.00087 12.601 1.765 14.1201 1.765C15.6393 1.765 16.8751 3.00088 16.8751 4.52L16.8751 11.0994C16.2069 10.3265 15.2207 9.835 14.1201 9.835C13.0195 9.835 12.0334 10.3265 11.3651 11.0994L11.3651 4.52Z" fill="#49304D" stroke="#49304D" strokeWidth="0.25"/>
                        </svg>
                        <p className='mb-0' style={{fontWeight: '600', marginLeft: '10px'}}>Start Matching</p>
                    </button>
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
        <Container className='d-flex flex-column px-0' >
            <div style={{
                // backgroundImage: `url(${patternTarockBlue})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }} className="text-center">
                <Header />
                <div className='d-flex justify-content-center'>
                    <img className='rounded-circle mx-auto' src={getAvatar(user.avatar_index)} alt="avatar" style={{ backgroundColor: '#FFFFFF' }} width='60px' height='60px' />
                </div>
                {/* User Name */}
                <div
                    className="pt-3 pb-1"
                    style={{
                        fontWeight: '400',
                        fontSize: '18px',
                    }}>
                    {user.name}
                </div>
                <p
                    style={{
                        fontWeight: '700',
                        fontSize: '22px',
                    }}
                >
                    The {cardData.personality_category}
                </p>
            </div>

            {showShare ? <Swipper data={[radarView, descriptionView]} /> : radarView}
            <div style={{
                display: showShare ? 'block' : 'none'
            }}
                className='mt-5'>
                <a href='/test' style={{ display: 'flex', justifyContent: 'center', fontSize: '12px' }}>Not even close?</a>
            </div>
            {children}
        </Container>
    );
}

export default CommonCard;
