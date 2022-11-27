import './Question.css';
const Question = ({ data }) => {
    const jsonObj = data;
    const options = jsonObj.answers.map((option, index) => (
        <li key={index} style={{
            backgroundColor: 'white',
            opacity: '0.8',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '10px',
            marginTopBottom: '10px',
        }}>
            {(index + 10).toString(36).toUpperCase()}.  {option.content}
        </li>
    ));
    return (
        <div>
            <div className="question-container">
                <div>
                    <div>{jsonObj?.question}</div>
                    <ul style={{
                        listStyle: 'none',
                    }}>
                        {options}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Question;