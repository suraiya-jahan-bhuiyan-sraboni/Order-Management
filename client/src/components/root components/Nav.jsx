import React from 'react'
import { Link } from 'react-router'

const Nav = () => {
    return (
        <div className=" bg-base-100 shadow-md">
            <div className='w-11/12 mx-auto navbar flex-col md:flex-row justify-center text-center md:text-start gap-4'>
                <div className="flex-1">
                    <Link to="/" className="text-2xl font-semibold">Order Management Dashboard</Link>
                </div>
                <div className="flex-none">
                    <Link to="/create" className="btn btn-secondary btn-lg font-semibold text-lg">+ Create Order</Link>
                </div>
            </div>

        </div>
    )
}

export default Nav