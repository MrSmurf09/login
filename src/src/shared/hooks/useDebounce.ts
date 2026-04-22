import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useDebouncedSearch = (delay = 500) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const debouncedSearch = useRef(
    debounce((value: string) => {
      const params = new URLSearchParams(search);
      if (value) {
        params.set("filter", value);
        params.set("page", "1");
      } else {
        params.delete("filter");
        params.delete("page");
      }
      navigate({ search: `?${params.toString()}` });
    }, delay),
  );

  useEffect(() => {
    return () => debouncedSearch.current.cancel();
  }, []);

  return { onSearch: (value: string) => debouncedSearch.current(value) };
};
