import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

function Sidebar() {
  const instagramProfileLink = "https://www.instagram.com/kevinnn._.11/";
  const linkedProfileLink = "https://www.linkedin.com/in/kevin-thumbar-00152b221/";
  const twitterLink = "https://twitter.com/imKevint11";
  const emailAddress = "kevthummar178@gmail.com";
  const emailLink = `mailto:${emailAddress}`;

  return (
    <div>
      <p className='m-0 font-medium'>John Doe</p>
      <p className='m-0 text-gray-700'>username</p>

      <div className='flex mt-3'>
        <div className='flex'>
          <p className='px-1'>
            <PeopleIcon fontSize='small' />
          </p>
          <div className='bg-center items-center my-1'>
            <p className='text-sm text-gray-700'>
              15 Followers
            </p>
          </div>
        </div>

        <div className='flex mx-3'>
          <p className='px-1'>
            <PeopleOutlineIcon fontSize='small' />
          </p>
          <div className='bg-center items-center my-1'>
            <p className='text-sm text-gray-700'>
              15 Following
            </p>
          </div>
        </div>
      </div>

      <p className='m-0'>description : <br /> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga saepe est, iusto et itaque accusamus voluptates nisi accusantium dicta exercitationem voluptatibus, pariatur deserunt beatae consequatur blanditiis ducimus maiores tempora omnis?</p>

      <div className='flex mt-4'>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={instagramProfileLink} target="_blank" >
          <InstagramIcon sx={{ fontSize: 25 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={twitterLink} target="_blank">
          <XIcon sx={{ fontSize: 25 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={linkedProfileLink} target="_blank">
          <LinkedInIcon sx={{ fontSize: 30 }} />
        </a>
        <a className='pr-5 text-gray-950 transition duration-400 ease-in-out hover:text-blue-900' href={emailLink} target="_blank">
          <MailIcon sx={{ fontSize: 30 }} />
        </a>
      </div>
    </div>
  )
}

export default Sidebar;