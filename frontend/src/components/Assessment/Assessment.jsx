import { useState, useEffect, useContext } from "react";
import Question from '../Question/Question';
import './Assessment.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Header from '../Header/Header';
import btn1 from '../../assets/btn_1.svg';
import btn2 from '../../assets/btn_2.svg';
import RadarChart from "../Charts/RadarChart";
import { GlobalContext } from '../../context';
import { useNavigate, useLocation } from "react-router-dom";

const randomRadarData = () => {
    return {
        LOGIC: Math.random(),
        EMOTION: Math.random(),
        STRUCTURE: Math.random(),
        OPENNESS: Math.random(),
        EXTRAVERSION: Math.random(),
        INTROVERSION: Math.random(),
        EXECUTION: Math.random(),
        STRATEGY: Math.random()
    };
}

const Assessment = ({ assessmentGroupId }) => {
    const [assessment, setAssessment] = useState({ index: 0, data: [] });
    const [answers, setAnswers] = useState([]);
    const { userData } = useContext(GlobalContext);
    const navigate = useNavigate();
    const search = useLocation().search;
    const matchUserId = new URLSearchParams(search).get('match');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/assessment?groupId=${assessmentGroupId}`)
            .then((response) => response.json())
            .then((data) => {
                setAssessment({ index: 0, data: data });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function onBtnClick(index) {
        const content = assessment.data[assessment.index].content;
        const jsonObj = content;
        const type = jsonObj.answers[index].type;
        answers.push(type);
        if (assessment.index == assessment.data.length - 1) {
            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/result`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userData.id,
                    assessmentGroupId: assessmentGroupId,
                    answers: answers,
                    duration: 60 // TODO: calculate duration
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (userData.type != 'REAL') {
                        const nav = '/signin' + (matchUserId ? `?match=${matchUserId}` : '');
                        navigate(nav, { state: { stage: 'signup' } });
                    } else {
                        navigate("/myCard");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        setAssessment({ index: (assessment.index + 1) % assessment.data.length, data: assessment.data });
    };

    const goBack = () => {
        if (assessment.index == 0) {
            navigate(-1);
        } else {
            setAssessment({
                index: assessment.index - 1,
                data: assessment.data
            });
        }
    }

    return (
        <Container className='d-flex flex-column min-vh-100' style={{
            backgroundColor: '#FBF2DC',
            height: 'fit-content',
            background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)'
        }}>

            <Header goBackFunc={goBack}/>
            <Row className='mx-auto'>
                <div style={{ height: '200px', width: '200px' }}>
                    <RadarChart userData={randomRadarData()} enableLabels={false}/>
                </div>
            </Row>
            <div className="card-container w-75 mx-auto overflow-auto">
                <div className="card">
                    {
                        assessment.index < assessment.data.length && <Question data={assessment.data[assessment.index].content} />
                    }
                </div>
            </div>
            <Row className="w-75 mx-auto">
                <Col className="col-6 d-flex justify-content-center">
                    <img src={btn1} alt="btn1" onClick={(e) => { onBtnClick(0) }} />
                </Col>
                <Col className="col-6 d-flex justify-content-center">
                    <img src={btn2} alt="btn2" onClick={(e) => { onBtnClick(1) }} />
                </Col>
            </Row>
        </Container>
    );
};

export default Assessment;
