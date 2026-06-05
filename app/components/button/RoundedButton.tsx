export default function RoundedButton({
  onClickEvent,
  type,
  alt,
  isNothing,
  isEnterPressed
}: {
  onClickEvent: () => void,
  type: 'add' | 'edit' | 'done-edit' | 'delete',
  alt?: string,
  isNothing?: boolean,
  isEnterPressed?: boolean
}) {
  return (
    <button 
      className={`
        relative leading-none hover:cursor-pointer w-full py-4 text-center rounded-3xl flex justify-center gap-1 border-2 border-solid border-[var(--slate-900)] left-0 top-0 transition-all ease-out duration-100 outline-none font-bold 

        before:content-[''] before:box-content before:block before:w-full before:h-full before:bg-[var(--slate-900)] before:absolute before:left-[3.65px] before:top-1 before:-z-1 before:rounded-3xl before:border-2 before:border-solid before:border-[var(--slate-900)] before:transition-all before:ease-out before:duration-100 

        active:top-1 active:left-[3.65px] active:before:left-0 active:before:top-0 
        
        [&.pressed]:top-1 [&.pressed]:left-[3.65px] [&.pressed]:before:left-0 [&.pressed]:before:top-0 
        
        ${type === 'add' ? `text-[0px] sm:text-base max-w-[56px] sm:max-w-[168px]` : `text-base max-w-[168px]`} 

        ${ isEnterPressed ? `pressed` : ``}

        dark:border-[var(--slate-800)] dark:before:bg-[var(--slate-800)] dark:before:border-[var(--slate-800)]
      `}
      style={{
        backgroundColor: `${
          type === 'add' && isNothing ?
          `var(--violet-600)`
          : type === 'add' && !isNothing ?
          `var(--slate-200)`
          : type === 'edit' ?
          `var(--slate-200)`
          : type === 'done-edit' ?
          `var(--lime-300)`
          : type === 'delete' ?
          `var(--rose-500)`
          : `var(--slate-900)`
        }`,
        color: `${
          (type === 'add' && isNothing) || type === 'delete' ?
          `#ffffff`
          : type === 'edit' || type === 'done-edit' || (type === 'add' && !isNothing) ?
          `var(--slate-900)`
          : `var(--slate-100)`
        }`
      }}
      onClick={onClickEvent}
    >
      <img src={
          (type === 'add' && isNothing) ?
          `/icon/plus.svg`
          : (type === 'add' && !isNothing) ?
          `/icon/plus-dark.svg`
          : type === 'delete' ?
          `/icon/x.svg`
          : type === 'edit' || type === 'done-edit' ?
          `/icon/check.svg`
          : ``
        } 
        alt={alt} 
        width={16} 
        height={16} 
      />
      {
        type === 'add' ?
        `추가하기`
        : type === 'edit' || type === 'done-edit' ?
        `수정 완료`
        : type === 'delete' ?
        `삭제하기`
        : ``
      }
    </button>
  )
}
