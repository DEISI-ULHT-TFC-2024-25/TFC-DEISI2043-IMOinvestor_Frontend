import { useState, useEffect, useMemo, useCallback } from 'react';
import { getPropertyMediasByProperty } from '@services/propertyMediaService';

// Custom hook to manage items data separately from UI components
export function useItemsData(fetchItems, listType, initialFilters = {}) {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filters, setFilters] = useState({
    tipo: '', 
    tipologia: '',
    casasBanho: '',
    distrito: '', 
    municipio: '', 
    novaConstrucao: '',
    certificado: '',
    priceRange: [0,2000000],
    areaUtilMin: '', 
    areaUtilMax: '',
    areaBrutaMin: '', 
    areaBrutaMax: '',
    extraInfos: [],
    ...initialFilters
  });

  // Memoize API parameters
  const apiParams = useMemo(() => {
    const params = {};
    
    if (searchTerm.trim()) {
      params.searchTerm = searchTerm.trim(); // Changed from 'search' to 'searchTerm'
    }
    
    if (filters.distrito) params.distrito = filters.distrito;
    if (filters.municipio) params.municipio = filters.municipio;
    if (filters.tipo) params.tipo = filters.tipo;
    if (filters.tipologia) params.tipologia = filters.tipologia;
    if (filters.casasBanho) params.casasBanho = filters.casasBanho;
    if (filters.novaConstrucao) params.novaConstrucao = filters.novaConstrucao;
    if (filters.certificado) params.certificado = filters.certificado;
    
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      params.priceRange = filters.priceRange;
    }
    
    if (filters.areaUtilMin) params.areaUtilMin = filters.areaUtilMin;
    if (filters.areaUtilMax) params.areaUtilMax = filters.areaUtilMax;
    if (filters.areaBrutaMin) params.areaBrutaMin = filters.areaBrutaMin;
    if (filters.areaBrutaMax) params.areaBrutaMax = filters.areaBrutaMax;
    
    if (filters.extraInfos && filters.extraInfos.length > 0) {
      params.extraInfos = filters.extraInfos;
    }
    
    return params;
  }, [filters, searchTerm]);

  // Load items function
  const loadItems = useCallback(async () => {
    try {
      // Set appropriate loading state
      if (isInitialLoad) {
        setLoading(true);
        setFiltering(false);
      } else {
        setLoading(false);
        setFiltering(true);
      }
      setError(null);
      
      const data = await fetchItems(apiParams);
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        setAllItems([]);
        return;
      }
      
      const withMedia = await Promise.all(data.map(async item => {
        // Ensure item has an ID
        if (!item.id) {
          return null;
        }
        
        const prop = listType === 'property' ? item : item.property;
        
        // Ensure property exists and has an ID
        if (!prop || !prop.id) {
          return listType === 'property' ? { ...item, media: [] } : item;
        }
        
        try {
          const media = await getPropertyMediasByProperty(prop.id);
          return listType === 'property'
            ? { ...item, media }
            : { ...item, property: { ...prop, media } };
        } catch (mediaError) {
          return listType === 'property'
            ? { ...item, media: [] }
            : { ...item, property: { ...prop, media: [] } };
        }
      }));
      
      // Filter out null items
      const validItems = withMedia.filter(item => item !== null);
      setAllItems(validItems);
      
      // Mark initial load as complete
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (e) {
      console.error('Error loading items:', e);
      setError(e);
      setAllItems([]);
    } finally {
      setLoading(false);
      setFiltering(false);
    }
  }, [fetchItems, listType, apiParams, isInitialLoad]);

  // Load items when dependencies change
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Remove item function
  const removeItem = useCallback((itemId) => {
    setAllItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  return {
    allItems,
    loading,
    filtering,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    loadItems,
    removeItem,
    apiParams
  };
}