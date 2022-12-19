import './Question.css';
const Question = ({ data, selectionHandler }) => {
    const jsonObj = data;
    const options = jsonObj?.answers?.map((option, index) => (
        <li
            key={index}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.62)',
                padding: '10px',
                borderRadius: '80px 10px 10px 80px',
                marginTop: '10px',
                minHeight: '74px',
                marginBottom: '10px',
                cursor: 'pointer',
                fontWeight: '500',
                textAlign: 'left'
            }}
            className="position-relative d-flex align-items-center"
            onClick={() => { selectionHandler(index); }}
        >
                <div
                    className="position-absolute rounded-pill d-flex justify-content-center align-items-center"
                    style={{
                        background: 'white',
                        height: '70px',
                        width: '70px',
                        top: '50%',
                        left: '2px',
                        fontSize: '24px',
                        fontWeight: '600',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <span>{(index + 10).toString(36).toUpperCase()}</span>
                </div>
            <div
                style={{
                    paddingLeft: '70px'
                }}
            >
                {option.content}
            </div>
        </li>
    ));
    return (
        <div>
            <div className="question-container text-darkPurple">
                <div>
                    <div>{jsonObj?.question}</div>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: '0'
                        }}
                        className="pt-5"
                    >
                        {options}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Question;