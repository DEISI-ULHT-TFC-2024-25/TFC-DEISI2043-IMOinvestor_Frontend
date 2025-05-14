import { useState } from "react";

export default function useMunicipalities() {
  const [municipalities, setMunicipalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadByDistrict = async (districtId) => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "";
      let options = {};

      if (districtId) {
        endpoint = "/api/municipality/municipalityByDistrict/";
        options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ district_id: Number(districtId) }),
        };
      } else {
        endpoint = "/api/municipality/allMunicipalities/";
        options = { method: "GET" };
      }

      const res = await fetch(endpoint, options);
      if (!res.ok) throw new Error("Erro ao carregar municípios");

      const data = await res.json();
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setMunicipalities(sorted);
      return sorted;
    } catch (err) {
      console.error("Erro ao carregar municípios:", err);
      setError("Erro ao carregar municípios");
      setMunicipalities([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { municipalities, loadByDistrict, loading, error };
}
