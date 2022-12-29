import { useState, useContext, MouseEvent } from 'react';
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs';
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlineLocationOn } from 'react-icons/md';

import { MainContext } from '../../context/MainContext';
import { client } from '../../lib/client';

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#c7206b] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#5e253e] text-[#95999e]`,
  activeSubmit: `bg-[#c7206b] text-white`,
}

export default function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState<any | null>();
  const { currentWalletAddress } = useContext(MainContext);
  
  const postMessage = async (event: any) => {
    event.preventDefault();

    if (!tweetMessage) return;

    const tweetId = `${currentWalletAddress}_${Date.now()}`;
    const tweetDoc = {
      _type: 'hums',
      _id: tweetId,
      hum: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      bird: {
        _key: tweetId,
        _type: 'reference',
        _ref: currentWalletAddress,
      }
    }

    await client.createIfNotExists(tweetDoc);
    await client.patch(currentWalletAddress)
      .setIfMissing({ hums: [] })
      .insert('after', 'hums[-1]', [
        {
          _key: tweetId,
          _type: 'reference',
          _ref: tweetId
        }
      ])
      .commit();
    
    setTweetMessage('');
  }


  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src="https://icons.iconarchive.com/icons/danieledesantis/playstation-flat/512/playstation-square-icon.png"
          alt="Display Picture"
          className={style.profileImage}
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            className={style.inputField}
            placeholder="What's new?"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          ></textarea>
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type="submit"
              onClick={(event) => postMessage(event)}
              className={`${style.submitGeneral} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit}`}>Tweet</button>
          </div>
        </form>
      </div>
    </div>
  )
}
