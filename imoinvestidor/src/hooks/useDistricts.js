import { useState, useEffect } from "react";

export default function useDistricts() {
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const res = await fetch("/api/district/");
        if (!res.ok) throw new Error("Erro HTTP");

        const data = await res.json();
        setDistricts(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error("Erro ao carregar distritos:", err);
        setError("Erro ao carregar distritos");
      } finally {
        setLoading(false);
      }
    };

    loadDistricts();
  }, []);

  return { districts, loading, error };
}
