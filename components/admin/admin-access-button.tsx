// 'use client'

// import { useEffect, useState } from 'react'
// import { getSession } from 'next-auth/react'
// import { ShieldIcon } from 'lucide-react'

// import { LinkButton } from '@/components/link-button'

// const AdminAccessButtonWrapper = ({
//   children,
// }: {
//   children: React.ReactNode
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)

//   useEffect(() => {
//     ;(async function run() {
//       const session = await getSession()
//       if (session?.user) {
//         setIsAuthenticated(true)
//       }
//     })()
//   }, [])

//   if (!isAuthenticated) return null

//   return <>{children}</>
// }

// export const AdminAccessButton = () => {
//   return (
//     <AdminAccessButtonWrapper>
//       <LinkButton
//         href='/admin'
//         label='Admin'
//         srOnlyLabel
//         className='absolute left-[39.5%] top-1/2 hidden size-8 -translate-x-[39.5%] -translate-y-1/2 transition-transform hover:scale-105 md:inline-flex lg:left-4 lg:translate-x-0'
//         rightIcon={ShieldIcon}
//         size='icon'
//         variant='ghost'
//       />
//     </AdminAccessButtonWrapper>
//   )
// }

// export const MobileAdminAccessButton = () => {
//   return (
//     <AdminAccessButtonWrapper>
//       <LinkButton
//         href='/admin'
//         label='Admin'
//         srOnlyLabel
//         rightIcon={ShieldIcon}
//         size='sm'
//         variant='secondary'
//       />
//     </AdminAccessButtonWrapper>
//   )
// }
