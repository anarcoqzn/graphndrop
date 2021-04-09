import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function Home() {

  const userLogin = useSelector(state => state.userLogin);
  useEffect(() => {
    console.log(userLogin);
  }, []);
  
  return (
    <div>
      
    </div>
  )
}
