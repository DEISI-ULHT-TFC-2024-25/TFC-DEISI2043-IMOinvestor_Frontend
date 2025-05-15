export async function handleDistrictChange({
  newDistrict,
  currentMunicipality,
  loadByDistrict,
  setDistrict,
  setMunicipality,
}) {
  setDistrict(newDistrict);

  const municipios = await loadByDistrict(newDistrict);

  const isStillValid = municipios.some(
    (m) => String(m.id) === String(currentMunicipality)
  );

  if (isStillValid) {
    setMunicipality(String(currentMunicipality));
  }
}
