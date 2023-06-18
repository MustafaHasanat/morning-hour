const getCookieWithExpiry = (key: string): null | any => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // if the item is expired, delete the item from storage and return null
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

const setCookieWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export { getCookieWithExpiry, setCookieWithExpiry };
