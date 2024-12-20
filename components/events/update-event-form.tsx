'use client'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { UpdateEventInput, UpdateEventSchema } from '@/lib/validators'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, XCircleIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import type { Prisma } from '@prisma/client'
import { updateEventAction } from '@/features/events/actions/update-event'

type UpdateEventFormProps = {
  defaultEvent: Prisma.EventGetPayload<{ include: { dates: true } }>
}

export const UpdateEventForm = ({ defaultEvent }: UpdateEventFormProps) => {
  const form = useForm<UpdateEventInput>({
    resolver: valibotResolver(UpdateEventSchema),
    defaultValues: {
      title: defaultEvent.title,
      source: defaultEvent.source,
      image: defaultEvent.image ?? '',
      description: defaultEvent.description ?? '',
      dates: defaultEvent.dates.map((date) => new Date(date.date)),
      eventId: defaultEvent.id,
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

  const submit = async (values: UpdateEventInput) => {
    const res = await updateEventAction(values)

    if (res?.error) console.log('[error]:', res.error)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
        <input type='hidden' {...form.register('eventId')} />

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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          render={({ field: { value, onChange, ...rest } }) => (
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
                      <XCircleIcon size={16} />
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}
