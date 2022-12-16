import FeedCard from './FeedCard'
import { Link } from "react-router-dom";
import { feeds } from './contentData'
import styles from './Feed.module.css'
import ComingSoonModal from '../Modal/ComingSoonModal';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context';
function Feeds({ header }) {

    const { userData } = useContext(GlobalContext);
    const [openModal, setOpenModal] = useState(false)
    const [user, setUser] = useState('');


    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/${userData.id}?userType=${userData.type}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setUser(data[0]);
                }
            })
            .catch(err => console.log(err.message));
    }, []);

    const feedCards = feeds.map((item, i) =>
        <FeedCard
            key={i}
            image={item.image}
            title={item.title}
            author={item.author}
            time={item.time}
            style={{ width: '100%' }}
            link={item.link}
        />
    )
    return (
        <>
            <ComingSoonModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <div className="d-flex flex-column justify-content-center mx-auto mb-5" style={{ width: 'fit-content', cursor: 'pointer' }}>
                {/* <Link to='/test' style={{ textDecoration: 'none' }}> */}
                {/* <div className="py-2" style={{ textAlign: 'center' }} onClick={() => setOpenModal(true)}>
                    <img src={header} alt="image" width='100%' />
                </div> */}
                {/* </Link> */}
                <h2 className='m-0' style={{ fontSize: '26px', fontWeight: '700' }}>Good day, {user.name}!</h2>
                <p className='' style={{}}>Here is a to-do list to boost your day.</p>

                <p className='m-0 py-3' style={{fontSize: '18px', fontWeight: '600'}}>Explore</p>
                {feedCards}
            </div>
        </>
    )
}

export default Feeds;