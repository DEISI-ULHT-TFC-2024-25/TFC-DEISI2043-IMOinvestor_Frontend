import { getProperties } from "@services/propertyService";
import PropertiesManager from "@properties/PropertiesManager";

export default function AllPropertiesPage() {
  return (
    <PropertiesManager
      title="Todas as Propriedades"
      fetchProperties={getProperties}
      showView={true}
      showEdit={false}
      showDelete={true}
      emptyStateMessage="Não existem propriedades registadas."
    />
  );
}