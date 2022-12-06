import FeedCard from './FeedCard'
import { Link } from "react-router-dom";
import { feeds } from './contentData'
import styles from './Feed.module.css'
function Feeds({ header }) {

    const feedCards = feeds.map((item, i) =>
            <FeedCard
                key={i}
                image={item.image}
                title={item.title}
                author={item.author}
                time={item.time}
                style={{ width: '100%' }}
            />
    )
    return (
        <div className="d-flex flex-column justify-content-center mx-auto" style={{ width: 'fit-content', cursor: 'pointer' }}>
            <Link to='/test' style={{ textDecoration: 'none' }}>
                <div className="p-2 " style={{ textAlign: 'center' }}>
                    <img src={header} alt="image" width='100%' />
                </div>
            </Link>
            {feedCards}
        </div>
    )
}

export default Feeds;