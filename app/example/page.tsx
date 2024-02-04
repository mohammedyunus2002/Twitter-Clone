'use client'
 
import useUsers from '@/hooks/useUsers'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

 
export default  function ExampleClientComponent() {
  const pathname = usePathname()
  const [user, setUser] = useState([]);
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post('/api/user')
    },
  })

  return (
    <div>
      {}
    </div>
  )
}