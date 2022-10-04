
function ButtonGroup(props) {
    const buttonStyle = {
        border: 'none',
        backgroundColor: '#FFFFFF',
    }
    return (
        <div>
            {props.buttons && props.buttons.map((button, index) => {
                return (
                    <button key={index} style={buttonStyle}>
                        <img src={button} alt='button' />
                    </button>
                )
            })}
        </div>
    )
}

export default ButtonGroup