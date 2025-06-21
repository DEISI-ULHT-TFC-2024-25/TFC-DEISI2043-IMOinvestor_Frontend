import { useEffect, useState } from "react";
import { getUser } from "@services/authService";
import { getPropertiesByOrganization } from "@services/propertyService";
import { getOrganizationById } from "@services/organizationService";
import PropertiesManager from "@properties/PropertiesManager";

export default function MyProperties() {
  const user = getUser();
  const orgId = user?.organization_ids?.[0];
  const [orgName, setOrgName] = useState("Organização");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orgId) {
      getOrganizationById(orgId)
        .then(org => setOrgName(org.name))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (user) {
      setLoading(false);
    }
  }, [orgId, user]);

  if (loading || !user || !orgId) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">A carregar propriedades...</p>
      </div>
    );
  }

  return (
    <PropertiesManager
      title={`Propriedades da Organização: ${orgName}`}
      fetchProperties={(filters) => getPropertiesByOrganization(filters)}
      showView={true}
      showEdit={true}
      showDelete={true}
      emptyStateMessage={`Ainda não existem propriedades para ${orgName}.`}
    />
  );
}