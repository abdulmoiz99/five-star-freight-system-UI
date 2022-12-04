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