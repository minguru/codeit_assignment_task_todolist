export default function Loading() {
  return (
    <div className="fixed left-0 top-0 w-full h-full pointer-events-none bg-[rgba(0,0,0,5%)] dark:bg-[rgba(255,255,255,5%)]">
      <div className="flex justify-center items-center absolute w-full h-11/12 left-0 top-0">
        <img 
          src="/images/header-small.png" 
          srcSet="/images/header-small.png 1x, /images/header-small@2x.png 2x, /images/header-small@3x.png 3x" 
          alt="로딩중" 
          className="w-30 animate-pulse" 
        />
      </div>
    </div>
  )
}
