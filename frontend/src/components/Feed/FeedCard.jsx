
function FeedCard(props){
    return (
        <div className="d-flex flex-column mx-auto" style={{width:'fit-content', cursor:'pointer'}}>
            <p style={{
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '14px',
                paddingLeft: '12px',
               
            }}>
                {props.title}
            </p>

            <div className="pt-2">
                <img src={props.image} alt="image" height='200px' width='335px' />
            </div>
        </div>
    )
}

export default FeedCard;