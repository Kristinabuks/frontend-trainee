export interface RTKQueryResult<T> {
  data: T | null
  error: object | null
  isLoading: boolean
  refetch: Function
}
