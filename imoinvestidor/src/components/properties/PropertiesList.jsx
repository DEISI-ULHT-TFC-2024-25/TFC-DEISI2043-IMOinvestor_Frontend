import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { PropertyCard } from "@properties/PropertyCard";
import DeleteButton from "@common/DeleteButton";

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
  const [selectedPropertyId, setSelectedPropertyId] = useState(selectedProperty?.id || null);
  
  // Update internal state when selectedProperty prop changes
  useEffect(() => {
    setSelectedPropertyId(selectedProperty?.id || null);
  }, [selectedProperty]);
  
  const handlePropertyClick = (property) => {
    if (selectionMode && onPropertySelect) {
      setSelectedPropertyId(property.id);
      onPropertySelect(property);
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
      {properties.map(property => {
        const isSelected = selectionMode && selectedPropertyId === property.id;
        
        return (
          <div
            key={property.id}
            className={`relative ${selectionMode ? 'cursor-pointer' : ''} ${
              isSelected 
                ? 'ring-2 ring-[#CFAF5E] shadow-lg shadow-yellow-100 transform scale-[1.02]' 
                : selectionMode 
                ? 'hover:ring-1 hover:ring-[#CFAF5E] hover:shadow-md' 
                : ''
            } transition-all duration-300 ease-out`}
            onClick={() => handlePropertyClick(property)}
          >
            {isSelected && (
              <div className="absolute -top-3 -right-3 z-10 bg-[#CFAF5E] text-[#0A2647] rounded-full p-2 shadow-lg border-2 border-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            
            <PropertyCard
              title={property.name}
              tipologia={property.tipologia ?? "T?"}
              casasBanho={property.numero_casas_banho ?? "0"}
              areaUtil={property.area_util}
              price={`${property.preco_minimo?.toLocaleString()} € – ${property.preco_maximo?.toLocaleString()} €`}
              street={property.street}
              district={String(property.district)}
              onView={showView ? () => onView && onView(property) : undefined}
              onEdit={showEdit ? () => navigate(`/edit-property/${property.id}`) : undefined}
              showView={showView}
              showEdit={showEdit}
              className={`transition-all duration-300 ${
                isSelected ? 'border-[#CFAF5E]' : ''
              }`}
              actions={
                !selectionMode && onDelete && (
                  <DeleteButton
                    onClick={e => { e.stopPropagation(); onDelete(property); }}
                    title="Apagar imóvel"
                    size={22}
                  />            
                )
              }
            />
          </div>
        );
      })}
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