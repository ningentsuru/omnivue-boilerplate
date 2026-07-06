import { Camera, CameraDirection } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

export const useNativeFeatures = () => {
  const takePhoto = async () => {
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        editable: 'in-app',
        cameraDirection: CameraDirection.Rear,
        targetWidth: 1280,
        targetHeight: 720,
        includeMetadata: true,
        saveToGallery: true,
      })

      return result.webPath
    } catch (error) {
      console.error('User denied camera or error:', error)
      return null
    }
  }

  const chooseFromGallery = async () => {
    try {
      const { results } = await Camera.chooseFromGallery({
        quality: 90,
        limit: 1,
        includeMetadata: true,
      })

      return results[0]?.webPath || null
    } catch (error) {
      console.error('User cancelled or error:', error)
      return null
    }
  }

  const getCurrentLocation = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      })
      return coordinates
    } catch (error) {
      console.error('User denied location or error:', error)
      return null
    }
  }

  const saveFilePrivate = async (fileName: string, data: string) => {
    try {
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: data,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
      return savedFile.uri
    } catch (error) {
      console.error('Private save error:', error)
      return null
    }
  }

  const deleteFileByName = async (fileName: string) => {
    try {
      await Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data,
      })
      return true
    } catch (error) {
      console.error('Delete error:', error)
      return false
    }
  }

  const shareFileFromPrivate = async (fileName: string) => {
    try {
      const uriResult = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Data,
      })

      await Share.share({
        files: [uriResult.uri],
      })

      return true
    } catch (error) {
      console.error('Share error:', error)
      return false
    }
  }

  const getSavedFiles = async () => {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Data,
      })
      return result.files
    } catch (error) {
      console.error('Error reading directory:', error)
      return []
    }
  }

  const getFileDate = async (fileName: string) => {
    try {
      const stat = await Filesystem.stat({
        path: fileName,
        directory: Directory.Data,
      })
      return stat.mtime ? new Date(stat.mtime).toLocaleString() : 'Unknown'
    } catch {
      return 'Unknown'
    }
  }

  const readFileContent = async (fileName: string) => {
    try {
      const result = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })

      if (typeof result.data === 'string' && result.data.startsWith('.')) {
        console.warn('File might be binary/Base64. Check writeFile encoding.')
      }

      return result.data
    } catch (error) {
      console.error('Error reading file:', error)
      return 'Error loading content'
    }
  }

  return {
    takePhoto,
    chooseFromGallery,
    getCurrentLocation,
    saveFilePrivate,
    deleteFileByName,
    shareFileFromPrivate,
    getSavedFiles,
    getFileDate,
    readFileContent,
  }
}
