export const setLocalStorageItem = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};
