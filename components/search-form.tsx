'use client'

import { useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Loader2Icon } from 'lucide-react'

type SearchFormProps = { initialQuery: string }

export const SearchForm = ({ initialQuery }: SearchFormProps) => {
  const [isSearching, setIsSearching] = useState(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((query: string) => {
    setIsSearching(true)
    const params = new URLSearchParams(searchParams)

    if (query.length > 3) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
    setTimeout(() => setIsSearching(false), 500)
  }, 300)

  return (
    <form>
      <div>
        <Label htmlFor='query' className='sr-only'>
          Query
        </Label>
        <div className='relative'>
          <Input
            disabled={isSearching}
            type='search'
            id='query'
            name='query'
            placeholder='Enter a search query...'
            defaultValue={initialQuery}
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
          />
          {isSearching && (
            <div className='absolute right-4 top-1/2 -translate-y-1/2'>
              <Loader2Icon size={16} className='animate-spin' />
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
