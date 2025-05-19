import { useEffect, useState } from "react";
import { getUser } from "@services/authService";
import { getPropertiesByOrganization } from "@services/propertyService";
import { getOrganizationById } from "@services/organizationService";
import PropertiesManager from "@properties/PropertiesManager";

export default function MyProperties() {
  const user = getUser();
  const orgId = user?.organization_ids?.[0];
  const [orgName, setOrgName] = useState("Organização");

  useEffect(() => {
    if (orgId) {
      getOrganizationById(orgId)
        .then(org => setOrgName(org.name))
        .catch(() => {});
    }
  }, [orgId]);

  return (
    <PropertiesManager
      title={`Propriedades da Organização: ${orgName}`}
      fetchProperties={() => getPropertiesByOrganization(orgId)}
      showView={true}
      showEdit={true}
      showDelete={true}
      emptyStateMessage={`Ainda não existem propriedades para ${orgName}.`}
    />
  );
}