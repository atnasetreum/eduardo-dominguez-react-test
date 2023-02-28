import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  images: string[];
}

const TableImages = ({ images }: Props) => {
  return (
    <Carousel showArrows={true}>
      {images.map((item) => (
        <div key={item}>
          <img src={"/images/" + item} alt="" />
          <p className="legend">{item}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default TableImages;
