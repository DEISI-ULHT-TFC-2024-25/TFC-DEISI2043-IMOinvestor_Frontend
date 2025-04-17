import PropTypes from 'prop-types';
import Slider from 'react-slick';

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0A2647] text-white w-10 h-10 rounded-full items-center justify-center shadow hover:bg-[#133c7b]"
    aria-label="Anterior"
  >
    ◀
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0A2647] text-white w-10 h-10 rounded-full items-center justify-center shadow hover:bg-[#133c7b]"
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

const SliderWrapper = ({
  children,
  className = '',
  itemWidth = 'w-full max-w-xs',
  itemHeight = 'h-[320px]',
  scrollByPage = false,
  slidesToShow = 5,
}) => {
  const settings = {
    centerMode: false,
    centerPadding: '0px',
    slidesToShow,
    slidesToScroll: scrollByPage ? slidesToShow : 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300" />
    ),
    appendDots: dots => (
      <div className="w-full mt-6">
        <ul className="flex justify-center gap-2 [&>li.slick-active>button]:bg-[#0A2647] [&>li.slick-active>button]:shadow-md">
          {dots}
        </ul>
      </div>
    ),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: scrollByPage ? 3 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '40px',
          centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  const wrappedChildren = Array.isArray(children)
    ? children.map((child, i) => (
        <div key={i} className={`px-2 ${itemWidth} ${itemHeight} flex items-stretch`}>
          {child}
        </div>
      ))
    : <div className={`px-2 ${itemWidth} ${itemHeight} flex items-stretch`}>{children}</div>;

  return (
    <div className={`relative w-full ${className}`}>
      <Slider {...settings}>
        {wrappedChildren}
      </Slider>
    </div>
  );
};

SliderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  itemWidth: PropTypes.string,
  itemHeight: PropTypes.string,
  scrollByPage: PropTypes.bool,
  slidesToShow: PropTypes.number,
};

export default SliderWrapper;
