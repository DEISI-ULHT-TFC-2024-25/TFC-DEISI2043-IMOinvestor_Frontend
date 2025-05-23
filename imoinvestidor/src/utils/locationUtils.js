export async function handleDistrictChange({
  newDistrict,
  currentMunicipality,
  loadByDistrict,
  setDistrict,
  setMunicipality,
  setMunicipalities,
}) {
  setDistrict(newDistrict);

  const municipios = await loadByDistrict(newDistrict);
  setMunicipalities(
    municipios.sort((a, b) => a.name.localeCompare(b.name))
  );

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
