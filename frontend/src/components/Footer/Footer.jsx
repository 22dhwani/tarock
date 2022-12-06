import testTick from '../../assets/footer/vectorExplore.png';
import cards from '../../assets/footer/vectorCards.png';
import me from '../../assets/footer/vectorSettings.png';
import testTickActive from '../../assets/footer/vectorExploreActive.png';
import cardsActive from '../../assets/footer/vectorCardsActive.png';
import meActive from '../../assets/footer/vectorSettingsActive.png';
import './Footer.css';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";

const Footer = ({ isTestActive, isCardsActive, isMeActive }) => {
    const navigate = useNavigate();
    const onTestClick = () => {
        navigate('/home');
    }
    const onCardsClick = () => {
        navigate('/cards');
    }
    const onMeClick = () => {
        navigate('/user');
    }
    const styledDiv = 'd-flex flex-column align-items-center float'
    return (
        <div style={{ backgroundColor: '#FAFAFA', borderRadius: '25px 25px 0px 0px' }}>
            <Row className='mt-1'>
                <Col className='ml-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onTestClick}>
                    <div className={styledDiv}>
                        <img src={isTestActive ? testTickActive : testTick}></img>
                        <p className='footer-text mb-0 mt-1' style={{
                            color: '#49304D',
                            fontWeight: isTestActive ? '600': '500',
                            fontSize: '12px'
                        }}>Explore</p>
                    </div>
                </Col>
                <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onCardsClick}>
                    <div className={styledDiv}>
                        <img src={isCardsActive ? cardsActive : cards}></img>
                        <p className='footer-text mb-0 mt-1' style={{
                            color: '#49304D',
                            fontWeight: isCardsActive ? '600': '500',
                            fontSize: '12px'
                        }}>Cards</p>
                    </div>
                </Col>
                <Col className='mr-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onMeClick}>
                    <div className={styledDiv}>
                        <img src={isMeActive ? meActive : me}></img>
                        <p className='footer-text mb-0 mt-1' style={{
                            color: '#49304D',
                            fontWeight: isMeActive ? '600': '500',
                            fontSize: '12px'
                        }}>Settings</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;