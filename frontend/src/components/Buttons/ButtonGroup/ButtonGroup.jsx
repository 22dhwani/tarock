import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../../../context';
import { useNavigate } from "react-router-dom";
import { logout } from '../../../utils/userUtil';

function ButtonGroup(props) {
    const { userData, setUserData } = useContext(GlobalContext);
    const navigate = useNavigate();
    const buttonStyle = {
        border: 'none',
        backgroundColor: '#FFFFFF',
    }

    const tarockStatic = [
        "https://tarock.webflow.io/about-us",
        "https://tarock.webflow.io/contact-us",
        "https://discord.com/invite/QzQQMgnPaf"
    ]
    async function handleClick(func){
        if (func === 'logout') {
            await logout(userData.visitorId, setUserData);
            navigate('/');
        }
    }
    return (
        <div>
            {props.buttons && props.buttons.map((button, index) => {
                return (
                    //if the link is a tarock static page, use an anchor tag
                    //otherwise, use a react router link
                    tarockStatic.includes(button.link) ?
                            <a href={button.link} key={index} style={buttonStyle} target="_blank" rel="noreferrer noopener">
                                <button style={buttonStyle}>
                                    <img src={button.button} alt='button' />
                                </button>
                            </a>
                        :
                        button.func ? 
                            <button style={buttonStyle} onClick={()=>handleClick(button.func)} key={index} >
                                <img src={button.button} alt='button' />
                            </button>
                            :
                            <Link to={button.link} state={button.state} key={index} >
                                <button style={buttonStyle} >
                                    <img src={button.button} alt='button' />
                                </button>
                            </Link>
                )
            })}
        </div>
    )
}

export default ButtonGroup