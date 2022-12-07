import patternT from '../../assets/patterns/pattern-t-cyan.svg';
import tarockPattern from '../../assets/patterns/tarockPattern30.svg';
import Popup from '../PopUp/PopUp';
import { useState } from 'react';
import { useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
function Prep(props) {
    const [show, setShow] = useState();
    useEffect(() => {
        if(show === false){
            props.startTest(true);
        }
    }, [show]);
    return (
        <div className='d-flex flex-column justify-content-between'
            style={{
                minHeight: '83vh',
            }}>
            <div className='px-5 '>
                <h1 style={{
                    fontWeight: '700',
                    fontSize: '24px',
                    lineHeight: '29.26px',

                }}>
                    Roughly 20 questions to unlock yourself
                </h1>
                <p style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '19.5px'
                }}>
                    A personality test like no other
                </p>
            </div>

            <div className='
            d-flex flex-column
            justify-content-center
            align-items-center
            pb-5'
                style={{
                    backgroundImage: `url(${patternT})`,
                }}>
                <img src={tarockPattern}
                    alt="tarockPattern"
                    width={140}
                    className='cropped-image-clip-rectangle' />
                <button
                    onClick={() => setShow(true)}
                    className='py-2 px-2 mt-3 rounded-5'
                    style={{
                        width: '80%',
                        fontWeight: '700',
                        fontSize: '16px',
                        backgroundColor: '#49304D',
                        color: '#FFFFFF',
                    }}>
                    Start Testing
                </button>
                <Popup
                    show={show}
                    setShow={setShow}
                    children={
                        <div style={{
                            fontWeight: '500',
                            fontSize: '14px',
                            lineHeight: '17px',
                            color: '#49304D',
                            backgroundColor: '#FFFFFF',
                            margin: 'auto',
                            padding: '1rem',
                            borderRadius: '10px',
                        }}>
                            <p>
                                Stop. Think of yourself in your truest form. Now, answer the questions as honestly and as generally as you can.

                            </p>
                            <p>
                                This is not one of those Buzzfeed quizzes.
                                If you’re stuck, Tarock suggests to ask your best friend next to you for most accurate results.
                            </p>
                            <p>
                                Tarock does not guarantee the correct type result.
                                If self-assessment appears wrong, results will be steered to their natural place by your close peers.
                            </p>
                        </div>
                    }
                />
            </div>

        </div>
    )
}

export default Prep;