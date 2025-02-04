import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData("/health");
        setData(result);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold">Bem-vindo ao IMOinvestor</h1>
      <div className="text-red-500 text-2xl font-bold mt-4">Tailwind test</div>
      <pre className="bg-gray-800 p-4 rounded-md mt-4">
        {data ? JSON.stringify(data, null, 2) : "Carregando dados..."}
      </pre>
    </div>
  )
}

export default Home;