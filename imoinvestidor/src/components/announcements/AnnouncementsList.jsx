import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { AnnouncementCard } from '@announcements/AnnouncementCard';
import { Trash2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

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

export default function AnnouncementsList({
  announcements,
  loading = false,
  onDelete,
  onView,
  onEdit,
  showView = true,
  showEdit = true,
  showStatus = true,
  selectionMode = false,
  onAnnouncementSelect,
  selectedAnnouncement,
  viewStyle = "icon",
}) {
  const isMobile = useScreenSize();
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(selectedAnnouncement?.id || null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = isMobile ? 4 : 6;
  
  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = announcements.slice(startIndex, endIndex);

  useEffect(() => {
    setSelectedAnnouncementId(selectedAnnouncement?.id || null);
  }, [selectedAnnouncement]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [announcements.length, itemsPerPage]);

  const handleAnnouncementClick = (announcement) => {
    if (selectionMode && onAnnouncementSelect) {
      setSelectedAnnouncementId(announcement.id);
      onAnnouncementSelect(announcement);
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

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center px-4 py-2 text-gray-600">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#CFAF5E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          A carregar anúncios...
        </div>
      </div>
    );
  }

  if (!announcements?.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum anúncio encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
        {currentAnnouncements.map((announcement) => {
          const isSelected = selectionMode && selectedAnnouncementId === announcement.id;
          
          return (
            <div
              key={announcement.id}
              onClick={() => handleAnnouncementClick(announcement)}
              className={`relative transition-all duration-300 ease-out ${
                selectionMode 
                  ? 'cursor-pointer' 
                  : ''
              }`}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 z-20 bg-[#CFAF5E] text-white rounded-full p-1.5 shadow-lg border-2 border-white">
                  <Check className="h-3 w-3" />
                </div>
              )}
              
              {selectionMode && (
                <div className={`absolute -inset-1 rounded-xl pointer-events-none transition-all duration-300 ${
                  isSelected 
                    ? 'ring-2 ring-[#CFAF5E] ring-offset-2 ring-offset-white shadow-lg' 
                    : 'hover:ring-1 hover:ring-[#CFAF5E]/30 hover:ring-offset-1 hover:ring-offset-white'
                }`} />
              )}
              
              <div className={`transition-all duration-300 ${
                selectionMode && isSelected ? 'transform scale-[1.02]' : ''
              } ${
                selectionMode ? 'hover:transform hover:scale-[1.01]' : ''
              }`}>
                <AnnouncementCard
                  announcement={announcement}
                  onView={showView ? () => onView?.(announcement) : undefined}
                  onEdit={showEdit ? () => onEdit?.(announcement) : undefined}
                  showView={showView}
                  showEdit={showEdit}
                  showStatus={showStatus}
                  selectionMode={selectionMode}
                  onSelect={() => onAnnouncementSelect?.(announcement)}
                  isSelected={isSelected}
                  viewStyle={viewStyle}
                  className={`${
                    isSelected ? 'border-[#CFAF5E] shadow-md' : ''
                  }`}
                  actions={
                    !selectionMode && onDelete && (
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onDelete(announcement); 
                        }}
                        title="Eliminar anúncio"
                        className="p-1 rounded-full bg-white bg-opacity-75 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    )
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center space-y-4 pt-6">
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, announcements.length)} de {announcements.length} anúncios
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
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AnnouncementsList.propTypes = {
  announcements: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
  showStatus: PropTypes.bool,
  selectionMode: PropTypes.bool,
  onAnnouncementSelect: PropTypes.func,
  selectedAnnouncement: PropTypes.object,
  viewStyle: PropTypes.oneOf(['icon', 'button']),
};