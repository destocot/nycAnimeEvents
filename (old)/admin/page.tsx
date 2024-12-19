// import { Header } from '@/components/header'
// import { auth } from '@/auth'
// import { LinkButton } from '@/components/link-button'
// import type { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Admin',
// }

// const Page = async () => {
//   const session = await auth()

//   if (!session?.user) {
//     throw new Error('Unauthorized')
//   }

//   return (
//     <>
//       <Header></Header>

//       <main className='container mx-auto max-w-4xl px-2 py-4'>
//         <div className='mt-4'>
//           <div className='mx-auto max-w-3xl space-y-4'>
//             <div className='flex items-center justify-between gap-4'>
//               <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
//                 Admin
//               </h1>
//               <LinkButton href='/admin/manager' label='Manager' />
//             </div>
//             <div className='h-1 bg-muted' />
//             <div>
//               {!!session.user.email && (
//                 <div className='flex flex-col'>
//                   <span className='text-sm font-medium'>Email</span>
//                   {session.user.email}
//                 </div>
//               )}
//               {!!session.user.name && (
//                 <div className='flex flex-col'>
//                   <span className='text-sm font-medium'>Name</span>
//                   {session.user.name}
//                 </div>
//               )}
//               {!!session.user.image && (
//                 <div className='flex flex-col'>
//                   <span className='text-sm font-medium'>image</span>
//                   <img src={session.user.image} alt='user image' />
//                 </div>
//               )}
//               {!!session.user.id && (
//                 <div className='flex flex-col'>
//                   <span className='text-sm font-medium'>ID</span>
//                   {session.user.id}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }

// export default Page
