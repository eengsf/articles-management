import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <div className='flex sm:flex-row flex-col w-full h-[100px] justify-center items-center bg-primary gap-4 '>
      <div className="sm:w-[134px] sm:h-6 w-[122px] h-[22px]">
        <Image
          src={'/logoipsum-white.svg'}
          alt="logoipsum-white"
          width={500}
          height={500}
          className="object-cover "
        />
      </div>
      <span className='text-secondary sm:text-base text-sm'>&copy 2025 Blog genzet. All rights reserved</span>
    </div>
  );
}

export default Footer;
