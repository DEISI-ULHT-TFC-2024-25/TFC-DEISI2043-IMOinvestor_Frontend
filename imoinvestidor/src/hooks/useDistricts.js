import { useEffect, useState } from "react";

export default function useDistricts() {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDistricts = async () => {
        try {
        const res = await fetch("/api/district/");
        if (!res.ok) throw new Error("Erro HTTP ao carregar distritos");

        const data = await res.json();
        setDistricts(data.sort((a, b) => a.name.localeCompare(b.name)));
        setFormError(null);
        } catch (err) {
        console.error("Erro ao carregar distritos:", err);
        setFormError("Erro ao carregar distritos. Tente novamente mais tarde.");
        }
    };

    loadDistricts();
    }, []);


  return { districts, loading, error };
}
