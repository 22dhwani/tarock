import patternTarock from '../../assets/patternTarock.svg';
import { useNavigate } from 'react-router-dom';
import './InfoContainer.css'
function InfoContainer(props) {
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column pt-5 gap-5 min-vh-100 justify-content-between" style={{
            background: '#FFFFFF',
        }}>
            <div className='px-5'>
                <h1 style={{
                    fontWeight: '700',
                    fontSize: '28px',
                    lineHeight: '24px',
                    textAlign: 'center',
                    color: '#49304D',
                }}>
                    {props.title}
                </h1>
            </div>
            <div className='px-5'>
                <p style={{
                    color: '#49304D',
                    fontWeight: '600',
                    fontSize: '24px',
                    lineHeight: '36px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}>
                    <mark style={{
                        background: 'transparent',
                        color: '#EC6348'
                    }}>{props.subtitle}<br></br></mark> {props.mainText}
                </p>
            </div>
            <div style={{
                background: `url(${patternTarock})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <button className='my-5 w-100 mx-5 py-2 rounded-5 info-container_button' style={{
                    background: 'transparent',
                    fontWeight: '700',
                    fontSize: '22px'
                }}
                    onClick={() => navigate('/user')}
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default InfoContainer;