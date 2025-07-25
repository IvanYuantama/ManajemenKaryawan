export const updateQuery = (key, value) => {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
};

export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || "";
};
