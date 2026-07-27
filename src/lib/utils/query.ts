import queryString from 'query-string';

export function parseQueryParams(search: string): Record<string, unknown> {
  return queryString.parse(search, { arrayFormat: 'none' });
}

export function buildQueryString(params: Record<string, unknown>): string {
  return queryString.stringify(params, { skipNull: true, skipEmptyString: true, arrayFormat: 'none' });
}

export function updateQueryParams(currentQuery: Record<string, unknown> | string, newParams: Record<string, unknown>): string {
  const parsed = typeof currentQuery === 'string' ? parseQueryParams(currentQuery) : currentQuery;
  const merged = { ...parsed, ...newParams };
  return queryString.stringify(merged, { skipNull: true, skipEmptyString: true, arrayFormat: 'none' });
}

export function removeQueryParam(currentQuery: Record<string, unknown> | string, key: string, valueToRemove?: string): string {
  const query = typeof currentQuery === 'string' ? { ...parseQueryParams(currentQuery) } : { ...currentQuery };
  
  if (valueToRemove !== undefined && query[key]) {
    const currentVal = query[key];
    if (Array.isArray(currentVal)) {
      const filtered = (currentVal as string[]).filter((v) => v !== valueToRemove);
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

