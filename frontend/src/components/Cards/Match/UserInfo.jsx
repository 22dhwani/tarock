import male from '../../../assets/avatarMale.svg';
import female from '../../../assets/avatarFemale.svg';
function UserInfo({ cardData, user }) {
    return (
        <>
            <div className='d-flex gap-3 justify-content-center align-items-center mx-3'>
                <img src={
                    user.gender === 'Male' ? male : female
                } alt='user1' width='70px' style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }} />

                <div className='d-flex flex-column gap-2'>
                    <span style={{
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '22px',
                        color: 'white',
                    }}>
                        {user.name}
                    </span>

                    <span style={{
                        fontWeight: '700',
                        fontSize: '14px',
                        color: 'white',
                        lineHeight: '17px',
                    }}>
                        {cardData.description.STRENGTHS.replaceAll(';', ',')}.
                    </span>
                </div>
            </div>
        </>
    )
}

export default UserInfo;