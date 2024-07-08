import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { LinkIcon, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { urlState } from '@/context'
import { logout } from '@/utils/apiAuth'
import useFetch from '@/hooks/use-fetch'

const Header = () => {
  const navigate=useNavigate()

  const{data: user,fetchUser}=urlState()
  const {loading, fn: fnLogout} = useFetch(logout);


  return (
    <nav className='flex py-10 justify-between content-center'>
      <Link to="/">
      <img src='../../assests/logo.png' alt='trimmer' className='h-16' />
      </Link>
      {
        !user?(<Button onClick={()=>{
          navigate("/auth")
        }}>Login</Button>)
        :
        (
          <DropdownMenu>
          <DropdownMenuTrigger>
          <Avatar>
  <AvatarImage src={user?.user_metadata.profile_pic} className="object-contain"/>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.user_metadata.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-blue-300" onClick={()=>{
              navigate("/dashboard")
            }}><LinkIcon className='mr-4 h-4 w-4'/><span>Links</span></DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"onClick={() => {
          fnLogout().then(() => {
            fetchUser();
            navigate("/auth");
          });
        }} ><LogOut className='mr-4 h-4 w-4'/><span>Logout</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      }
      
    </nav>
  )
}

export default Header