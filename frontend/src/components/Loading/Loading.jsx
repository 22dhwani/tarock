import logo from '../../assets/tarockLogo.svg';

const Loading = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <img src={logo} alt="logo" height='23.83px' width='120px' className='mb-5 mx-auto' />
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}

export default Loading;