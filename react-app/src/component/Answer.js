import React from "react";
import './Answer.css';
import btn_1 from '../assets/btn_1.svg';
import btn_2 from '../assets/btn_2.svg';
import btn_3 from '../assets/btn_3.svg';
import btn_4 from '../assets/btn_4.svg';

const Answer = ({ count, onClick }) => {
    return (
        <div className="answer-container">
            <ul>
                <li>
                    <img src={btn_1} alt="btn_1"/>
                </li>
                <li>
                    <img src={btn_2} alt="btn_2"/>
                </li>
                <li>
                    <img src={btn_3} alt="btn_3"/>
                </li>
                <li>
                    <img src={btn_4} alt="btn_4"/>
                </li>
            </ul>
        </div>
    );
}

export default Answer;