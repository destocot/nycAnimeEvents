'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { CreateEventSchema, type CreateEventInput } from '@/lib/validators'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'
import { formatDate } from '@/lib/utils'
import { Badge } from '@ui/badge'
import { CalendarIcon, XIcon } from 'lucide-react'
import { createEventAction } from '@events/actions/create-event'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { Button } from '@ui/button'
import { Calendar } from '@ui/calendar'
import { useState } from 'react'

export const CreateEventForm = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<CreateEventInput>({
    resolver: valibotResolver(CreateEventSchema),
    defaultValues: {
      title: '',
      source: '',
      image: '',
      description: '',
      dates: [],
    },
  })

  const { handleSubmit, formState, setValue, watch } = form
  const watchDates = watch('dates')

  const handleRemoveDate = (index: number) => {
    setValue(
      'dates',
      watchDates.filter((_, i) => i !== index),
    )
  }

  const handleAddDate = (value: Date) => {
    const date = new Date(value)

    if (watchDates.some((d) => new Date(d).getTime() === date.getTime())) {
      return
    }

    const newDates = [...watchDates, date].sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })

    setValue('dates', newDates)
  }

  const submit = async (values: CreateEventInput) => {
    values.image = imageFile ? await convertImageToBase64(imageFile) : ''
    const res = await createEventAction(values)

    if (res?.error) console.log('[error]:', res.error)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='source'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Source <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {imagePreview ? (
                <div className='relative h-32 w-full overflow-hidden rounded-sm'>
                  <img
                    src={imagePreview}
                    alt='Profile preview'
                    className='h-full w-full object-cover'
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-2 text-white hover:text-red-500'
                    onClick={() => {
                      setImagePreview(null)
                      setImageFile(null)
                      setValue('image', '')
                    }}
                  >
                    <XIcon size={20} />
                  </button>
                </div>
              ) : (
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    {...rest}
                    onChange={async (evt) => {
                      const file = evt.target.files?.[0]
                      if (file) {
                        setImageFile(file)
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setImagePreview(`${reader.result}`)
                        }
                        reader.readAsDataURL(file)
                      }
                      onChange(evt)
                    }}
                  />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='dates'
          render={({ field: { value, ...rest } }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className='w-[240px] pl-3 text-left font-normal'
                    >
                      <span className='text-muted-foreground'>
                        Pick date(s)
                      </span>
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    onSelect={(value: any) => {
                      if (value instanceof Date) {
                        handleAddDate(value)
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className='flex flex-wrap gap-1'>
                {value.map((date, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='flex-row-reverse'
                  >
                    <button
                      type='button'
                      className='peer ml-2 text-destructive'
                      onClick={() => handleRemoveDate(index)}
                    >
                      <XIcon size={16} />
                    </button>
                    <span className='peer-hover:line-through'>
                      {formatDate(date instanceof Date ? date : new Date(date))}
                    </span>
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-2 flex gap-4'>
          <Button
            type='submit'
            className='flex-1'
            disabled={formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
