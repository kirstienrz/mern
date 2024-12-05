import React from 'react'

const News = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }


  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'> Subscribe and Get Discounts!</p>
      <p className='text-gray-400 mt-3'>
        Nansdkjasndka ajsndaksndakjsn asjndkansjkdnajkndansjkdanjk
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email address' required/>
        <button className='bg-black text-white text-xs px-10 py-4' type='submit'>Subscribe Now</button>
      </form>
    </div>
  )
}

export default News
