import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileTweets from "../components/profile/ProfileTweets"
import Sidebar from "../components/Sidebar"
import Widgets from "../components/Widgets"


const style = {
    wrapper: `flex justify-center h-100 w-100 select-none bg-[#0a0213] text-white`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d]`,
}

export default function profile() {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar />
        <div className={style.mainContent}>
          <ProfileHeader />
          <ProfileTweets />
        </div>
        <Widgets />
      </div>
    </div>
  )
}
