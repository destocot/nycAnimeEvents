// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import {
//   format,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameMonth,
//   isSameDay,
//   addMonths,
//   subMonths,
//   parseISO,
// } from 'date-fns'
// import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'

// type Event = {
//   eventId: string
//   title: string
//   image: string | null
// }

// type CalendarDate = {
//   dateId: number
//   date: Date | string
//   event: Event
// }

// interface CalendarProps {
//   events: CalendarDate[]
// }

// export default function Component({ events }: CalendarProps) {
//   const [currentDate, setCurrentDate] = useState(new Date())

//   const monthStart = startOfMonth(currentDate)
//   const monthEnd = endOfMonth(currentDate)
//   const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

//   const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
//   const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

//   const getEventsForDate = (date: Date) => {
//     return events.filter((event) => {
//       const eventDate =
//         event.date instanceof Date ? event.date : parseISO(event.date)
//       return isSameDay(eventDate, date)
//     })
//   }

//   const EventPreview = ({ event }: { event: Event }) => (
//     <Link
//       href={`/event/${event.eventId}`}
//       className='group relative block h-7 w-full overflow-hidden rounded sm:h-9'
//     >
//       <div
//         className='absolute inset-0 bg-cover bg-center'
//         style={{ backgroundImage: `url(${event.image || '/placeholder.jpg'})` }}
//       />
//       <div className='absolute inset-0 bg-black bg-opacity-50 transition group-hover:bg-opacity-40' />
//       <div className='absolute inset-0 flex items-center px-1 text-xs font-semibold text-white sm:px-2 sm:text-sm'>
//         <p className='line-clamp-1'>{event.title}</p>
//       </div>
//     </Link>
//   )

//   return (
//     <div className='container mx-auto p-2 sm:bg-transparent sm:p-4'>
//       <div className='mb-4 flex items-center justify-between'>
//         <h2 className='text-lg font-bold sm:text-2xl'>
//           {format(currentDate, 'MMMM yyyy')}
//         </h2>
//         <div>
//           <Button
//             onClick={prevMonth}
//             variant='outline'
//             size='icon'
//             className='mr-2'
//           >
//             <ChevronLeft className='h-4 w-4' />
//           </Button>
//           <Button onClick={nextMonth} variant='outline' size='icon'>
//             <ChevronRight className='h-4 w-4' />
//           </Button>
//         </div>
//       </div>
//       <div className='grid grid-cols-7 gap-1 sm:gap-2'>
//         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
//           <div
//             key={day}
//             className='p-1 text-center text-xs font-bold sm:p-2 sm:text-sm'
//           >
//             {day}
//           </div>
//         ))}
//         {monthDays.map((day) => {
//           const dayEvents = getEventsForDate(day)
//           return (
//             <div
//               key={day.toISOString()}
//               className={`h-[8rem] border p-1 sm:h-[11rem] sm:p-2 ${
//                 isSameMonth(day, currentDate) ? '' : 'bg-gray-100'
//               }`}
//             >
//               <div className='mb-1 text-right text-xs sm:mb-2 sm:text-sm'>
//                 {format(day, 'd')}
//               </div>
//               <div className='grid h-24 grid-cols-1 grid-rows-3 gap-y-0.5 overflow-hidden sm:h-[8rem]'>
//                 {dayEvents.slice(0, 2).map((event) => (
//                   <EventPreview key={event.dateId} event={event.event} />
//                 ))}
//                 {dayEvents.length > 2 && (
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button
//                         variant='outline'
//                         className='flex h-7 w-full items-center justify-center rounded text-xs sm:h-9'
//                       >
//                         <MoreHorizontal className='mr-1 h-3 w-3 sm:h-4 sm:w-4' />
//                         {dayEvents.length - 2} more
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-[425px]'>
//                       <DialogHeader>
//                         <DialogTitle>{format(day, 'MMMM d, yyyy')}</DialogTitle>
//                       </DialogHeader>
//                       <div className='mt-4 flex flex-col space-y-2'>
//                         {dayEvents.map((event) => (
//                           <EventPreview
//                             key={event.dateId}
//                             event={event.event}
//                           />
//                         ))}
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 )}
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
