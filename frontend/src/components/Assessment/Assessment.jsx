import { useState, useEffect, useContext } from "react";
import Question from '../Question/Question';
import './Assessment.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Header from '../Header/Header';
import btn1 from '../../assets/buttons/Button-Right.svg';
import btn2 from '../../assets/buttons/Button-Left.svg';
import RadarChart from "../Charts/RadarChart";
import { GlobalContext } from '../../context';
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import ProgressBar from 'react-bootstrap/ProgressBar';
import CustomProgressBar from "./CustomProgressBar";

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
    const [answers] = useState([]);
    const { userData } = useContext(GlobalContext);
    const navigate = useNavigate();
    const search = useLocation().search;
    const matchUserId = new URLSearchParams(search).get('match');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/assessment?groupId=${assessmentGroupId}`)
            .then((response) => response.json())
            .then((data) => {
                setAssessment({ index: 0, data: data });
                setIsLoading(false);
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
            setIsLoading(true);
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
                    setIsLoading(false);
                    if (userData.type != 'REAL') {
                        const nav = '/signin' + (matchUserId ? `?match=${matchUserId}` : '');
                        navigate(nav, { state: { stage: 'signup' } });
                    } else {
                        if (matchUserId) {
                            navigate(`/cards?match=${matchUserId}`);
                        } else {
                            navigate('/cards', { state: { card: 'tarock' } });
                        }
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
            if (userData.type === 'TMP') {
                navigate('/signin', { state: { stage: 'new' } });
            } else {
                navigate(-1);
            }
        } else {
            setAssessment({
                index: assessment.index - 1,
                data: assessment.data
            });
            answers.pop();
        }
    }
    if (isLoading) {
        return <Loading />
    }
    
    return (
        <Container className='min-h-100'>
            <Header goBackFunc={goBack} />
            {/* <ProgressBar now={assessment.index} visuallyHidden max={assessment.data.length} /> */}
            <CustomProgressBar
                index={assessment.index}
                totalItems={assessment.data.length}
            />
            <Row className='mx-auto'>
                <div style={{ height: '200px', width: '200px' }} className='mx-auto mt-5'>
                    <RadarChart userData={randomRadarData()} enableLabels={false} />
                </div>
            </Row>
            <div className="card-container mx-auto text-center " style={{
                width: '90%',
                paddingBottom: '100px'
            }}>
                <div>
                    {
                        assessment.index < assessment.data.length && <Question 
                        data={assessment.data[assessment.index].content} 
                        selectionHandler={onBtnClick}
                        />
                    }
                </div>
            </div>
        </Container>
    );
};

export default Assessment;
