import { useContext } from 'react';
import { BsStars } from 'react-icons/bs';
import TweetBox from './TweetBox';
import Post from '../Post';
import { MainContext } from '../../context/MainContext';

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#0a0213] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

export default function Feed() {
  const { hums } = useContext(MainContext);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />

      {
        hums.map((hum: any, index: number) => (
          <Post
            key={index}
            displayName={
              hum.name === 'Unknown' ?
              `${hum.bird.walletAddress.slice(0, 5)}...${hum.bird.walletAddress.slice(-5)}` :
              hum.bird.name
            }
            username={`${hum.bird.walletAddress.slice(0, 5)}...${hum.bird.walletAddress.slice(-5)}`}
            avatar={hum.bird.profileImage}
            text={hum.hum}
            isProfileImageNft={hum.bird.isProfileImageNFT}
            timestamp={hum.timestamp}
          />
        ))
      }
    </div>
  )
}
