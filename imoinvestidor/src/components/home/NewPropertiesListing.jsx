import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PropertyCard } from '@properties/PropertyCard';

const NewPropertiesListing = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const allProperties = [...Array(8)].map((_, i) => ({
    title: `Imóvel ${i + 1}`,
    tipologia: 4,
    casasBanho: 2,
    areaUtil: 126,
    price: "600.000 €",
    roi: "5",
    onClick: () => isLoggedIn ? navigate(`/listagem/${i}`) : navigate('/login'),
    hidePrice: !isLoggedIn,
    isFavorited: i % 2 === 0,
    onToggleFavorite: () => console.log(`Favorito toggle no imóvel ${i + 1}`),
  }));

  const properties = isMobile ? allProperties.slice(0, 3) : allProperties;

  return (
    <section className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-semibold text-[#0A2647]">Novidades Imóveis</h3>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => isLoggedIn ? navigate('/listagens') : navigate('/login')}
        >
          Ver mais
        </button>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-4">
          {properties.map((props, i) => (
            <PropertyCard
              key={i}
              {...props}
              className="w-full h-[300px]"
              imageClassName="h-36"
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {properties.map((props, i) => (
            <PropertyCard
              key={i}
              {...props}
              className="w-full h-[360px]"
              imageClassName="h-40"
            />
          ))}
        </div>
      )}
    </section>
  );
};

NewPropertiesListing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NewPropertiesListing;
