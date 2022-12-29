import { useRouter } from 'next/router';
import { useContext } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';

import { MainContext } from '../../context/MainContext';

const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
  secondary: `text-[#8899a6] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[15vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
  profileImage: `object-cover rounded-full h-full`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-3`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`,
};

export default function ProfileHeader() {
  const router = useRouter();
  const { currentWalletAddress, currentUserDetails } = useContext(MainContext);
  
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        
        <div onClick={() => router.push('/')} className={style.backButton}>
          <BsArrowLeftShort />
        </div>

        <div className={style.details}>
          <div className={style.primary}>
            {
              currentUserDetails.name === 'Unknown' ?
                currentUserDetails.name : 
                `${currentWalletAddress.slice(0, 5)}...${currentWalletAddress.slice(-5)}`
            }
          </div>
          <div className={style.secondary}>{currentUserDetails.hums?.length} Tweet{currentUserDetails.hums?.length > 1 ? `s` : ``}</div>
        </div>
      </div>

      <div className={style.coverPhotoContainer}>
        <img src={currentUserDetails.coverImage} className={style.coverPhoto} alt="Cover" />
      </div>

      <div className={style.profileImageContainer}>
        <div className={currentUserDetails.isProfileImageNft ? 'hex' : style.profileImageContainer}>
            <img
              src={currentUserDetails.profileImage}
              alt="Display Picture"
              className={currentUserDetails.isProfileImageNft ? style.profileImageNft : style.profileImage}
            />
        </div>
      </div>

      <div className={style.details}>
        <div className={style.primary}>
          {
            currentUserDetails.name === 'Unknown' ?
              currentUserDetails.name : 
              `@${currentWalletAddress.slice(0, 5)}...${currentWalletAddress.slice(-5)}`
          }
        </div>
        <div className={style.secondary}>{currentWalletAddress && `@${currentWalletAddress.slice(0, 5)}...${currentWalletAddress.slice(-5)}`}</div>
      </div>

      <div className={style.nav}>
        <div className={style.activeNav}>Tweets</div>
        <div>Tweets & Replies</div>
        <div>Media</div>
        <div>Likes</div>
      </div>

    </div>
  )
}
