export function NoRecordCheck({ data, colCount }) {
    if (Array.isArray(data) && data?.length === 0) {
        return (
            < tr >
                <td colSpan={colCount}
                    className="border-t-0 align-middle text-center text-xl border-l-0 border-r-0 text-sm whitespace-nowrap p-4  font-bold text-blueGray-500"
                    style={{ padding: "50px" }}
                >
                    NO RECORD TO DISPLAY
                </td>
            </tr >
        )
    }
}
export function TableHeader({ Text }) {
    return (
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left flex items-center">
            <span className="font-bold text-blueGray-600"  >
                {Text}
            </span>
        </th>
    )
}
export function TableData({ Text }) {
    return (
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            {Text}
        </td>
    )
}
