import { useContext } from 'react';

import { MainContext } from '../../context/MainContext';
import Post from "../Post";


const style = {
    wrapper: `no-scrollbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}

export default function ProfileTweets() {
  const { currentWalletAddress, currentUserDetails } = useContext(MainContext);

  return (
    <div className={style.wrapper}>
        {currentUserDetails.hums?.map((hum: any, index: number) => (
            <Post
                key={index}
                displayName={
                  currentUserDetails.name == 'Unknown'
                    ? `${currentWalletAddress.slice(0, 5)}...${currentWalletAddress.slice(-5)}`
                    : currentUserDetails.name
                }
                username={`${currentWalletAddress.slice(0, 5)}...${currentWalletAddress.slice(-5)}`}
                avatar={currentUserDetails.profileImage}
                text={hum.hum}
                isProfileImageNft={hum.isProfileImageNft}
                timestamp={hum.timestamp} />
        ))}
    </div>
  )
}
