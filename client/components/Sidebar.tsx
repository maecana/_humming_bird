import Link from 'next/link';
import { useState } from 'react';
import { VscTwitter } from 'react-icons/vsc';
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri';
import { BiHash } from 'react-icons/bi';
import { FiBell, FiMoreHorizontal } from 'react-icons/fi';
import { HiOutlineMail, HiMail } from 'react-icons/hi';
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa';
import { CgMoreO } from 'react-icons/cg';
import {
    BsBookmark,
    BsBookmarkFill,
    BsPerson,
    BsPersonFill,
} from 'react-icons/bs';
import SidebarOption from './SidebarOption';


const style = {
    wrapper: `flex-[0.7] px-8 flex flex-col`,
    twitterIconContainer: `text-3xl m-4`,
    tweetButton: `bg-[#c7206b] hover:bg-[#8a2753] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45]  rounded-[100px] p-2`,
    profileLeft: `flex item-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex flex-1`,
    details: `flex-1`,
    name: `text-lg`,
    handle: `text-[#8899a6]`,
    moreContainer: `flex items-center mr-2`
}

function Sidebar({initialSelectedIcon = 'Home'}) {
    const [selected, setSelected] = useState(initialSelectedIcon);

    return (
        <div className={style.wrapper}>
            <div className={style.twitterIconContainer}>
                <img src='/logo_white.png' width={40} />
            </div>
            <div className={style.navContainer}>
                <SidebarOption
                    text='Home'
                    Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
                    isActive={Boolean(selected === 'Home')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Explore'
                    Icon={selected === 'Explore' ? FaHashtag : BiHash}
                    isActive={Boolean(selected === 'Explore')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Notifications'
                    Icon={selected === 'Notifications' ? FaBell : FiBell}
                    isActive={Boolean(selected === 'Notifications')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Messages'
                    Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
                    isActive={Boolean(selected === 'Messages')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Bookmarks'
                    Icon={selected === 'Bookmarks' ? BsBookmarkFill : BsBookmark}
                    isActive={Boolean(selected === 'Bookmarks')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Lists'
                    Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
                    isActive={Boolean(selected === 'Lists')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='Profile'
                    Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
                    isActive={Boolean(selected === 'Profile')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <SidebarOption
                    text='More'
                    Icon={CgMoreO}
                    isActive={Boolean(selected === 'More')}
                    setSelected={setSelected}
                    redirect={'/'}
                />
                <div className={style.tweetButton}>Mint</div>
            </div>
            <div className={style.profileButton}>
                <div className={style.profileLeft}></div>
                <div className={style.profileRight}>
                    <div className={style.details}>
                        <div className={style.name}>maecana.official</div>
                        <div className={style.handle}>@0x22f...3xe335</div>
                    </div>
                    <div className={style.moreContainer}>
                        <FiMoreHorizontal />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
