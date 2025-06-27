import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnnouncementCard } from '@announcements/AnnouncementCard';
import { fetchAnnouncements } from '@services/announcementService';

const NewPropertiesListing = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await fetchAnnouncements({});
        // Limit to 8 announcements for home page, or 3 for mobile
        const limitedData = isMobile ? data.slice(0, 3) : data.slice(0, 8);
        setAnnouncements(limitedData);
      } catch (error) {
        console.error('Error loading announcements:', error);
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, [isMobile]);

  const handleViewAnnouncement = (announcement) => {
    if (isLoggedIn) {
      navigate(`/announcement/${announcement.id}`);
    } else {
      navigate('/login');
    }
  };



  if (loading) {
    return (
      <section className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold text-[#0A2647]">Novidades Imóveis</h3>
        </div>
        <div className="p-6 text-center text-gray-600">A carregar anúncios...</div>
      </section>
    );
  }

  if (!announcements.length) {
    return (
      <section className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold text-[#0A2647]">Novidades Imóveis</h3>
        </div>
        <div className="p-6 text-center text-gray-500">Nenhum anúncio encontrado.</div>
      </section>
    );
  }

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
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onView={handleViewAnnouncement}
              onEdit={undefined}
              showView={true}
              showEdit={false}
              showStatus={false}
              hidePrice={!isLoggedIn}
              className="w-full"
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onView={handleViewAnnouncement}
              onEdit={undefined}
              showView={true}
              showEdit={false}
              showStatus={false}
              hidePrice={!isLoggedIn}
              viewStyle="button"
              className="w-full"
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