const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRest = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

  // React Query, If it's an unsuccessful request, they want you to throw an error
  // Fetch will not always throw an error if you get like 500

  if (!apiRest.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // To test the React Query error use this code (results.isError)
  // if (apiRest.ok) {
  //   throw new Error(`details/${id} fetch not ok`);
  // }

  // React Query expects you to return a promise
  return apiRest.json();
};

export default fetchPet;
