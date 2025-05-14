import PropTypes from "prop-types";

export default function OrganizationInfo({ organization }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#0A2647] mb-4">Organização</h2>
      {organization ? (
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <p className="font-semibold text-lg">{organization.name}</p>
          <p className="text-sm text-gray-600">{organization.city}, {organization.email}</p>
        </div>
      ) : (
        <p className="text-gray-500">Nenhuma organização associada.</p>
      )}
    </div>
  );
}

OrganizationInfo.propTypes = {
  organization: PropTypes.object,
};
