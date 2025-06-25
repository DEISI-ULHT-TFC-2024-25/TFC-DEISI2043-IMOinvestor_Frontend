import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyCard } from "@properties/PropertyCard";
import DeleteButton from "@common/DeleteButton";

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
};

export default function PropertiesList({ 
  properties, 
  onDelete, 
  onView, 
  showView, 
  showEdit,
  onPropertySelect = null,
  selectionMode = false,
  selectedProperty = null
}) {
  const navigate = useNavigate();
  const isMobile = useScreenSize();
  
  const [selectedPropertyId, setSelectedPropertyId] = useState(selectedProperty?.id || null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = isMobile ? 4 : 6;
  
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);
  
  useEffect(() => {
    setSelectedPropertyId(selectedProperty?.id || null);
  }, [selectedProperty]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [properties.length, itemsPerPage]);
  
  const handlePropertyClick = (property) => {
    if (selectionMode && onPropertySelect) {
      setSelectedPropertyId(property.id);
      onPropertySelect(property);
    }
  };
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };
  
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum imóvel encontrado
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
        {currentProperties.map(property => {
          const isSelected = selectionMode && selectedPropertyId === property.id;
          
          return (
            <PropertyCard
              key={property.id}
              title={property.name}
              typology={property.typology ?? "T?"}
              num_wc={property.num_wc ?? "0"}
              net_area={property.net_area}
              price={`${property.min_price?.toLocaleString()} € – ${property.max_price?.toLocaleString()} €`}
              street={property.street}
              district={String(property.district_name)}
              onView={showView ? () => onView && onView(property) : undefined}
              onEdit={showEdit ? () => navigate(`/edit-property/${property.id}`) : undefined}
              showView={showView}
              showEdit={showEdit}
              selectionMode={selectionMode}
              onSelect={selectionMode ? () => handlePropertyClick(property) : undefined}
              isSelected={isSelected}
              actions={
                !selectionMode && onDelete && (
                  <DeleteButton
                    onClick={e => { e.stopPropagation(); onDelete(property); }}
                    title="Apagar imóvel"
                    size={22}
                  />            
                )
              }
              property={property}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center space-y-4 pt-6">
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, properties.length)} de {properties.length} imóveis
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-[#CFAF5E] hover:text-[#CFAF5E]'
              }`}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex space-x-1">
              {getPageNumbers().map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#CFAF5E] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#CFAF5E] border border-gray-200 hover:border-[#CFAF5E]'
                  }`}
                  type="button"
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-[#CFAF5E] hover:text-[#CFAF5E]'
              }`}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

PropertiesList.propTypes = {
  properties: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  onPropertySelect: PropTypes.func,
  selectionMode: PropTypes.bool,
  selectedProperty: PropTypes.object,
};