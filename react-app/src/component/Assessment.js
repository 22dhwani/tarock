import React, { useState, useEffect } from "react";
import Question from './Question';
import Answer from './Answer';
import './Assessment.css';

const Assessment = ({ assessment_group_id }) => {
    const [assessment, setAssessment] = useState({index: 0, data: []});
    useEffect(() => {
        fetch('http://35.184.195.100:8080/api/assessments')
            .then((response) => response.json())
            .then((data) => {
                setAssessment({index: 0, data: data});
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function onBtnClick() {
        setAssessment({index: (assessment.index + 1) % assessment.data.length, data: assessment.data});
    };

    return (
        <div className="assessment-container">
            <div className="assessment-pattern"></div>
            <div className="header"></div>
            <div className="radar"></div>
            <div className="card-container">
                <div className="card">
                    {
                        assessment.index < assessment.data.length && <Question data={assessment.data[assessment.index].content}/>
                    }
                </div>
            </div>
            <div className="button-container" onClick={onBtnClick}>
                <Answer onClick={onBtnClick} count={3}/>
            </div>
        </div>
    );
};

export default Assessment;
