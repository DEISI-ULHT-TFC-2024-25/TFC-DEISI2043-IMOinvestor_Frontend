import { useState } from "react";
import useAuth from '@hooks/useAuth';
import { TeamSection } from '@home/TeamSection';
import { SoldBlog } from '@home/SoldBlog';
import { OrganizationsSection } from '@home/OrganizationsSection';
import NewPropertiesListing from '@home/NewPropertiesListing';
import UserActionCards from '@home/UserActionCards';
import HeroSearch from '@home/HeroSearch';
import { RecentSearchs } from '@home/RecentSearches';
import { AboutApp } from '@home/AboutApp';

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filters, setFilters] = useState({
    ordering: "",
    district: "",
    municipality: "",
    price_min: "",
    price_max: "",
    property_type: "",
    nova_construcao: "",
    tipologia: "",
    numero_casas_banho: "",
    certificado_energetico: "",
    area_bruta: "",
    area_util: "",
    
    priceRange: [0, 2000000],
    areaUtilMax: "",
    areaBrutaMax: "",
    extraInfos: [],
    roiMinimo: "",
  });
  
  return (
    <>
      <HeroSearch
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        isLoggedIn={isLoggedIn}
      />

      <RecentSearchs />

      <UserActionCards />
      
      <NewPropertiesListing isLoggedIn={isLoggedIn} />

      <TeamSection />
      
      <OrganizationsSection />

      <AboutApp />

      <SoldBlog />
    </>
  );
}