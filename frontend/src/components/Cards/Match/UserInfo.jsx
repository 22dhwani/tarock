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

                <div className=''>
                    <span
                        style={{
                            fontWeight: '400',
                            fontSize: '12px',
                        }}
                    >
                        {user.name}
                    </span>
                    <p
                        className='m-0 pb-1'
                        style={{
                            fontWeight: '700',
                            fontSize: '16px',
                        }}
                    >
                        {cardData.personality_category}
                    </p>

                    <div className='w-100 d-flex flex-wrap gap-2 pt-2'>
                        {cardData.description.STRENGTHS.split(';').map((value, index) => {
                            return (
                                <span
                                    key={index}
                                    className="rounded-pill"
                                    style={{
                                        background: 'rgba(255,255,255,0.25)',
                                        padding: "2px 10px",
                                        fontSize: '12px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {value}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfo;