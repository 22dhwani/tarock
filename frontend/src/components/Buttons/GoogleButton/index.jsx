import google from '../../../assets/signin/google.svg';

export default function GoogleButton({handleGoogleSignin, text}) {
    return (
        <div className='bg-light py-3 mx-5 mt-4 rounded-4 text-center d-flex align-items-center gap-4 float justify-content-center'
            style={{ cursor: 'pointer' }}
            onClick={handleGoogleSignin}>
            <img src={google} alt="google" width={'24px'} height={'24px'} />
            <span style={{
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '19px',
                color: '#000000',
                opacity: '0.54',
            }}>{text} with Google</span>
        </div>
    )
}