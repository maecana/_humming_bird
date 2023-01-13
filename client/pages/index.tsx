import type { NextPage } from 'next';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import Sidebar from '../components/Sidebar';
import Feed from '../components/home/Feed';
import Widgets from '../components/Widgets';
import metamaskLogo from '../assets/metamask.png';
import errorImg from '../assets/error.png';
import Image from 'next/image';


const style = {
  wrapper: `h-screen w-screen select-none`,
  content: `min-w-[180px] max-w-[1400px] w-2/3 flex flex-col justify-between items-center`,

  walletConnectButton: `text-xl text-black bg-white font-bold mb-[-2rem] mt-[2rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,

  header: `sticky top-0 z-[1] w-screen h-28 flex items-center justify-center relative`,
  footer: `absolute z-10 flex justify-left items-center p-10 bottom-0 inset-x-0 h-30 w-3/4 left-[50%] translate-x-[-50%]`,
  
  grid: `text-left w-64 pb-6 text-neutral-500`,
  lines: `border-neutral-500 w-40 border-solid m-4`,
  verticalLine: `absolute z-0 bg-neutral-800 border-solid border-transparent border-l-neutral-800 border-[.01em]`,

  watermark: `absolute z-0 bottom-1 inset-x-0 leading-none flex justify-left items-end text-[20em] tracking-[-0.16em] font-light text-neutral-900 overflow-hidden px-6 py-4`,
  hero: `w-full col-span-2 m-auto`,
  textLogo: `tracking-[.19em] font-medium px-10`
}


const Home: NextPage = () => {
  const { appStatus, wallectConnect } = useContext(MainContext);

  const app = (status = appStatus) => {
    switch (status) {
      case 'connected':
        return isLoggedIn;

      case 'not-connected':
        return noUserFound;

      case 'no-metamask-found':
        return noMetaMaskFound;

      case 'error':
        return error;

      default:
        return loading;
    }
  }

  const _header = (
    <div className={style.header}>
      <div className='w-2/3'>
        <div className={`${style.verticalLine} h-28 top-0`}></div>
        <h1 className={style.textLogo}>_humming.bird</h1>
      </div>
    </div>
  );

  const _hero = (
    <div className={style.hero}>
      <p className="text-4xl">Connect <span className='text-neutral-500'>your Wallet</span></p>
      <p className="mt-2 text-4xl"><span className='text-neutral-500'>Mint your own</span> NFTs</p>

      <h1 className='mt-20 text-9xl font-bold'>Hum Away!</h1>
    </div>
  )

  const _watermark = (
    <div className={style.watermark}>
      <h1>_humming.bird</h1>
    </div>
  )

  const _footer = (
    <div className={style.footer}>
      <div className={`${style.verticalLine} bottom-0 h-16`}></div>
      <div>
        <div className='flex justify-left items-center mb-3'><h1 className='font-bold text-neutral-300 text-xl'>01</h1> <hr className={style.lines}  /></div>
        <div className={style.grid}>
          <p>A flock of hummingbirds can be referred to as a bouquet, a glittering, a hover, a shimmer, or a tune.</p>
        </div>
      </div>
    </div>
  );

  const isLoggedIn = (
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </div>
  );
  
  const noUserFound = (
    <>
      {_header}

      <div className='mt-auto mb-auto h-3/5 left-auto right-auto flex justify-center items-center'>
        <div className='w-2/3'>
          <section className='grid grid-cols-2 grid-flow-col gap-4'>
            {_hero}

            <div className='w-full flex flex-col justify-center items-center mb-28'>
              <Image alt="Metamask" src={metamaskLogo} width={200} height={200} />
              <div className={style.walletConnectButton} onClick={() => wallectConnect()}>
                Connect to Metamask
              </div>
            </div>

          </section>
        </div>
      </div>


      {_footer}
      {/* {_watermark} */}
    </>
  )

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image alt="Metamask" src={metamaskLogo} width={200} height={200} />
      <div className={style.loginContent}>
        <a
          target='_blank'
          rel='noreferrer'
          href={`https://metamask.io/download.html`}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your
          browser.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <Image alt="Error" src={errorImg} width={250} height={200} />
      <div className={style.loginContent}>
        An error occurred. Please try again later or from another browser.
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  )

  return (
    <div className={style.wrapper}>
      {app(appStatus)}
    </div>
  )
}

export default Home;
