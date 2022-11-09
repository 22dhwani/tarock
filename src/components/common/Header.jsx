import logo from '../../assets/tarockLogo.svg';
import back from '../../assets/buttonBack.svg';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Header = ({ goBackFunc }) => {
    return (
        <Row>
            <Col className='col-2 d-flex justify-content-center align-self-center'>
                {
                    goBackFunc &&
                    <img src={back} alt="back" onClick={goBackFunc}/>
                }
            </Col>
            <Col className='col-8 d-flex justify-content-center align-self-center'>
                <Link to={'/'}>
                    <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' />
                </Link>
            </Col>
            <Col className='col-2'></Col>
        </Row>
    );
}

export default Header;