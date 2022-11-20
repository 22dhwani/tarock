import testTick from '../../assets/footer/VectorExplore.png';
import cards from '../../assets/footer/VectorCards.png';
import me from '../../assets/footer/VectorSettings.png';
import testTickActive from '../../assets/footer/VectorexploreActive.png';
import cardsActive from '../../assets/footer/VectorcardsActive.png';
import meActive from '../../assets/footer/VectorsettingsActive.png';
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
    let className;
    return (
        <div style={{ backgroundColor: '#FAFAFA', borderRadius: '25px 25px 0px 0px' }}>
            <Row className='mt-1'>
                <Col className='ml-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onTestClick}>
                    <img src={isTestActive ? testTickActive : testTick}></img>
                </Col>
                <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onCardsClick}>
                    <img src={isCardsActive ? cardsActive : cards}></img>
                </Col>
                <Col className='mr-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onMeClick}>
                    <img src={isMeActive ? meActive : me}></img>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;