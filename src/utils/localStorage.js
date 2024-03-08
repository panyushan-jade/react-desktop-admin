class LocalStorage {
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    getItem(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  
    removeItem(key) {
      localStorage.removeItem(key);
    }
  
    clear() {
      localStorage.clear();
    }
  }
  
  const storage = new LocalStorage();
  
  export default storage;