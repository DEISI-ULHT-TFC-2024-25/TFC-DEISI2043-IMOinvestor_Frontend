import { fetchProperties } from "@services/propertyService";
import PropertiesManager from "@properties/PropertiesManager";

export default function AdminPropertiesList() {
  return (
    <PropertiesManager
      title="Todas as Propriedades"
      fetchProperties={fetchProperties}
      showView={true}
      showEdit={false}
      showDelete={true}
      emptyStateMessage="Não existem propriedades registadas."
    />
  );
}