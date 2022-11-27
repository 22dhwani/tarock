import Header from '../components/Header/Header';
import Prep from '../components/Assessment/Prep';
import Assessment from '../components/Assessment/Assessment';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { GlobalContext } from '../context';

function Test(props) {
    const { userData } = useContext(GlobalContext);
    const navigate = useNavigate();
    function goBack() {
        if (userData.type === 'TMP') {
            navigate('/signin', { state: { stage: 'new' } });
        } else {
            navigate(-1);
        }
    }

    const [startTest, setStartTest] = useState(false);
    return (
        <div className='min-vh-100'
            style={{
                background: 'linear-gradient(180deg, #BCE4E5 0%, rgba(188, 228, 229, 0.6) 100%)'
            }}>
            {
                startTest ?
                    <Assessment assessmentGroupId={props.assessmentGroupId} />
                    :
                    <>
                        <Header goBackFunc={goBack} />
                        <Prep startTest={setStartTest} />
                    </>
            }
        </div>
    )
}
export default Test;