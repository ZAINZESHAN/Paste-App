import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 justify-around mt-5 mb-2'>
        <NavLink to={'/'}>
            Home
        </NavLink>
        <NavLink to={'/paste'}>
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar
