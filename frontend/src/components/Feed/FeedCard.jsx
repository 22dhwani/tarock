function FeedCard(props) {
    const { image, title, author, time, link } = props;

    const timeConverter = (time) => {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - time;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4);
        const years = Math.floor(months / 12);
        if (hours < 24) {
            if (hours === 1)
                return hours + ' hour ago';
            else
                return hours + ' hours ago';
        } else if (days < 7) {
            if (days === 1)
                return days + ' day ago';
            else
                return days + ' days ago';
        } else if (weeks < 4) {
            if (weeks === 1)
                return weeks + ' week ago';
            else
                return weeks + ' weeks ago';
        } else if (months < 12) {
            if (months === 1)
                return months + ' month ago';
            else
                return months + ' months ago';
        } else {
            if (years === 1)
                return years + ' year ago';
            else
                return years + ' years ago';
        }
    }

    return (
        <div className="d-flex flex-column mb-2 mt-3 mx-auto"
            style={{ width: 'fit-content', cursor: 'pointer' }}
            onClick={() => window.open(link, '_blank')}>
            <img src={image} alt="image" style={{ width: '350px', objectFit: 'cover', height: '200px' }} className='rounded-3' />
            <h5 style={{
                fontWeight: '700',
                color: '#49304D',
                lineHeight: '17px',
                textAlign: 'left',
                fontSize: '14px',
                marginTop: '10px',
                width: '350px'
            }}>
                {title}
            </h5>
            <div className='d-flex justify-content-start'>
                <p className="card-text text-left">By {author}</p>
                <p className="card-text" style={{ color: '#B6ACB8', marginLeft: '5em' }} >
                    {timeConverter(time)}
                </p>
            </div>
        </div>

    )
}

export default FeedCard;