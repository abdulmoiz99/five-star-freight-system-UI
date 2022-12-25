import { Link } from 'react-router-dom'

export function SubmitButton({ Text }) {
    return (
        <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
        >
            {Text}
        </button>
    )
}
export function LoadingButton({ Text }) {
    return (
        <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            disabled
        >
            <div className="flex">
                <svg className="loading pr-15" width="25" height="25" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="0.1" fill="none" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
                <span style={{ paddingleft: "50px" }} className="pl-2">     {Text}</span>
            </div>
        </button>
    )
}
export function NavigationButton({ To, Text }) {
    return (
        <Link
            to={To}
            className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        >
            {Text}
        </Link>
    )
}

export function ActionButton({ Text, Action, Color }) {
    //set Default color
    Color ??= "bg-lightBlue-500"
    return (
        <button
            className={`transition ${Color} text-white active:${Color} font-bold uppercase text-md px-4 py-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150`}
            onClick={Action}
        >
            {Text}
        </button>
    )
}

export function SideBarButton(props) {
    return (
        <Link
            className={
                'flex items-center p-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ' +
                (window.location.href.indexOf(props.To) !== -1
                    ? 'border-r-4 border-blue-400  bg-gray-200 '
                    : 'rounded-md')
            }
            to={props.To}
        >
            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>

            <span class="ml-3">{props.Text}</span>
        </Link>
    )
}
export function RoundedButton({ Text, Handler }) {
    return (
        <div class="w-full px-4 pb-4">
            <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={Handler}>
                {Text}
            </button>
        </div>
    )
}
