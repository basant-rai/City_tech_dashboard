import React, { useCallback, useState } from 'react'
import { AppConfig } from '../components/config/App.config'
import axiosInstance from '../components/utils/Axios';
import TableLayout from '../components/layout/TableLayout';



const Dashboard = () => {
  const [tableData, setTableData] = useState<any>()
  // const accessToken = jsCookie.get('city_token');

  const handleTransactions = useCallback(async () => {
    const { data } = await axiosInstance.post(`${AppConfig.api_url}/transaction-manager/v1/admin/dashboard/search`,
    )
    setTableData(data.data)

  }, [])

  return (
    <div>
      <h4 className='text-center mt-10 font-bold text-3xl'>Welcome to admin dashboard</h4>
      <div className='text-center'>
        <button onClick={handleTransactions} className='bg-indigo-500 px-3 py-1 text-white rounded-md'>
          click
        </button>
        {
          tableData &&
          <TableLayout table_data={tableData} />
        }
      </div>
    </div>
  )
}

export default Dashboard