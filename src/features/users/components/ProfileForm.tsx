import { useState } from 'react'
import { User as UserIcon, Mail, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../types/userTypes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
    <div className="glass space-y-6 rounded-xl p-6 shadow-sm md:col-span-2">
      <h3 className="border-b border-white/[0.06] pb-3 text-lg font-bold text-white">
        Personal Details
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="p-name"
              className="flex items-center gap-1.5 text-zinc-400"
            >
              <UserIcon className="h-3.5 w-3.5 text-zinc-500" />
              Full Name
            </Label>
            <Input
              id="p-name"
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="p-username"
              className="flex items-center gap-1.5 text-zinc-400"
            >
              <UserIcon className="h-3.5 w-3.5 text-zinc-500" />
              Username
            </Label>
            <Input
              id="p-username"
              type="text"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              placeholder="Your Username"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="p-email"
            className="flex items-center gap-1.5 text-zinc-400"
          >
            <Mail className="h-3.5 w-3.5 text-zinc-500" />
            Email Address
          </Label>
          <Input
            id="p-email"
            type="email"
            value={user?.email || ''}
            disabled
            placeholder="Your Email"
            className="cursor-not-allowed opacity-60"
          />
          <p className="text-[10px] text-zinc-500 italic">
            Email address cannot be changed since it is linked to your
            authentication provider.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isUpdating}
          className="shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25"
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
