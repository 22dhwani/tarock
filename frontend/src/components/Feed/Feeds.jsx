import FeedCard from './FeedCard'
import { Link } from "react-router-dom";
import homeImage1 from '../../assets/homeimage1.svg'
import homeImage2 from '../../assets/homeimage2.svg'
import homeImage3 from '../../assets/homeimage3.svg'

function Feeds({ header }) {
    var feeds = [{
        image:homeImage1,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    }, {
        image:homeImage2,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    }, {
        image:homeImage3,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    }, {
        image:homeImage3,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    }, {
        image:homeImage3,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    }, {
        image:homeImage3,
        title: '5 Things That May Surprise You About Introverted Feeling Personality Types',
        author: 'Carter Lubin',
        time: 8
    },
    ]
    const feedCards = feeds.map(
        (item) => 
        <div className="p-2" style={{ textAlign: 'center' }}>
            <div style={{ width: '100%' }}>
                <FeedCard
                    image={item.image}
                    title={item.title}
                    author={item.author}
                    time={item.time}
                    style={{ width: '100%' }}
                />
            </div>
        </div>
    )
    return (
        <div className="d-flex flex-column justify-content-center mx-auto" style={{ width: 'fit-content', cursor: 'pointer' }}>
            <Link to='/test' style={{ textDecoration: 'none' }}>
                <div className="p-2 " style={{ textAlign: 'center' }}>
                    <img src={header} alt="image" width='100%' />
                </div>
            </Link>
            <hr></hr>
            {feedCards}
            {/* <div className="p-2" style={{ textAlign: 'center' }}>
                <div style={{ width: '100%' }}>
                    <FeedCard
                        image={image}
                        title={title}
                        author={author}
                        time={time}
                        style={{ width: '100%' }}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default Feeds;