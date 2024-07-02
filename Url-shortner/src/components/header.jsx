import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { LinkIcon, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = () => {
  const navigate=useNavigate()
  const user=true
  return (
    <nav className='flex py-10 justify-between content-center'>
      <Link to="/">
      <img src='../../assests/logo.png' alt='trimmer' className='h-16' />
      </Link>
      {
        !user?(<Button onClick={()=>{navigate("/auth")}}>Login</Button>)
        :
        (
          <DropdownMenu>
          <DropdownMenuTrigger>
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-blue-300"><LinkIcon className='mr-4 h-4 w-4'/><span>Links</span></DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"><LogOut className='mr-4 h-4 w-4'/><span>Logout</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      }
      
    </nav>
  )
}

export default Header