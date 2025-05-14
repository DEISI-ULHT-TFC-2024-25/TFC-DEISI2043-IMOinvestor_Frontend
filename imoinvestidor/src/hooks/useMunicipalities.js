import { useState } from "react";

export default function useMunicipalities() {
  const [municipalities, setMunicipalities] = useState([]);

  const loadByDistrict = async (districtId) => {
    try {
      const res = await fetch("/api/municipality/municipalityByDistrict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district_id: Number(districtId) }),
      });
      const data = await res.json();
      setMunicipalities(data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      console.error("Erro ao carregar municípios:", err);
      setMunicipalities([]);
    }
  };

  return { municipalities, loadByDistrict };
}
