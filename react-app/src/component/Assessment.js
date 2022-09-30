import React, { useState, useEffect } from "react";
import './Assessment.css';
import pattern from "../assets/assessmentPattern.svg";

const Assessment = (assessment_group_id) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://35.184.195.100:8080/api/assessments')
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
                setPosts(data[0]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <div className="assessment-container">
            <div className="header"></div>
            <div className="radar"></div>
            <div className="card-container">
                <div className="card">
                    <div>{posts.content}</div>
                </div>
            </div>
            <div className="assessment-pattern">
                <img src={ pattern } alt="assessment pattern svg"/> 
            </div>
        </div>
    );
};

export default Assessment;
