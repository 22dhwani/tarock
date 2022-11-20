function FeedCard(props) {
    const { image, title, author, time }=props;
    return (
        <div className="d-flex flex-column mx-auto mb-2" style={{ width: 'fit-content', cursor: 'pointer' }}>
            <div className='mb-3' >
                <div  width='450px'></div>
                <img src={image} alt="image"  style={{width: '100%',maxWidth: '100%', objectFit: 'cover'}}/>
            </div>
            <div className='mx-4'>
            <h5 
            style={{
                fontFamily:'Montserrat',
                fontWeight:'900',
                color:'#49304D',
                lineHeight:'30px',
                textAlign:'left'
            }}
            className=' font-weight-bold' >{title}</h5>
            <div className='d-flex justify-content-start'>
            <p className="card-text text-left" >By {author}</p>
            <p className="card-text" style={{color:'#B6ACB8', marginLeft:'5em'}} >{time}h ago</p>
            </div>
            </div>
            

        </div>
    )
}

export default FeedCard;