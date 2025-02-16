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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-md">
        Bem-vindo ao IMOinvestor
      </h1>

      <pre className="bg-gray-800 p-6 rounded-md mt-6 shadow-md max-w-2xl w-full text-left">
        {data ? JSON.stringify(data, null, 2) : "Carregando dados..."}
      </pre>
    </div>
  );
}

export default Home;
