export async function handleDistrictChange({
  newDistrict,
  currentMunicipality,
  loadByDistrict,
  setDistrict,
  setMunicipality,
  setMunicipalities,
}) {
  setDistrict(newDistrict);

  // Load municipalities - pass empty string or null for all municipalities
  const municipios = await loadByDistrict(newDistrict || "");
  
  // Only call setMunicipalities if it's provided
  if (setMunicipalities) {
    setMunicipalities(
      municipios.sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  // If no district is selected, clear municipality
  if (!newDistrict) {
    setMunicipality('');
    return municipios;
  }

  // Check if current municipality is valid for the selected district
  const isStillValid = municipios.some(
    (m) => String(m.id) === String(currentMunicipality)
  );

  if (isStillValid) {
    setMunicipality(String(currentMunicipality));
  } else {
    setMunicipality('');
  }

  return municipios;
}