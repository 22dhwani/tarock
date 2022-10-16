import {Link} from 'react-router-dom';
function ButtonGroup(props) {
    const buttonStyle = {
        border: 'none',
        backgroundColor: '#FFFFFF',
    }
    return (
        <div>
            {props.buttons && props.buttons.map((button, index) => {
                return (
                    <Link to={button.link} key={index}>
                    <button style={buttonStyle}>
                        <img src={button.button} alt='button' />
                    </button>
                    </Link>
                )
            })}
        </div>
    )
}

export default ButtonGroup