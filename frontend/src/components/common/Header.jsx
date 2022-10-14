import logo from '../../assets/tarockLogo.svg';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Row>
            <Col className='d-flex justify-content-center align-self-center'>
                <Link to={'/'}>
                    <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' />
                </Link>
            </Col>
        </Row>
    );
}

export default Header;