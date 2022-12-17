import './Question.css';
const Question = ({ data, selectionHandler }) => {
    const jsonObj = data;
    console.log( "jsonObj?.answers",  jsonObj?.answers);
    const options = jsonObj?.answers?.map((option, index) => (
        <li key={index} style={{
            backgroundColor: 'white',
            opacity: '0.8',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
            textAlign: 'left'
        }} onClick={() => {selectionHandler(index);}} >
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
                        padding: '0'
                    }}>
                        {options}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Question;