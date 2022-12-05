import patternTarockBlue from '../../assets/patternTarockBlue.svg';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';
import { useState } from 'react';
import { useEffect } from 'react';
export default function GenCard(props) {
    const [userColor, setUserColor] = useState('#3069B3');
    const [matchedColor, setMatchedColor] = useState('#3069B3');
    let userPattern;
    //import and set the pattern of the card

    function assignColor(quadra, setter) {
        if (quadra === 'Alpha') {
            setter('#3069B3');
        } else if (quadra === 'Beta') {
            setter('#EBBD45');
        } else if (quadra === 'Gamma') {
            setter('#69C7BF');
        } else if (quadra === 'Delta') {
            setter('#BB6BD9');
        }
    }
    useEffect(() => {
        assignColor(props.userQuadra, setUserColor);
        assignColor(props.matchedQuadra, setMatchedColor);
    }, [2]);

    return (
        <div className='d-flex flex-column my-3 '>
            <div style={{
                backgroundImage: props.cardType == 'match' ? `linear-gradient(${userColor},${matchedColor})` : `url(${patternTarockBlue})`,
                backgroundColor: props.cardType == 'match' ? '' : userColor,
                backgroundRepeat: 'no-repeat',
                width: '9rem',
                height: '14.375rem',
                backgroundSize: 'cover',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {props.cardType !== 'match' ? <img className='rounded-circle'
                    src={props.avatar_index ? male : female}
                    alt="avatar"
                    style={{ backgroundColor: '#FFFFFF' }}
                />
                    :
                    <div className='d-flex flex-column gap-5 align-items-center'>
                        <img src={male} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
                        <img src={female} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
                    </div>
                }

            </div>
            <div className='col-12 d-flex justify-content-center mt-2' style={{
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#49304D',
            }}>
                {props.cardType == 'match' ? <p className='text-center'>
                    Match Card<br></br>
                    <span style={{fontWeight:'600'}}>with {props.matchedUserName.split(' ')[0]}</span>
                </p>
                    :
                    'Tarock Card'}
            </div>
        </div>
    )
}