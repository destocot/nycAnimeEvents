'use client'

import React, { PropsWithChildren } from 'react'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import {
  CreateEventSchema,
  UpdateEventSchema,
  type CreateEventInput,
  type UpdateEventInput,
} from '@/lib/validators'
import { EventWithDate } from '@/lib/types'
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
import { Button } from './ui/button'
import { updateEventAction } from '@/actions/update-event-action'
import { submitEventAction } from '@/actions/submit-event-action'
import { useRouter } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'

type EventFormProps = PropsWithChildren<{
  defaultEvent?: EventWithDate
}>

export const EventForm = ({ children, defaultEvent }: EventFormProps) => {
  const FormSchema = defaultEvent ? UpdateEventSchema : CreateEventSchema
  const action = defaultEvent ? updateEventAction : submitEventAction
  const router = useRouter()

  const form = useForm<CreateEventInput | UpdateEventInput>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      title: defaultEvent?.title ? defaultEvent.title : '',
      source: defaultEvent?.source ? defaultEvent.source : '',
      image: defaultEvent?.image ? defaultEvent.image : '',
      description: defaultEvent?.description ? defaultEvent.description : '',
      dates: defaultEvent?.eventDates.map((date) => date.date) ?? [],
      eventId: defaultEvent?.eventId,
    },
  })

  const { handleSubmit, formState, setValue, register, watch } = form
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

  const submit = async (values: CreateEventInput | UpdateEventInput) => {
    if (!action) return

    const { data, error } = await action(values)

    if (error) {
      console.log('error', error)
    } else {
      console.log('data', data)
      router.refresh()
      if (defaultEvent) {
        document.getElementById('closeEditEventDialogBtn')?.click()
      } else {
        router.push('/events/new/success')
      }
    }
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
        {defaultEvent ? <input type='hidden' {...register('eventId')} /> : null}
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
                    onSelect={(value) => {
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
                  <Badge key={index} className='flex-row-reverse'>
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
            {defaultEvent ? 'Update' : 'Submit'}
          </Button>
          {children && <div className='flex-1'>{children}</div>}
        </div>
      </form>
    </Form>
  )
}
