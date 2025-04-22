export async function createProperty(data, csrfToken = '') {
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
      throw new Error(errorData.detail || 'Erro ao criar imóvel.');
    }
  
    return response.json();
  }