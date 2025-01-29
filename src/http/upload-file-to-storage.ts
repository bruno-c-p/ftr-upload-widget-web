import axios from 'axios'

interface UploadFileToStorageRequest {
  file: File
  onProgress: (sizeInBytes: number) => void
}

interface UploadFileToStorageOptions {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageRequest,
  options?: UploadFileToStorageOptions
) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios.post('http://localhost:3333/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: options?.signal,
    onUploadProgress(event) {
      onProgress(event.loaded)
    },
  })
  return { url: response.data.url }
}
