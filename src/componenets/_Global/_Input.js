export function Input(props) {
  return (
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {props.Label}{' '}
          <span style={{ color: 'red', justifyContent: 'center' }}>
            {' '}
            *
          </span>
        </label>
        <input
          required
          value={props.State}
          onChange={e => props.Setter(e.target.value)}
          type={props.type}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
    </div>
  )
}
export function CheckFeild({ Label, Description, state, setter }) {
  return (
    <div className="flex items-start mt-2">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          defaultChecked={state}
          className="form-checkbox border border-gray-300 rounded text-blueGray-700 ml-1 w-3 h-4 ease-linear transition-all duration-150"
          value={state}
          onChange={(event) => { setter(event.target.checked) }}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          className="block uppercase text-blueGray-600 text-sm font-bold mb-1"
          htmlFor="grid-password"
        >
          {Label}

        </label>
        <p className="text-blueGray-500">{Description}</p>
      </div>
    </div>
  )
}
