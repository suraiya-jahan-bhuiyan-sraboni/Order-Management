import React from 'react'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast';
import Nav from '../components/root components/Nav';

const Root = () => {
    return (
        <div>
            <Nav/>
            <div className='min-h-screen w-11/12 mx-auto px-3'>
                <Outlet />
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            
        </div>
    )
}

export default Root