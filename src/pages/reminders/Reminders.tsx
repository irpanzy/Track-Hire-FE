import { useState, useEffect } from 'react'
import {
  Bell,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Plus,
  X,
} from 'lucide-react'
import {
  getMockReminders,
  saveMockReminders,
  getMockCompanies,
  type MockReminder,
} from '../../lib/mockData'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Reminders() {
  const [reminders, setReminders] = useState<MockReminder[]>([])
  const [companies, setCompanies] = useState<{ id: string; name: string }[]>([])

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Form fields
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Follow-up')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [company, setCompany] = useState('')

  useEffect(() => {
    setReminders(getMockReminders())
    setCompanies(getMockCompanies())
  }, [])

  const resetForm = () => {
    setTitle('')
    setType('Follow-up')
    setDate('')
    setTime('')
    setCompany('')
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !date || !time) {
      toast.error('Title, Date, and Time are required')
      return
    }

    // Format time from 24h to 12h AM/PM for layout display
    let formattedTime = time
    try {
      const [hours, minutes] = time.split(':')
      const h = parseInt(hours)
      const ampm = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      formattedTime = `${String(h12).padStart(2, '0')}:${minutes} ${ampm}`
    } catch (err) {
      // Keep original format if parsing fails
    }

    const newReminder: MockReminder = {
      id: 'r-' + Date.now(),
      title,
      type,
      date,
      time: formattedTime,
      status: 'Pending',
      company: company || undefined,
    }

    const updated = [newReminder, ...reminders]
    setReminders(updated)
    saveMockReminders(updated)
    setIsAddModalOpen(false)
    toast.success('Reminder scheduled successfully!')
  }

  const handleToggleComplete = (id: string) => {
    const updated = reminders.map((r) => {
      if (r.id === id) {
        const nextStatus = r.status === 'Completed' ? 'Pending' : 'Completed'
        toast.success(
          nextStatus === 'Completed'
            ? 'Reminder marked as completed!'
            : 'Reminder set to pending'
        )
        return {
          ...r,
          status: nextStatus as 'Pending' | 'Completed',
        }
      }
      return r
    })
    setReminders(updated)
    saveMockReminders(updated)
  }

  const handleDeleteReminder = (id: string) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      const updated = reminders.filter((r) => r.id !== id)
      setReminders(updated)
      saveMockReminders(updated)
      toast.success('Reminder deleted successfully')
    }
  }

  const pendingReminders = reminders.filter((r) => r.status === 'Pending')
  const completedReminders = reminders.filter((r) => r.status === 'Completed')

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Reminders
          </h1>
          <p className="mt-1 text-zinc-400">
            Set and manage deadlines or interview follow-ups.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-650 flex cursor-pointer items-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-600 hover:shadow-indigo-600/20 active:scale-95 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Reminder
        </button>
      </div>

      {/* Group Lists */}
      <div className="space-y-8">
        {/* Pending Reminders */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Upcoming Reminders ({pendingReminders.length})
          </h2>

          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm">
            {pendingReminders.length > 0 ? (
              <div className="divide-y divide-zinc-800">
                {pendingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="hover:bg-zinc-850/40 group flex flex-col justify-between gap-4 p-5 transition-colors sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 rounded-lg bg-indigo-500/10 p-2 text-indigo-400 transition-transform group-hover:scale-105">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {reminder.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                          <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-medium text-zinc-400">
                            {reminder.type}
                          </span>
                          {reminder.company && (
                            <span className="font-medium text-zinc-500">
                              at {reminder.company}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                            {new Date(reminder.date).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-zinc-500" />
                            {reminder.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleComplete(reminder.id)}
                        className="flex cursor-pointer items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Complete
                      </button>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-zinc-500">
                No upcoming reminders. Relax!
              </div>
            )}
          </div>
        </div>

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-400">
              <span className="bg-zinc-650 h-2 w-2 rounded-full" />
              Completed Reminders ({completedReminders.length})
            </h2>

            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 opacity-75 shadow-sm">
              <div className="divide-y divide-zinc-800">
                {completedReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="hover:bg-zinc-850/30 flex flex-col justify-between gap-4 p-4 transition-colors sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 rounded-lg bg-zinc-950 p-2 text-zinc-600">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500/60" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-zinc-500 line-through">
                          {reminder.title}
                        </h3>
                        <div className="text-zinc-650 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                          <span className="border-zinc-850 text-zinc-550 rounded-md border bg-zinc-950 px-2 py-0.5">
                            {reminder.type}
                          </span>
                          {reminder.company && (
                            <span>at {reminder.company}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-zinc-700" />
                            {new Date(reminder.date).toLocaleDateString(
                              'en-US',
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-zinc-700" />
                            {reminder.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleToggleComplete(reminder.id)}
                        className="cursor-pointer px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-indigo-400"
                      >
                        Undo Complete
                      </button>
                      <button
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-400" />
                Schedule Reminder
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddReminder} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">
                Title *
              </label>
              <Input
                type="text"
                placeholder="e.g. Prepare System Design Interview notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Interview Prep">
                      Interview Prep
                    </SelectItem>
                    <SelectItem value="Technical Test">
                      Technical Test
                    </SelectItem>
                    <SelectItem value="Thank you">Thank you</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Company Link
                </label>
                <Select value={company} onValueChange={setCompany}>
                  <SelectTrigger className="h-[38px] w-full border-zinc-800 bg-zinc-950 text-white">
                    <SelectValue placeholder="None / Custom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None / Custom</SelectItem>
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Date *
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">
                  Time *
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="bg-zinc-850 cursor-pointer rounded-lg px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 transition-all hover:bg-indigo-500 hover:shadow-indigo-600/20"
              >
                Schedule
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
