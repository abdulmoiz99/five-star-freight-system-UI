import makeAnimated from "react-select/animated";
import MultiSelect from './MultiSelect'

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
export function FileInput({ onChange, file, Description }) {
  return (
    <div class="w-full px-4 pb-4">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          {file.name ?
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">{file.name}</span></p>
            :
            <>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to Upload File</span> </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{Description}</p>
            </>
          }
        </div>
        <input id="dropzone-file" type="file" class="hidden" onChange={onChange} />
      </label>
    </div>
  )
}

const animatedComponents = makeAnimated();
export function SelectMultiple({ Label, List, Handler, Value }) {
  return (
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
          {Label}
          <span style={{ color: 'red', justifyContent: 'center' }}>
            {' '}
            *
          </span>
        </label>
        <MultiSelect
          options={List}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={animatedComponents}
          onChange={Handler}
          allowSelectAll={true}
          value={Value}
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
          className="form-checkbox border border-gray-300 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
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
