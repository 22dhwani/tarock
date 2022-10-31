import patternTarockBlue from '../../assets/patternTarockBlue.svg';
import patternWaves from '../../assets/patternWaves.svg';
import male from '../../assets/avatarMale.svg';
import female from '../../assets/avatarFemale.svg';

export default function GenCard(props) {
    let userColor;
    //let userPattern;
        if (props.quadra === 'Alpha') {
            userColor = '#3069B3';
            //userPattern = pattern1;
        } else if(props.quadra === 'Beta') {
            userColor = '#EBBD45';
           // userPattern = pattern;
        } else if(props.quadra === 'Gamma') {
            userColor = '#69C7BF';
            //userPattern = pattern1;
        } else if(props.quadra === 'Delta') {
            userColor = '#BB6BD9';
            //userPattern = pattern;
        }
    
    //const quadraImage = [pattern, pattern1, pattern, pattern1];
    return (
        <div className='d-flex flex-column m-3'>
            <div style={{
                backgroundImage: `url(${props.cardType == 'match' ? patternWaves : patternTarockBlue})`,
                backgroundColor: props.cardType == 'match' ? 'black' : userColor,
                backgroundRepeat: 'no-repeat',
                
                width: '200px',
                height: '300px',
                backgroundSize: 'cover',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {props.avatar_index ? <img className='rounded-circle'
                    src={props.avatar_index ? male : female}
                    alt="male"
                    style={{ backgroundColor: '#FFFFFF'}}
                />
                    :
                    <div className='d-flex flex-column gap-5 align-items-center'>
                        <img src={male} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
                        <img src={female} className='rounded-circle w-75' style={{ backgroundColor: '#FFFFFF' }} />
                    </div>
                }

            </div>
            <div className='col-12 d-flex justify-content-center mt-2' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '14px',
                color: '#49304D',
            }}>
                {props.cardType == 'match' ? 'Match Card' : 'Tarock Card'}
            </div>
        </div>
    )
}