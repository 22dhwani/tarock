import FeedCard from './FeedCard'
import { Link } from "react-router-dom";
import { feeds } from './contentData'
import styles from './Feed.module.css'
import ComingSoonModal from '../Modal/ComingSoonModal';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context';
import exploreCard1 from '../../assets/explore/explore_card_1.png'
import exploreCard2 from '../../assets/explore/explore_card_2.png'
import exploreCard3 from '../../assets/explore/explore_card_3.png'
import exploreCard4 from '../../assets/explore/explore_card_4.png'
import MyCardModal from '../Modal/MyCardModal';

function Feeds({ header }) {

    const { userData } = useContext(GlobalContext);
    const [openModal, setOpenModal] = useState(false)
    const [openMyModal, setOpenMyModal] = useState(false)
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

            <MyCardModal
                openModal={openMyModal}
                setOpenModal={setOpenMyModal}
            />
            <div className="d-flex flex-column justify-content-center mx-auto mb-5" style={{ width: 'fit-content', color: '#49304D' }}>

                <div className="" style={{ width: '350px' }}>
                    <h2 className='m-0' style={{ fontSize: '26px', fontWeight: '700' }}>Good day, {user?.name?.trim().split(' ')[0]}!</h2>
                    <p className='mb-4' style={{ fontWeight: '500' }}>Here is a to-do list to boost your day.</p>

                    <div className="d-flex w-100 overflow-hidden gap-3">
                        <div className="d-flex flex-column gap-3 w-100">
                            <img src={exploreCard1} width="100%" onClick={() => setOpenModal(true)} className="cursor-pointer" />
                            <img src={exploreCard3} width="100%" onClick={() => setOpenMyModal(true)} className="cursor-pointer" />
                        </div>
                        <div className="d-flex flex-column gap-3 w-100">
                            <img src={exploreCard2} width="100%" onClick={() => setOpenModal(true)} className="cursor-pointer" />
                            <img src={exploreCard4} width="100%" />
                        </div>
                    </div>
                </div>

                <p className='m-0 pt-4 pb-1' style={{ fontSize: '18px', fontWeight: '600' }}>Explore</p>
                {feedCards}
            </div>
        </>
    )
}

export default Feeds;