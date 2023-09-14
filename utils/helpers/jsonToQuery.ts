const jsonToQuery = (jsonObject: Record<string, any>): string => {
  const queryString = Object.entries(jsonObject)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryString;
};

export default jsonToQuery;
