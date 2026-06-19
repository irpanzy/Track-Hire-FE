import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/features/auth'
import { useUser } from '../hooks/useUsers'
import { useUserMutations } from '../hooks/useUserMutations'
import ProfileAvatar from './ProfileAvatar'
import ProfileForm from './ProfileForm'
import type { User } from '../types/userTypes'
import { RetroWindow } from '@/components/ui/retro-window'
import retroProfileIcon from '@/assets/retro-profile.png'

export default function ProfileFeature() {
  const { user: authUser } = useAuthStore()
  const { data: userData, isLoading } = useUser(authUser?.id)
  const { updateUser, uploadAvatar, deleteAvatar } = useUserMutations()

  // Prioritize userData over authUser and ensure type compatibility
  const user = (userData?.user || authUser) as User | null | undefined

  const handleUpdateProfile = (name: string, username: string) => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }

    updateUser.mutate({
      userId: user.id,
      payload: { name, username },
    })
  }

  const handleUploadAvatar = (file: File) => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }

    uploadAvatar.mutate({ userId: user.id, file })
  }

  const handleDeleteAvatar = () => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }

    deleteAvatar.mutate(user.id)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <p className="text-sm text-zinc-500">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-3xl space-y-6">
      <RetroWindow
        title="Profile"
        icon={
          <img
            src={retroProfileIcon}
            alt="Profile"
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        }
      >
        <p className="font-mono text-xs text-zinc-500">
          Manage your account settings and preferences
        </p>
      </RetroWindow>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProfileAvatar
          user={user}
          isUploading={uploadAvatar.isPending}
          isDeleting={deleteAvatar.isPending}
          onUpload={handleUploadAvatar}
          onDelete={handleDeleteAvatar}
        />

        <ProfileForm
          user={user}
          isUpdating={updateUser.isPending}
          onSubmit={handleUpdateProfile}
        />
      </div>
    </div>
  )
}
