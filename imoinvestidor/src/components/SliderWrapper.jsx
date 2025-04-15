import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#0A2647] text-white w-10 h-10 rounded-full items-center justify-center shadow hover:bg-[#133c7b]"
    aria-label="Anterior"
  >
    ◀
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#0A2647] text-white w-10 h-10 rounded-full items-center justify-center shadow hover:bg-[#133c7b]"
    aria-label="Próximo"
  >
    ▶
  </button>
);

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

const SliderWrapper = ({ children, slidesToShow = 3, className = '', centerMode = true }) => {
  const settings = {
    centerMode,
    centerPadding: '60px',
    slidesToShow,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300" />
    ),
    appendDots: dots => (
      <div className="w-full flex justify-center mt-6">
        <div className="inline-block">
          <ul className="flex gap-2 items-center [&>li.slick-active>button]:bg-[#0A2647] [&>li.slick-active>button]:shadow-md">
            {dots}
          </ul>
        </div>
      </div>
    ),
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={`relative ${className}`}>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

SliderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  slidesToShow: PropTypes.number,
  className: PropTypes.string,
  centerMode: PropTypes.bool,
};

export default SliderWrapper;
