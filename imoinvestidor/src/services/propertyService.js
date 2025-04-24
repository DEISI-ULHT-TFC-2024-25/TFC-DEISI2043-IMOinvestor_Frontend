export async function createProperty(data, csrfToken = '') {
  console.log("Payload:", data);

    const response = await fetch('/api/property/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(csrfToken && { 'X-CSRFTOKEN': csrfToken }),
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Erro na resposta da API:", errorData); 
      throw new Error(
        errorData.detail || JSON.stringify(errorData) || 'Erro ao criar imóvel.'
      );
    }
  
    return response.json();
  }