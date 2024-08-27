"use client"
import React from 'react';

const Header = () => {
    return (
        <div className="navbar bg-base-100 bg-white font-bold py-5 px-5 md:px-20 shadow-lg flex">
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KJNRWtV6fs59Oc0rJ_x9xZ79EaKwE5uicyYF4Fubjls0jQoEvpWT6-6nH3jmq7kqQnw&usqp=CAU'
                className='w-10 md:w-12'
                alt='Logo'
            />
            <a className="text-xl md:text-3xl mt-2">Todo</a>
        </div>
    );
};

export default Header;
