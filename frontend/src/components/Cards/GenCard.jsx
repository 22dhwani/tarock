import { useState } from 'react';
import { useEffect } from 'react';
import { getAvatar, getCardPattern, getUserMatchLinearColorFromQuadra } from '../../utils/userUtil';

export default function GenCard(props) {
    const [userColor, setUserColor] = useState('#3069B3');
    const [linearColor, setLinearColor] = useState("linear-gradient(180deg, #BB6BD9 0%, #8F4CC4 52.08%, #BB6BD9 100%)");

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
        if (props.cardType == 'match') {
            setLinearColor(getUserMatchLinearColorFromQuadra(props.userQuadra, props.matchedQuadra))
        }
    }, []);

    const cardPattern = getCardPattern(props.userQuadra);

    const getBg = () => {
        if (props.cardType != 'match') {
            return `url(${cardPattern})`;
        }
        return `url("../assets/cards/noise.png"), ${linearColor}`
    }

    return (
        <div>
            <div style={{
                backgroundImage: getBg(),
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
                    width='60px' height='60px'
                />
                    :
                    <div className='d-flex flex-column gap-5 align-items-center'>
                        <img src={getAvatar(props.avatar_index)} className='rounded-circle' 
                        style={{ backgroundColor: '#FFFFFF' }} 
                        width='60px' height='60px'
                        />
                        <img src={getAvatar(props.matchedUserAvartarIndex)} className='rounded-circle' 
                        style={{ backgroundColor: '#FFFFFF' }}
                        width='60px' height='60px' />
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
                    <span style={{fontWeight:'400'}}>with {props.matchedUserName.trim().split(' ')[0]}</span>
                </p>
                    :
                    'Tarock Card'}
            </div>
        </div>
    )
}