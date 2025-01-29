import axios from 'axios'

interface UploadFileToStorageRequest {
  file: File
}

interface UploadFileToStorageOptions {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file }: UploadFileToStorageRequest,
  options?: UploadFileToStorageOptions
) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post('http://localhost:3333/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: options?.signal,
  })
  return { url: response.data.url }
}
