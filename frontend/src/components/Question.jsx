import React from "react";
import './Question.css';

const Question = ({ data }) => {
    const jsonObj = JSON.parse(data);
    const options = jsonObj.options.map((option, index) =>(
        <li key={index}>
            { option }
        </li>
    ));
    return (
        <div className="question-container">
            <div>
                <div>{ jsonObj?.description }</div>
                <ol>
                    { options }
                </ol>
            </div>    
        </div>
    );
}

export default Question;