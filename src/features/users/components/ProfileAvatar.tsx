import { useRef } from 'react'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../types/userTypes'

interface ProfileAvatarProps {
  user: User | null | undefined
  isUploading: boolean
  isDeleting: boolean
  onUpload: (file: File) => void
  onDelete: () => void
}

export default function ProfileAvatar({
  user,
  isUploading,
  isDeleting,
  onUpload,
  onDelete,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit file size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File is too large. Max size is 2MB.')
      return
    }

    // Must be an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.')
      return
    }

    onUpload(file)
  }

  const handleDeleteAvatar = () => {
    if (confirm('Are you sure you want to remove your profile photo?')) {
      onDelete()
    }
  }

  return (
    <div className="flex h-fit flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-sm">
      <div className="group relative">
        <div className="shadow-indigo-650/10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-indigo-500/30 bg-indigo-500/20 shadow-lg">
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          ) : user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          )}
        </div>

        {/* Input Picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          onClick={handleTriggerFileInput}
          disabled={isUploading}
          className="disabled:bg-indigo-650 absolute right-0 bottom-0 cursor-pointer rounded-full border-2 border-zinc-900 bg-indigo-600 p-2 text-white shadow-md transition-all hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed"
          title="Upload profile photo"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">
        {user?.name || 'User'}
      </h3>
      <p className="text-zinc-550 mt-1 text-xs">
        {user?.email || 'user@example.com'}
      </p>

      {user?.avatarUrl && !isUploading && (
        <button
          onClick={handleDeleteAvatar}
          disabled={isDeleting}
          className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Removing...
            </>
          ) : (
            <>
              <Trash2 className="h-3.5 w-3.5" />
              Remove Photo
            </>
          )}
        </button>
      )}
    </div>
  )
}
