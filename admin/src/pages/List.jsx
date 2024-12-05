// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'


// const List = ({token}) => {

//   const [list,setList] = useState([])

//   const fetchList = async () => {
//     try {

//       const response = await axios.get(backendUrl + '/api/product/list')
//       if(response.data.success ){
//       setList(response.data.products);
//       }
//       else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   }

//   const removeProduct = async (id) => {
//     try {

//       const response = await axios.post(backendUrl + '/api/product/remove',{id} , {headers:{token}})

//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList();
//       } else {
//         toast.error(response.data.message)
//       }
      
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }



//   useEffect(()=>{
//     fetchList()
//   },[])


//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>
//         {/* LIIIIIIIIIISTTTTTTT TABLE TITLE */}

//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>IMAGE</b>
//           <b>NAME</b>
//           <b>CATEGORY</b>
//           <b>PRICE</b>
//           <b className='text-center'>ACTION</b>
//         </div>

//         {/* PRODUCT LISTS */}

//         {
//           list.map((item,index) => (

//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
//               <img className='w-12' src={item.image[0]} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p onClick={()=>removeProduct(item._id)}className='text-right md:text-center cursor-pointer text-lg'>X</p>


//             </div>

//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default List

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import MUIDataTable from "mui-datatables";

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeSelectedProducts = async () => {
    try {
      if (selectedRows.length > 0) {
        const ids = selectedRows.map(row => list[row.index]._id)
        const response = await axios.post(backendUrl + '/api/product/bulk-remove', { ids }, { headers: { token } })
        if (response.data.success) {
          toast.success(response.data.message)
          await fetchList();
        } else {
          toast.error(response.data.message)
        }
      } else {
        toast.error('No products selected')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const columns = [
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (value) => <img className="w-12" src={value[0]} alt="" />
      }
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "category",
      label: "Category",
    },
    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (value) => `${currency}${value}`
      }
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <button
              onClick={() => removeProduct(list[tableMeta.rowIndex]._id)}
              className="text-red-600 cursor-pointer"
            >
              Remove
            </button>
          );
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: 'multiple',
    onRowsSelect: (rowsSelected) => setSelectedRows(rowsSelected),
    rowsPerPageOptions: [5, 10, 20],
    expandableRows: true,
    expandableRowsHeader: false,
    renderExpandableRow: (rowData, rowMeta) => {
      const product = list[rowMeta.dataIndex];
      return (
        <tr>
          <td colSpan={6}>
            <div className="p-4 bg-gray-100">
              <strong>Description: </strong>
              <p>{product.description}</p>
            </div>
          </td>
        </tr>
      );
    }
  };

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <button
        onClick={removeSelectedProducts}
        className="bg-red-600 text-white p-2 rounded mb-4"
      >
        Bulk Delete
      </button>
      <MUIDataTable
        title={"Product List"}
        data={list}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default List;



