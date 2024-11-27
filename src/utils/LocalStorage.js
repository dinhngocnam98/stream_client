export function saveData(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

export function getData(key, defaultValue = null) {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return defaultValue;
  }
}

export function saveDataWithExpiry(key, value, expiryInHours = 2) {
  const now = new Date();

  const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000;

  const data = {
    value: value,
    expiry: expiryTime,
  };

  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

