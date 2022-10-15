import {ReactComponent as TestTick} from '../../assets/footer/testTick.svg';
import {ReactComponent as Cards} from '../../assets/footer/cards.svg';
import {ReactComponent as Me} from '../../assets/footer/me.svg';
import {ReactComponent as TestTickActive} from '../../assets/footer/testTickActive.svg';
import {ReactComponent as CardsActive} from '../../assets/footer/cardsActive.svg';
import {ReactComponent as MeActive} from '../../assets/footer/meActive.svg';
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
    if (isTestActive) {
        className = 'footer-test';
    } else if (isCardsActive) {
        className = 'footer-cards';
    } else if (isMeActive) {
        className = 'footer-me';
    }
    return (
        <Row className='mt-auto mx-2'>
            <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onTestClick}>
                {
                    isTestActive ? <TestTickActive/> : <TestTick className={ className }/>
                }
            </Col>
            <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onCardsClick}>
                {
                    isCardsActive ? <CardsActive/> : <Cards className={ className }/>
                }
            </Col>
            <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onMeClick}>
                {
                    isMeActive ? <MeActive/> : <Me className={ className }/>
                }
            </Col>
        </Row>
    );
}

export default Footer;