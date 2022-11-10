import React from 'react'
import { useSelector } from 'react-redux'
import AdNav2 from './Admin/AdNav2'
import PriNav2 from './Private/PriNav2'
import P2 from './Public/P2'

function Navbar() {
    const state = useSelector(state => state.users)
    const { userAuth } = state;
    const isAdmin = userAuth?.isAdmin
    return (
        <>
            {isAdmin ? (
                <AdNav2 isLogin={userAuth} />
            ) : userAuth ? (
                <PriNav2 isLogin={userAuth} />
            ) : (
                <P2 />)}
        </>
    )
}

export default Navbar
//@headlessui/react
//@heroicons/react
//@heroicons/react@v1