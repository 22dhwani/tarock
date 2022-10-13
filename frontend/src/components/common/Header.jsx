import logo from '../../assets/tarockLogo.svg';
import Row from "react-bootstrap/Row";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';

const Header = () => {
    const { userID, setUserID } = useContext(GlobalContext);
    
    function handleClick() {
        setUserID(data.visitorId);
    }

    return (
        <Row>
            <img src={logo} onClick={ handleClick } alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' />
        </Row>
    );
}

export default Header;