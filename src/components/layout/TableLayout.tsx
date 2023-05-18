import React from 'react'

const TableLayout = ({ table_data }: any) => {
  console.log(table_data)
  return (
    <div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                id
              </th>
              <th scope="col" className="px-6 py-3">
                Current Status
              </th>
              <th scope="col" className="px-6 py-3">
                Receive Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Receive Country
              </th>
              <th scope="col" className="px-6 py-3">
                Receiver Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Send Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Send Country
              </th>
              <th scope="col" className="px-6 py-3">
                Sender Full Name
              </th>
            </tr>
          </thead>
          <tbody>
            {
              table_data.map((data: any, index: any) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.id}
                  </th>
                  <td className="px-6 py-4">
                    Silver
                  </td>
                  <td className="px-6 py-4">
                    Laptop
                  </td>
                  <td className="px-6 py-4">
                    $2999
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default TableLayout