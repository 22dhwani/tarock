import add from '../../../assets/add.svg';
import './AddCardButton.css';
function AddCardButton() {
    return (
        <div>
            <div className='button1' style={{
                borderRadius: '10px',
                width: '9rem',
                height: '14.375rem',
                border: '1px dashed  #49304D',
                display: 'flex',
            }}>
                <img src={add} alt='add' className='m-auto' />
            </div>
            <div className='col-12 d-flex justify-content-center mt-2' style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '14px',
                color: '#49304D',
            }}>
                Add a new card
            </div>
        </div>
    )
}

export default AddCardButton;