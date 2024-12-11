import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import images from "../assets/images/image";
import Btn from './Button';


function CreateSlide(image) {
  return (
    <Carousel.Item className="carouselItem" key={image.id}> 
        <img className="d-block w-100" src={image.ImgUrl} alt="sddd" />
        <Carousel.Caption className='carouselText'>
          <h3 className='heroHead'>{image.head}</h3>
          <p>{image.para}</p>
          <Btn
            name="Shop Now" 
          />
        </Carousel.Caption>
      </Carousel.Item>
  )
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel  activeIndex={index} onSelect={handleSelect} fade>
      {images.map(CreateSlide)}
    </Carousel>
  );
}

export default ControlledCarousel;