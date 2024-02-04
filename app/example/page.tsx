'use client'
 
import useUsers from '@/hooks/useUsers'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

 
export default  function ExampleClientComponent() {
  const pathname = usePathname()
  const [user, setUser] = useState([]);

  return (
    <div>
      {}
    </div>
  )
}