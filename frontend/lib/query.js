export const getQueryResult = async (query) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/query/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    });

    response = await response.json();

    if (!response.success) throw Error(response.message);

    return response.data;
  } catch (error) {
    return error.message;
  }
};
