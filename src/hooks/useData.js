import { useState, useEffect } from 'react';

/**
 * Custom hook to manage fetching live data while providing an immediate local fallback.
 * @param {Function} fetcher - The async DataService function to fetch data.
 * @param {any} localFallback - The initial local static JSON data.
 * @param  {...any} args - Optional extra arguments to pass to the fetcher (e.g., for Studio which takes two local fallbacks).
 */
export function useData(fetcher, localFallback = null, ...args) {
  const [data, setData] = useState(localFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetcher(localFallback, ...args)
      .then((result) => {
        if (mounted && result) {
          setData(result);
        }
      })
      .catch((err) => {
        console.error("useData hook: Failed to fetch live data, falling back to local.", err);
      })
      .finally(() => {
        if (mounted) {
          // Add a tiny delay for smoother UI transition
          setTimeout(() => setLoading(false), 400);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}
