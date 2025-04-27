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
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedBaths, setSelectedBaths] = useState([]);
  
  return (
    <>
      <HeroSearch
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
        selectedBaths={selectedBaths}
        setSelectedBaths={setSelectedBaths}
      />

      <RecentSearchs />

      <UserActionCards />
      
      <NewPropertiesListing  isLoggedIn={isLoggedIn}/>

      <TeamSection />
      
      <OrganizationsSection />

      <AboutApp />

      <SoldBlog />
    </>
  );
}

