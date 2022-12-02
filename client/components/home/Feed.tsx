import { useContext, useEffect } from 'react';
import { BsStars } from 'react-icons/bs';
import TweetBox from './TweetBox';
import Post from '../Post';

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const tweets = [
  {
    displayName: 'maecana_official',
    username: '0x6b2bB56245628862EC9426527ae80bAee7f0bbe2',
    avatar: `https://icons.iconarchive.com/icons/danieledesantis/playstation-flat/512/playstation-square-icon.png`,
    text: 'Resolution on a computer monitor is determined by how many horizontal and vertical lines are being created by the video output system of the computer. As the lines of resolution increases the size of the objects on the screen decreases. You may design your Web site based on a resolution of 1024X768 but you cannot know how the user has set the lines of resolution on her or his computer.  There resolution setting can change the size of all the text and images you put on your page. All you can do is make an assumption that most people will be using the factory preset.',
    isProfileImageNft: false,
    timestamp: '2022-02-12T07:56:00.000Z'
  },
  {
    displayName: 'maecana_official',
    username: '0x6b2bB56245628862EC9426527ae80bAee7f0bbe2',
    avatar: `https://icons.iconarchive.com/icons/danieledesantis/playstation-flat/512/playstation-square-icon.png`,
    text: 'Bonjour!',
    isProfileImageNft: false,
    timestamp: '2022-12-02T8:56:00.000Z'
  },
  {
    displayName: 'maecana_official',
    username: '0x6b2bB56245628862EC9426527ae80bAee7f0bbe2',
    avatar: `https://icons.iconarchive.com/icons/danieledesantis/playstation-flat/512/playstation-square-icon.png`,
    text: 'Hello!',
    isProfileImageNft: false,
    timestamp: '2022-12-02T8:56:00.000Z'
  }
]

export default function Feed() {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />

      {
        tweets.map((tweet, index) => (
          <Post 
            key={index}
            displayName={tweet.displayName}
            username={`${tweet.username.slice(0, 5)}...${tweet.username.slice(-5)}`}
            avatar={tweet.avatar}
            text={tweet.text}
            isProfileImageNft={tweet.isProfileImageNft}
            timestamp={tweet.timestamp}
          />
        ))
      }
    </div>
  )
}
