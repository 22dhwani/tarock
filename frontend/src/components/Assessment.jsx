import React, { useState, useEffect } from "react";
import Question from './Question';
import Answer from './Answer';
import './Assessment.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import logo from '../assets/tarockLogo.svg'

const Assessment = ({ assessment_group_id }) => {
    const [assessment, setAssessment] = useState({ index: 0, data: [] });
    useEffect(() => {
        fetch('http://35.184.195.100:3000/api/assessments')
            .then((response) => response.json())
            .then((data) => {
                setAssessment({ index: 0, data: data });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function onBtnClick() {
        setAssessment({ index: (assessment.index + 1) % assessment.data.length, data: assessment.data });
    };

    return (
        <Container className='d-flex flex-column min-vw-100 min-vh-100' style={{
            backgroundColor: '#FBF2DC',
            height: 'fit-content',
            background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)'
        }}> 
            
            <Row>
                <img src={logo} alt="logo" height='23.83px' width='120px' className='my-5 mx-auto' />
            </Row>
            {/* <Row className='mx-auto'>Radar</Row> */}
            <div className="card-container w-75 mx-auto">
                <div className="card">
                    {
                        assessment.index < assessment.data.length && <Question data={assessment.data[assessment.index].content} />
                    }
                </div>
            </div>
            <div className="button-container w-75 mx-auto" onClick={onBtnClick}>
                <Answer onClick={onBtnClick} count={3} />
            </div>
        </Container>
    );
};

export default Assessment;
{/* <div className="assessment-container">
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
        </div> */}