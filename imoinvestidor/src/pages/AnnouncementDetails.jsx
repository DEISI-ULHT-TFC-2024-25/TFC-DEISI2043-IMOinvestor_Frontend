import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, MapPin, BedDouble, Bath, Ruler, Phone, Mail, Calendar as CalendarIcon } from 'lucide-react';
import { fetchAnnouncementById, fetchAnnouncements } from '@services/announcementService';
import AnnouncementsList from '@announcements/AnnouncementsList';

export default function AnnouncementDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAnnouncementById(id);
        setAnnouncement(data);

        // fetch “similar” by same property
        const sims = await fetchAnnouncements({ property: data.property.id });
        // remove the current announcement
        setSimilar(sims.filter((a) => a.id !== data.id));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading || !announcement) {
    return (
      <div className="p-6 text-center text-gray-600">Carregando anúncio…</div>
    );
  }

  const { property, price } = announcement;
  const images = property.media || [];
  const mainImg = images[0]?.url || images[0]?.file || '';
  const thumbImgs = images.slice(1, 4);
  const moreCount = images.length - 4;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title & Price */}
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-2xl text-gray-700 mt-1">€{parseFloat(price).toLocaleString()}</p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-4">
        <img
          src={mainImg}
          alt={property.title}
          className="col-span-2 row-span-2 w-full h-[400px] object-cover rounded-lg"
        />
        {thumbImgs.map((img, i) => (
          <img
            key={i}
            src={img.url || img.file}
            alt={`Thumbnail ${i+1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
        {moreCount > 0 && (
          <div className="relative w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xl font-semibold text-gray-600">
            +{moreCount}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 space-y-1">
          <h2 className="text-xl font-semibold">Location</h2>
          <p className="flex items-center gap-2 text-gray-700">
            <Home /> {property.street}, {property.district}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <MapPin /> {property.distanceToCenter ?? '—'} km from city center
          </p>
        </div>
        <div>
          {/* placeholder for map or extra image */}
          <div className="w-full h-48 bg-gray-100 rounded-lg" />
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">This place offers</h2>
        <ul className="grid grid-cols-2 gap-4 text-gray-700">
          <li className="flex items-center gap-2"><BedDouble /> {property.tipologia} Bedrooms</li>
          <li className="flex items-center gap-2"><Ruler /> {property.areaUtil} m²</li>
          <li className="flex items-center gap-2"><Bath /> {property.numero_casas_banho} Bathrooms</li>
          {property.garage && <li className="flex items-center gap-2"><Home /> Garage</li>}
          {property.garden && <li className="flex items-center gap-2"><Home /> Garden</li>}
          {property.pool && <li className="flex items-center gap-2"><Home /> Swimming Pool</li>}
        </ul>
      </div>

      {/* Agent & Actions */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div>
            <p className="font-semibold">{announcement.created_by}</p>
            <p className="text-gray-500">Real Estate Agency</p>
          </div>
          <div className="flex-1" />
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
            Close
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="col-span-1 bg-green-500 text-white py-2 rounded">Call Agent</button>
          <button className="col-span-1 bg-blue-600 text-white py-2 rounded">Request Details</button>
          <button className="col-span-3 bg-gray-800 text-white py-2 rounded mt-2">Schedule a Visit</button>
        </div>
      </div>

      {/* Similar Listings */}
      {similar.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Similar to this property</h2>
          <AnnouncementsList
            announcements={similar}
            showView={true}
            showEdit={false}
            showDelete={false}
          />
        </div>
      )}
    </div>
  );
}