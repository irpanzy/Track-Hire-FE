# Shadcn UI Migration Guide

## ✅ Completed

- **Dashboard Feature** - 100% using shadcn components
  - Card, Chart, ChartTooltip, ChartContainer
  - Radar Chart with proper styling
  - All centered headers and consistent design

## 📦 Installed Shadcn Components

- ✅ button, input, label
- ✅ card, chart
- ✅ dialog, select, textarea
- ✅ badge, separator, table
- ✅ sonner (toast notifications)

## 🎯 TODO - Migration Tasks

### Priority 1: Forms & Dialogs

#### 1. ApplicationFormDialog.tsx (CRITICAL)

**File:** `src/features/applications/components/ApplicationFormDialog.tsx`

**Changes needed:**

```tsx
// Add imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Replace line 125: Remove custom backdrop div, use Dialog
<Dialog open={true} onOpenChange={onClose}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>
        {isEditMode ? 'Edit Application' : 'Add New Application'}
      </DialogTitle>
    </DialogHeader>

    {/* Rest of form content */}
  </DialogContent>
</Dialog>

// Replace 3 <select> elements (lines ~320, 351, 381) with shadcn Select:
<Select
  value={value}
  onValueChange={(val) => setValue('fieldName', val)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    {OPTIONS.map((opt) => (
      <SelectItem key={opt.value} value={opt.value}>
        {opt.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

// Replace 3 <textarea> elements (lines ~415, 425, 435) with:
<Textarea
  {...register('fieldName')}
  rows={3}
  placeholder="..."
/>
```

**Note:** Need to use Controller from react-hook-form for Select component.

#### 2. ApplicationDetailDialog.tsx

**File:** `src/features/applications/components/ApplicationDetailDialog.tsx`

- Wrap with shadcn Dialog component
- Use Badge for status display

#### 3. ConfirmDeleteDialog.tsx

**File:** `src/features/applications/components/ConfirmDeleteDialog.tsx`

- Already uses Dialog, just verify implementation

### Priority 2: Pages with Custom Modals

#### 4. Companies.tsx

**File:** `src/pages/companies/Companies.tsx`

- Replace custom modal (lines 267-345) with Dialog
- Replace custom inputs with Input component

#### 5. Reminders.tsx

**File:** `src/pages/reminders/Reminders.tsx`

- Replace custom modal (lines 291-400) with Dialog
- Replace custom inputs with Input component
- Replace custom buttons with Button variants

### Priority 3: Admin Tables

#### 6. AdminUsersFeature.tsx

**File:** `src/features/admin/components/AdminUsersFeature.tsx`

- Wrap UsersTable with shadcn Table component
- Add Badge for role display
- Use Table, TableHeader, TableBody, TableRow, TableCell

#### 7. RecycleBinFeature.tsx

**File:** `src/features/admin/components/RecycleBinFeature.tsx`

- Same as above for DeletedUsersTable
- Add Badge for status

#### 8. ApplicationsTable.tsx

**File:** `src/features/applications/components/ApplicationsTable.tsx`

- Consider using shadcn Table wrapper
- Add Badge for status (already partially using STATUS_COLORS)

### Priority 4: Miscellaneous

#### 9. NotFound.tsx

**File:** `src/pages/NotFound.tsx`

- Use Badge for error icon wrapper (line 8)

#### 10. Profile Components

**Files:**

- `src/features/users/components/ProfileAvatar.tsx`
- `src/features/users/components/ProfileForm.tsx`

**Changes:**

- Install Avatar component: `npx shadcn@latest add avatar`
- Replace custom avatar div with Avatar, AvatarImage, AvatarFallback
- Verify Input and Label usage

## 📝 Installation Commands

If any components missing:

```bash
npx shadcn@latest add avatar dropdown-menu alert scroll-area
```

## 🔄 Migration Pattern

For each file:

1. **Read current implementation**
2. **Identify custom components** (modals, selects, textareas, tables)
3. **Replace with shadcn equivalents**
4. **Test functionality**
5. **Commit changes**

## 🧪 Testing Checklist

After each migration:

- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors
- [ ] Component renders correctly
- [ ] Form submissions work
- [ ] Styling matches design system
- [ ] Responsive behavior intact

## 📚 Reference

- Shadcn Docs: https://ui.shadcn.com
- Components config: `components.json`
- Design tokens: Using Tailwind CSS v4
- Theme: Radix Nova style
- Icon library: Lucide React

## 🎨 Design System Notes

All shadcn components already configured with:

- Dark theme (zinc palette)
- Consistent spacing and sizing
- Proper focus states
- Accessibility compliance

Colors:

- Primary: Indigo (#6366f1)
- Background: Zinc-950
- Card: Zinc-900
- Border: Zinc-800
- Text: White / Zinc-400

## 💡 Tips

1. **Dialog migration**: Most custom modals follow same pattern
2. **Select with react-hook-form**: Must use Controller wrapper
3. **Table migration**: Wrap existing table markup with shadcn components
4. **Keep existing logic**: Only replace UI, not business logic
5. **Incremental approach**: Migrate one file at a time, test, commit

## 🚀 Next Steps

1. Create new branch: `git checkout -b feature/shadcn-forms`
2. Start with ApplicationFormDialog (biggest impact)
3. Test thoroughly
4. Continue with Companies and Reminders
5. Finish with Admin tables
6. Merge to main when complete

---

**Last Updated:** June 17, 2026
**Status:** Dashboard complete, forms pending
**Branch:** `feature/shadcn-ui-migration`
