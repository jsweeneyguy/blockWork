import { DerivedIdentityClient } from '@metaplex-foundation/js';
import { useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PageHeading from '../components/PageHeading';
//import ExampleCarouselImage from 'components/ExampleCarouselImage';
const images = [
    "./images/ap_ex.png"
    , "./images/pepe.png"
    , "./images/bulb.png"
]

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <main className="flex flex-col gap-8 items-center padding-100px margin-50px">
    <PageHeading>Gallery</PageHeading>
    <div className="flex flex-row gap-10">
    <div className="box">
    <Carousel useKeyboardArrows={true} width="420px" showArrows showIndicators centerMode dynamicHeight showThumbs>
        {images.map((URL, index) => (
          <div className="slide">
            <img alt="sample_file" src={URL} key={index} />
          </div>
        ))}
      </Carousel>
    </div>
    <div className="flex flex-col gap-8">
    <p className="text-white text-3xl">gucci description homes</p>

    <p className="text-white text-sm"> lil calm ahh description of the piece nun major j vibes yah dig change with the piece</p>
    </div>
    </div>
    </main>
  );
}

export default ControlledCarousel;