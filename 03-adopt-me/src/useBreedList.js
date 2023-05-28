import {useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

const localCache = {};

export default function useBreedList(animal) {
  const results = useQuery(['breeds', animal] , fetchBreedList)

  // This ? mark is doing, if this is available, then give me that, If not, don't give me an error
  // These ?? is doing, if any of this fails give me back just an empty array

  // Resumed: If i don't have (results) for this yet, give me an empty array otherwise give me the results
  return [results?.data?.breeds ?? [], results.status]
  
}
