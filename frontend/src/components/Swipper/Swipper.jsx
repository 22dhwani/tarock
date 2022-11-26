import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Swipper.css'
function Swipper(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className='gap-3'>
      {
        props.data && props.data.map((item, index) => {
          return (
            <Carousel.Item key={index} className='px-2'>
              {item}
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default Swipper;