import { Link } from 'react-router-dom'

export function SubmitButton(props) {
    return (
        <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="submit"
        >
            {props.Text}
        </button>
    )
}
export function LoadingButton(props) {
    return (
        <button className="bg-blueGray-700 text-white active:bg-lightBlue-400 font-bold uppercase text-md px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            disabled
        >
            {props.Text}
        </button>
    )
}
export function NavigationButton(props) {
    return (
        <Link
            to={props.To}
            className="bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        >
            {props.Text}
        </Link>
    )
}



