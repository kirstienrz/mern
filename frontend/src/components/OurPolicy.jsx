import React from 'react'
import { assets } from '../assets/assets'


const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Exchange Policy</p>
        <p className='text-gray-400'>We offers kinemberlu</p>
      </div>

      <div>
        <img src={assets.check_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>14 Days Return Policy</p>
        <p className='text-gray-400'>We offers kinemberlu</p>
      </div>

      <div>
        <img src={assets.customerSupport_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Customer Support</p>
        <p className='text-gray-400'>We offers kinemberlu</p>
      </div>
    </div>
  )
}

export default OurPolicy
