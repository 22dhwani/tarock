function FeedCard(props) {
    const { image, title, author, time } = props;
    return (
        <div className="d-flex flex-column mb-2 mt-3 mx-auto" style={{ width: 'fit-content', cursor: 'pointer' }}>
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
                    <p className="card-text text-left" >By {author}</p>
                    <p className="card-text" style={{ color: '#B6ACB8', marginLeft: '5em' }} >{time}h ago</p>
                </div>
            </div>
      
    )
}

export default FeedCard;