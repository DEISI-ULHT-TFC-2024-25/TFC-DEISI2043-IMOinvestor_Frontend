import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";
import { PropertyCard } from "@common/PropertyCard";

export default function PropertiesList({ properties, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          title={property.name}
          tipologia={property.tipologia ?? "T?"}
          casasBanho={property.numero_casas_banho ?? "0"}
          areaUtil={property.area_util}
          price={`${property.preco_minimo?.toLocaleString()} € – ${property.preco_maximo?.toLocaleString()} €`}
          street={property.street}
          district={String(property.district)}
          onClick={() => location.href = `/edit-property/${property.id}`}
          actions={
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(property);
              }}
              className="text-red-500 hover:text-red-700 transition"
              title="Apagar"
            >
              <Trash2 size={20} />
            </button>
          }
        />
      ))}
    </div>
  );
}

PropertiesList.propTypes = {
  properties: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};