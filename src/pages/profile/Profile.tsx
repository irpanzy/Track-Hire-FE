import { useState, useRef } from 'react'
import { useAuthStore, type User } from '@/features/auth'
import {
  User as UserIcon,
  Mail,
  Camera,
  Save,
  Trash2,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

export default function Profile() {
  const { user, login } = useAuthStore()
  const [name, setName] = useState(user?.name || '')
  const [username, setUsername] = useState(user?.username || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !username.trim()) {
      toast.error('Name and Username are required')
      return
    }

    setIsSaving(true)

    // Simulate saving changes
    setTimeout(() => {
      setIsSaving(false)
      if (user) {
        const updatedUser: User = {
          ...user,
          name: name.trim(),
          username: username.trim(),
        }
        login(updatedUser)
        toast.success('Profile updated successfully!')
      }
    }, 800)
  }

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

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string

      // Simulate network latency for uploading image to bucket
      setTimeout(() => {
        setIsUploading(false)
        if (user) {
          const updatedUser: User = {
            ...user,
            avatarUrl: dataUrl,
          }
          login(updatedUser)
          toast.success('Profile photo uploaded!')
        }
      }, 1200)
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteAvatar = () => {
    if (confirm('Are you sure you want to remove your profile photo?')) {
      setIsUploading(true)

      setTimeout(() => {
        setIsUploading(false)
        if (user) {
          const updatedUser: User = {
            ...user,
            avatarUrl: null,
          }
          login(updatedUser)
          toast.success('Profile photo removed.')
        }
      }, 500)
    }
  }

  return (
    <div className="animate-fade-in max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Profile Settings
        </h1>
        <p className="mt-1 text-zinc-400">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Card: Avatar */}
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
              className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove Photo
            </button>
          )}
        </div>

        {/* Right Card: Personal info details */}
        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm md:col-span-2">
          <h3 className="border-zinc-850 border-b pb-3 text-lg font-bold text-white">
            Personal Details
          </h3>

          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400"
                  htmlFor="p-name"
                >
                  <UserIcon className="h-3.5 w-3.5 text-zinc-500" />
                  Full Name
                </label>
                <input
                  id="p-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="placeholder-zinc-750 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400"
                  htmlFor="p-username"
                >
                  <UserIcon className="h-3.5 w-3.5 text-zinc-500" />
                  Username
                </label>
                <input
                  id="p-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Username"
                  required
                  className="border-zinc-850 placeholder-zinc-750 w-full rounded-lg border bg-zinc-950 px-3.5 py-2 text-sm text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-zinc-450 flex items-center gap-1.5 text-xs font-semibold"
                htmlFor="p-email"
              >
                <Mail className="text-zinc-550 h-3.5 w-3.5" />
                Email Address
              </label>
              <input
                id="p-email"
                type="email"
                value={user?.email || ''}
                disabled
                placeholder="Your Email"
                className="border-zinc-850 w-full cursor-not-allowed rounded-lg border bg-zinc-950/60 px-3.5 py-2 text-sm text-zinc-500 outline-none"
              />
              <p className="text-zinc-550 text-[10px] italic">
                Email address cannot be changed since it is linked to your
                authentication provider.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-650 shadow-indigo-650/15 hover:shadow-indigo-650/25 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-indigo-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
