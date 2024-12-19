// import db from '@/lib/db'
// import Component from './client-page'
// import { Header } from '@/components/header'

// export default async function TestingPage() {
//   const dates = await db.eventDate.findMany({
//     select: {
//       dateId: true,
//       date: true,
//       event: {
//         select: {
//           eventId: true,
//           title: true,
//           image: true,
//         },
//       },
//     },
//     where: {
//       event: {
//         isApproved: true,
//       },
//     },
//   })

//   return (
//     <>
//       <Header></Header>
//       <main className='container mx-auto max-w-5xl px-2 py-4'>
//         <Component events={dates} />
//       </main>
//     </>
//   )
// }
