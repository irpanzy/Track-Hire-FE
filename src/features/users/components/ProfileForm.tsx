import { useState } from 'react'
import { User as UserIcon, Mail, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../types/userTypes'

interface ProfileFormProps {
  user: User | null | undefined
  isUpdating: boolean
  onSubmit: (name: string, username: string) => void
}

export default function ProfileForm({
  user,
  isUpdating,
  onSubmit,
}: ProfileFormProps) {
  const [nameValue, setNameValue] = useState(user?.name || '')
  const [usernameValue, setUsernameValue] = useState(user?.username || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nameValue.trim() || !usernameValue.trim()) {
      toast.error('Name and username are required')
      return
    }

    onSubmit(nameValue.trim(), usernameValue.trim())
  }

  return (
    <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm md:col-span-2">
      <h3 className="border-zinc-850 border-b pb-3 text-lg font-bold text-white">
        Personal Details
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
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
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
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
          disabled={isUpdating}
          className="bg-indigo-650 shadow-indigo-650/15 hover:shadow-indigo-650/25 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-indigo-700"
        >
          {isUpdating ? (
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
  )
}
