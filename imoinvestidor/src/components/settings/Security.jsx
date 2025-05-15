export default function Security() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A2647] mb-10">Segurança</h2>

      <div className="space-y-8">
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-[#0A2647]">Alterar Palavra-passe</p>
            <button className="text-sm text-blue-600 hover:underline">Alterar</button>
          </div>
          <p className="text-sm text-gray-600">Por segurança, recomendamos que atualize a sua palavra-passe regularmente.</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-[#0A2647]">Autenticação em Dois Passos</p>
            <button className="text-sm text-blue-600 hover:underline">Ativar</button>
          </div>
          <p className="text-sm text-gray-600">Adicione uma camada extra de segurança à sua conta ao ativar a autenticação em dois passos.</p>
        </div>
      </div>
    </div>
  );
}
