import logo from '../../assets/tarockLogo.svg';
import back from '../../assets/buttonBack.svg';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const Header = ({ goBackFunc }) => {
    const navigate = useNavigate();
    return (
        <Row>
            <Col className='col-2 d-flex justify-content-center align-self-center'>
                {
                    goBackFunc &&
                    <img src={back} alt="back" onClick={goBackFunc}/>
                }
            </Col>
            <Col className='col-8 d-flex justify-content-center align-self-center'>
                    <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' onClick={()=>navigate('/')} style={{cursor:'pointer'}}/>
            </Col>
            <Col className='col-2'></Col>
        </Row>
    );
}

export default Header;