import React from "react";
import './Question.css';

const Question = ({ data }) => {
    const jsonObj = data;
    const options = jsonObj.answers.map((option, index) =>(
        <li key={index}>
            { option.content }
        </li>
    ));
    return (
        <div className="question-container">
            <div>
                <div>{ jsonObj?.question }</div>
                <ol>
                    { options }
                </ol>
            </div>    
        </div>
    );
}

export default Question;