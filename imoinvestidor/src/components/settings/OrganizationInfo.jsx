import PropTypes from "prop-types";

export default function OrganizationInfo({ organization }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2647] mb-10">Organização</h2>
      {organization ? (
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="font-semibold text-lg text-[#0A2647]">{organization.name}</p>
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
