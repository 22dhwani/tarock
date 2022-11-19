import {ReactComponent as TestTick} from '../../assets/footer/Vectorexplore.svg';
import {ReactComponent as Cards} from '../../assets/footer/Vectorcards.svg';
import {ReactComponent as Me} from '../../assets/footer/Vectorsettings.svg';
import {ReactComponent as TestTickActive} from '../../assets/footer/Vectorexploreactive.svg';
import {ReactComponent as CardsActive} from '../../assets/footer/Vectorcardsactive.svg';
import {ReactComponent as MeActive} from '../../assets/footer/Vectorsettingsactive.svg';
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
        className = 'footer-blank';
    } else if (isCardsActive) {
        className = 'footer-blank';
    } else if (isMeActive) {
        className = 'footer-blank';
    }
    return (
        <div style={{backgroundColor:'#FAFAFA',borderRadius:'25px 25px 0px 0px'}}>
        <Row className='mt-1'>
            <Col className='ml-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onTestClick}>
                {
                    isTestActive ? <TestTickActive/> : <TestTick className={ className }/>
                }
            </Col>
            <Col className='d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onCardsClick}>
                {
                    isCardsActive ? <CardsActive/> : <Cards className={ className }/>
                }
            </Col>
            <Col className='mr-4 d-flex align-items-center justify-content-center py-4' style={{ cursor: 'pointer' }} onClick={onMeClick}>
                {
                    isMeActive ? <MeActive/> : <Me className={ className }/>
                }
            </Col>
        </Row>
        </div>
    );
}

export default Footer;