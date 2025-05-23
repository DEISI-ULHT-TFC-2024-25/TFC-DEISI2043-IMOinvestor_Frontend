import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PropertyCard } from "@properties/PropertyCard";
import DeleteButton from "@common/DeleteButton";

export default function PropertiesList({ properties, onDelete, onView, showView, showEdit }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          title={property.name}
          tipologia={property.tipologia ?? "T?"}
          casasBanho={property.numero_casas_banho ?? "0"}
          areaUtil={property.area_util}
          price={`${property.preco_minimo?.toLocaleString()} € – ${property.preco_maximo?.toLocaleString()} €`}
          street={property.street}
          district={String(property.district)}
          onView={() => onView && onView(property)}
          onEdit={() => navigate(`/edit-property/${property.id}`)}
          actions={
            onDelete && (
              <DeleteButton
                onClick={e => { e.stopPropagation(); onDelete(property); }}
                title="Apagar imóvel"
                size={22}
              />            
            )
          }
          showView={showView}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
}

PropertiesList.propTypes = {
  properties: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  showView: PropTypes.bool,
  showEdit: PropTypes.bool,
};