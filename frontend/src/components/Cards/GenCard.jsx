import { useState } from 'react';
import { useEffect } from 'react';
import { getAvatar, getCardPattern } from '../../utils/userUtil';

export default function GenCard(props) {
    const [userColor, setUserColor] = useState('#3069B3');
    const [matchedColor, setMatchedColor] = useState('#3069B3');
    const [centerColor, setCenterColor] = useState('#C0B17B');

    //move to utils
    function assignColor(quadra, setter) {
        if (quadra === 'Alpha') {
            setter('#3069B3');
        } else if (quadra === 'Beta') {
            setter('#F8D045');
        } else if (quadra === 'Gamma') {
            setter('#61C3BB');
        } else if (quadra === 'Delta') {
            setter('#B561D6');
        }
    }
    
    useEffect(() => {
        assignColor(props.userQuadra, setUserColor);
        assignColor(props.matchedQuadra, setMatchedColor);
        if(props.cardType == 'match'){
            if(props.userQuadra == 'Alpha' && props.matchedQuadra == 'Beta' || props.userQuadra == 'Beta' && props.matchedQuadra == 'Alpha'){
                setCenterColor('#C0B17B 23.96%');
            }else if(props.userQuadra == 'Alpha' && props.matchedQuadra == 'Gamma' || props.userQuadra == 'Gamma' && props.matchedQuadra == 'Alpha'){
                setCenterColor('#C0B17B 47.92%'); //to be updated
            }else if(props.userQuadra == 'Alpha' && props.matchedQuadra == 'Delta' || props.userQuadra == 'Delta' && props.matchedQuadra == 'Alpha'){
                setCenterColor('#5E6AA9 40.1%');
            }else if(props.userQuadra == 'Beta' && props.matchedQuadra == 'Gamma' || props.userQuadra == 'Gamma' && props.matchedQuadra == 'Beta'){
                setCenterColor('#AFBE74 23.96');
            }else if(props.userQuadra == 'Beta' && props.matchedQuadra == 'Delta' || props.userQuadra == 'Delta' && props.matchedQuadra == 'Beta'){
                setCenterColor('#BEA074 31.25%');
            }else if(props.userQuadra == 'Gamma' && props.matchedQuadra == 'Delta' || props.userQuadra == 'Delta' && props.matchedQuadra == 'Gamma'){
                setCenterColor('#5EA99B 32.29%');
            }
        }
    }, []);

    const cardPattern = getCardPattern(props.userQuadra);
    return (
        <div className='d-flex flex-column my-3 '>
            <div style={{
                backgroundImage: props.cardType == 'match' ? 
                `linear-gradient(180deg, ${userColor} 0%, ${centerColor}, ${matchedColor} 100%)` : `url(${cardPattern})`,
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
                    src={getAvatar(props.avatar_index)}
                    alt="avatar"
                    style={{ backgroundColor: '#FFFFFF' }}
                />
                    :
                    <div className='d-flex flex-column gap-5 align-items-center'>
                        <img src={getAvatar(props.avatar_index)} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
                        <img src={getAvatar(props.matchedUserAvartarIndex)} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
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
                    <span style={{fontWeight:'400'}}>with {props.matchedUserName.split(' ')[0]}</span>
                </p>
                    :
                    'Tarock Card'}
            </div>
        </div>
    )
}