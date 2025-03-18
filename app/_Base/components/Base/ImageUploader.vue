<script setup lang="ts">
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from 'firebase/storage'

interface Image {
  publicUrl: string
  name: string
}

interface ImageUploaderProps {
  storagePathPrefix?: string
  placeholderText?: string
  placeholderClass?: string
  containerClass?: string
}
const props = defineProps<ImageUploaderProps>()

const model = defineModel<null | Image>({ default: null })

const storage = getStorage()
const user = useCurrentUser()

const uploading = ref(false)
const uploadProgress = ref(0)
const errorMessage = ref<string | null>(null)
const fileInputKey = ref(0)
const isUploadComplete = ref(false)
const isDragOver = ref(false)

function resetFileInput() {
  fileInputKey.value++
}

async function handleFileUpload(file: File) {
  errorMessage.value = null

  if (!file || !user?.value?.uid) {
    resetFileInput()
    return
  }

  uploading.value = true
  uploadProgress.value = 0
  isUploadComplete.value = false

  try {
    const timestamp = new Date()
    const formattedDate = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}-${timestamp.getDate()}__${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
    const filePath = `${props.storagePathPrefix ?? 'users'}/${user.value.uid}/images/${formattedDate}__${file.name}`
    const fileRef = storageRef(storage, filePath)

    const uploadTask = uploadBytesResumable(fileRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    })
    await uploadTask
    const downloadURL = await getDownloadURL(fileRef)
    model.value = { publicUrl: downloadURL, name: file.name }
    isUploadComplete.value = true
  }
  catch (error) {
    consola.error('Upload failed:', error)
    errorMessage.value = 'Failed to upload image. Please try again.'
  }
  finally {
    uploading.value = false
    uploadProgress.value = 0
    resetFileInput()
  }
}

async function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file)
    await handleFileUpload(file)
}

async function onDrop(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = false

  const file = event.dataTransfer?.files?.[0]
  if (file)
    await handleFileUpload(file)
}

function deleteImage() {
  if (!model.value)
    return

  const fileRef = storageRef(storage, model.value.publicUrl)
  deleteObject(fileRef)
    .then(() => {
      model.value = null
      isUploadComplete.value = false
    })
    .catch((error) => {
      consola.error('Error deleting image:', error)
      errorMessage.value = 'Failed to delete image.'
    })
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  isDragOver.value = true
}

function onDragLeave() {
  isDragOver.value = false
}
</script>

<template>
  <div :class="[containerClass ?? 'w-full h-full']">
    <div
      class="relative min-h-[150px] h-full rounded-sm shadow-xl flex justify-center items-center cursor-pointer"
      :class="[
        model?.publicUrl
          ? 'overflow-hidden'
          : uploading
            ? 'animate-pulse bg-secondary-400'
            : '',
        isDragOver ? 'bg-gray-100 border-dashed border-2 border-gray-300' : '',
      ]"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <!-- Uploaded Image -->
      <template v-if="model?.publicUrl">
        <img :src="model?.publicUrl" alt="Uploaded Image" class="h-full w-full">
        <button
          class="absolute top-2 right-2 bg-secondary-300 hover:bg-secondary-400 center p-1 rounded-sm cursor-pointer"
          @click.prevent="deleteImage"
        >
          <Icon name="ic:round-close" class="text-black" />
        </button>
      </template>

      <!-- Upload Input -->
      <template v-else-if="!uploading && !isUploadComplete">
        <label class="w-full h-full cursor-pointer text-center grid place-items-center">
          <input
            :key="fileInputKey"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onFileChange"
          >
          <div :class="[placeholderClass ?? '']">
            <Icon name="ic:baseline-add-photo-alternate" class="text-500 text-gray-400" />
            <p>{{ placeholderText ?? 'Drag and drop an image or click to select' }}</p>
          </div>
        </label>
      </template>

      <!-- Upload Progress -->
      <div v-if="uploading" class="w-full">
        <div class="flex items-center justify-between">
          <div class="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden mr-4">
            <div
              class="h-full bg-primary-500 transition-width duration-300"
              :style="{ width: `${uploadProgress}%` }"
            />
          </div>
          <span class="text-sm w-16 text-right">{{ uploadProgress.toFixed(2) }}%</span>
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="mt-2 text-red-500 text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
