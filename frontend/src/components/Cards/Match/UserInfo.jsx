import { getAvatar } from '../../../utils/userUtil';

function UserInfo({ cardData, user }) {
    return (
        <>
            <div className='d-flex gap-3 justify-content-center align-items-center mx-3'>
                <img src={
                    getAvatar(user.avatar_index)
                } alt='avatar' width='70px' style={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                }} />

                <div className='d-flex flex-column gap-2'>
                    <span style={{
                        fontWeight: '400',
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: 'white',
                    }}>
                        {user.name}
                    </span>
                    <p
                        className='m-0'
                        style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '16px',
                        }}
                    >
                        {cardData.personality_category}
                    </p>

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