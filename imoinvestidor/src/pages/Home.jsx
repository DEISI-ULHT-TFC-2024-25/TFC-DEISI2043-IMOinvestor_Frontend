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
  
  return (
    <>
      <HeroSearch />

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

