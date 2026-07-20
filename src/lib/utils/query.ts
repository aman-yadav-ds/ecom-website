import queryString from 'query-string';

export function updateQueryParams(currentQuery: Record<string, unknown>, newParams: Record<string, unknown>): string {
  const merged = { ...currentQuery, ...newParams };
  return queryString.stringify(merged, { skipNull: true, skipEmptyString: true, arrayFormat: 'none' });
}

export function removeQueryParam(currentQuery: Record<string, unknown>, key: string, valueToRemove?: string): string {
  const query = { ...currentQuery };
  
  if (valueToRemove !== undefined && query[key]) {
    const currentVal = query[key];
    if (Array.isArray(currentVal)) {
      const filtered = currentVal.filter((v) => v !== valueToRemove);
      query[key] = filtered;
      if (filtered.length === 0) {
        delete query[key];
      }
    } else if (currentVal === valueToRemove) {
      delete query[key];
    }
  } else {
    delete query[key];
  }
  
  return queryString.stringify(query, { skipNull: true, skipEmptyString: true, arrayFormat: 'none' });
}

export function parseQueryParams(search: string): Record<string, unknown> {
  return queryString.parse(search, { arrayFormat: 'none' });
}
