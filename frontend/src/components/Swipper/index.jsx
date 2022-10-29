import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Swipper(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} >
        {
            props.data && props.data.map((item, index) => {
                return (
                    <Carousel.Item key={index}>
                        {item}
                    </Carousel.Item>
                )
            })
        }
    </Carousel>
  );
}

export default Swipper;