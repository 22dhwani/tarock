import FeedCard from './FeedCard'
import { Link } from "react-router-dom";
import { feeds } from './contentData'
import styles from './Feed.module.css'
import ComingSoonModal from '../Modal/ComingSoonModal';
import { useState } from 'react';
function Feeds({ header }) {

    const [openModal, setOpenModal] = useState(false)

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
            <div className="d-flex flex-column justify-content-center mx-auto" style={{ width: 'fit-content', cursor: 'pointer' }}>
                {/* <Link to='/test' style={{ textDecoration: 'none' }}> */}
                <div className="py-2" style={{ textAlign: 'center' }} onClick={() => setOpenModal(true)}>
                    <img src={header} alt="image" width='100%' />
                </div>
                {/* </Link> */}
                {feedCards}
            </div>
        </>
    )
}

export default Feeds;