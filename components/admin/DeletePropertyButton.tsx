'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface DeletePropertyButtonProps {
  propertyId: number
  propertyAddress: string
}

export function DeletePropertyButton({ propertyId, propertyAddress }: DeletePropertyButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${propertyAddress}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/mgmt-c141f580/properties/${propertyId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to delete property')
      }
    } catch (error) {
      alert('An error occurred while deleting the property')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete property"
    >
      <Trash2 className="w-4 h-4 inline" />
    </button>
  )
}
