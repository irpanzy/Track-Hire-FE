import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/features/auth'
import { useUser } from '../hooks/useUsers'
import { useUserMutations } from '../hooks/useUserMutations'
import ProfileHeader from './ProfileHeader'
import ProfileAvatar from './ProfileAvatar'
import ProfileForm from './ProfileForm'
import type { User } from '../types/userTypes'

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
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-3xl space-y-6">
      <ProfileHeader />

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
