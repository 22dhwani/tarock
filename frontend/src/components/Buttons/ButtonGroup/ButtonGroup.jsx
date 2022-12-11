import { Link } from 'react-router-dom';
function ButtonGroup(props) {
    const buttonStyle = {
        border: 'none',
        backgroundColor: '#FFFFFF',
    }

    const tarockStatic = [
        "https://tarock.webflow.io/about-us",
        "https://tarock.webflow.io/contact-us"
    ]
    function handleClick(func){
        func();
    }
    return (
        <div>
            {props.buttons && props.buttons.map((button, index) => {
                return (
                    //if the link is a tarock static page, use an anchor tag
                    //otherwise, use a react router link
                    tarockStatic.includes(button.link) ?
                            <a href={button.link} key={index} style={buttonStyle} >
                                <button style={buttonStyle}>
                                    <img src={button.button} alt='button' />
                                </button>
                            </a>
                        :
                        <Link to={button.link} state={button.state} key={index} >
                            <button style={buttonStyle} onClick={()=>handleClick(button.link)}>
                                <img src={button.button} alt='button' />
                            </button>
                        </Link>
                )
            })}
        </div>
    )
}

export default ButtonGroup