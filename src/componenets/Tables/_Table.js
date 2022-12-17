
function Table(props) {
    return (
        <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                    <tr>
                        {props.columns?.map((column) => (
                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{props.reportReportList}</tbody>
            </table>
        </div>
    )
}
export default Table
