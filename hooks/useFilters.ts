import { useState, useEffect } from "react";

export const useFilters = function <T extends object>(initialState: T) {
  const [filters, setFilters] = useState<T>(initialState);
  const [querystring, setQuerystring] = useState<string>("");

  useEffect(() => {
    let params = "";
    for (const key in filters) {
      const value = filters[key];
      if (value) {
        params =
          params === "" ? `?${key}=${value}` : params + `&${key}=${value}`;
      }
    }
    setQuerystring(params);
  }, [filters]);

  return {
    filters,
    setFilters,
    querystring,
  };
};
