type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
interface ApiResponse<T> {
  data: T
  refresh?: () => void
}

export default function  () {
  const apiKey = '/api'
  const loading = ref( false )

  async function apiRequest<T> (
    method: ApiMethod,
    endpoint: string,
    data?: any,
    customHeaders: Record<string, string> = {},
  ): Promise<T | undefined> {
    loading.value = true
    try {
      const response = await $fetch<T>( `${ apiKey }/${ endpoint }`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          ...customHeaders,
        },
        body: data !== null && data !== undefined ? JSON.stringify( data ) : undefined,
      } )
      return response
    }
    catch ( error: any ) {
      handleApiError( error as { response?: { _data?: { messages?: Record<string, string> } } } )
    }
    finally {
      loading.value = false
    }
  }

  function handleApiError ( error: { response?: { _data?: { messages?: Record<string, string> } } } ) {
    console.error( ( error as { response?: { _data?: any } } )?.response?._data )
  }

  async function create<T> ( resource: string, data: any ) {
    return apiRequest<ApiResponse<T>>( 'POST', resource, data )
  }

  async function edit<T> ( resource: string, id: string, data: any, method: ApiMethod = 'PUT' ) {
    return apiRequest<ApiResponse<T>>( method, `${ resource }/${ id }`, data )
  }

  async function remove<T> ( resource: string, id: string ) {
    return apiRequest<ApiResponse<T>>( 'DELETE', `${ resource }/${ id }` )
  }

  async function getAll<T> (
    resource: string,
    queryParams: Record<string, string> = {},
  ): Promise<ApiResponse<T> | undefined> {
    loading.value = true
    try {
      const queryString = new URLSearchParams( queryParams ).toString()
      const url = `${ apiKey }/${ resource }${ queryString ? `?${ queryString }` : '' }`
      const { data, refresh } = await useFetch<ApiResponse<T>>( url )
      return { data: data as T, refresh: refresh as () => void }
    }
    catch ( error: any ) {
      handleApiError( error as { response?: { _data?: { messages?: Record<string, string> } } } )
    }
    finally {
      loading.value = false
    }
  }

  async function get<T> ( resource: string, id: string ): Promise<ApiResponse<T> | undefined> {
    loading.value = true
    try {
      const url = `${ apiKey }/${ resource }/${ id }`
      const response = await useFetch<ApiResponse<T>>( url )
      return { data: response.data as T, refresh: response.refresh as () => void }
    }
    catch ( error: any ) {
      handleApiError( error as { response?: { _data?: { messages?: Record<string, string> } } } )
    }
    finally {
      loading.value = false
    }
  }

  return {
    get,
    getAll,
    create,
    edit,
    remove,
    loading,
  }
}