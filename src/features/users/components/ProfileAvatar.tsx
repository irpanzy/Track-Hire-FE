import { useRef } from 'react'
import { Camera, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../types/userTypes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

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
        <Avatar className="h-24 w-24 border-2 border-indigo-500/30 shadow-lg shadow-indigo-600/10">
          {isUploading ? (
            <AvatarFallback className="bg-indigo-500/20">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            </AvatarFallback>
          ) : (
            <>
              <AvatarImage
                src={user?.avatarUrl || undefined}
                alt={user?.name}
              />
              <AvatarFallback className="bg-indigo-500/20 text-3xl font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </>
          )}
        </Avatar>

        {/* Input Picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <Button
          size="icon-sm"
          onClick={handleTriggerFileInput}
          disabled={isUploading}
          className="absolute right-0 bottom-0 rounded-full border-2 border-zinc-900 shadow-md"
          title="Upload profile photo"
        >
          <Camera className="h-3.5 w-3.5" />
        </Button>
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">
        {user?.name || 'User'}
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        {user?.email || 'user@example.com'}
      </p>

      {user?.avatarUrl && !isUploading && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteAvatar}
          disabled={isDeleting}
          className="mt-4 border-red-500/20 text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Removing...
            </>
          ) : (
            <>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Remove Photo
            </>
          )}
        </Button>
      )}
    </div>
  )
}
