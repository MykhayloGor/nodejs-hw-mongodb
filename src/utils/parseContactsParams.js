const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
  };
  
  const parseIsFavourite = (isFavourite) => {
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
    return undefined;
  };
  
  export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
  
    const parsedSortOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)
      ? sortOrder
      : SORT_ORDER.ASC;
  
    const parsedSortBy = typeof sortBy === 'string' ? sortBy : '_id';
  
    return {
      sortBy: parsedSortBy,
      sortOrder: parsedSortOrder,
    };
  };
  
  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;
    const filter = {};
  
    if (type && typeof type === 'string') {
      filter.contactType = type;
    }
  
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    if (parsedIsFavourite !== undefined) {
      filter.isFavourite = parsedIsFavourite;
    }
  
    return filter;
  };