import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    const handler = setTimeout(() => {
      fetchTasks({ query, status, page, pageSize })
        .then((data) => {
          if (!ignore) {
            setTasks(data.items);
            setTotal(data.total);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!ignore) {
            setError(err.message);
            setLoading(false);
          }
        });
    }, 300);

    return () => {
      ignore = true;
      clearTimeout(handler);
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
