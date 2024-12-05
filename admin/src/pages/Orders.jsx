

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { backendUrl, currency } from '../App';

// Import Chart.js and components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [monthlySales, setMonthlySales] = useState(Array(12).fill(0)); // Initialize with 0 sales for 12 months

  // Fetch orders from the backend
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders); // Save orders
        calculateMonthlySales(response.data.orders); // Calculate sales for the chart
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Calculate monthly sales from orders
  const calculateMonthlySales = (orders) => {
    const monthlyTotals = Array(12).fill(0);
    orders.forEach((order) => {
      const month = new Date(order.date).getMonth(); // Get month (0-11)
      monthlyTotals[month] += order.amount; // Sum up the amounts for each month
    });
    setMonthlySales(monthlyTotals);
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchAllOrders(); // Refresh orders after status update
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch orders on component mount or token change
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Chart data and options
  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlySales,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <h3>Order Page</h3>

      {/* Orders List */}
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, i) => (
                  <p className="py-0.5" key={i}>
                    {item.name} x {item.quantity}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="OrderPlaced">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="mt-10">
        <h3>Monthly Sales Chart</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Orders;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { backendUrl, currency } from '../App';

// // Import Chart.js and components
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
//   const [monthlySales, setMonthlySales] = useState(Array(12).fill(0)); // Initialize with 0 sales for 12 months

//   // Fetch orders from the backend
//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders); // Save orders
//         calculateMonthlySales(response.data.orders); // Calculate sales for the chart
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Calculate monthly sales from orders
//   const calculateMonthlySales = (orders) => {
//     const monthlyTotals = Array(12).fill(0);
//     orders.forEach((order) => {
//       const month = new Date(order.date).getMonth(); // Get month (0-11)
//       monthlyTotals[month] += order.amount; // Sum up the amounts for each month
//     });
//     setMonthlySales(monthlyTotals);
//   };

//   // Update order status and trigger email notification
//   const statusHandler = async (event, orderId) => {
//     try {
//       const newStatus = event.target.value;

//       const response = await axios.post(
//         `${backendUrl}/api/order/status`,
//         { orderId, status: newStatus },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success('Order status updated and email sent to the customer!');
//         fetchAllOrders(); // Refresh orders
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Fetch orders on component mount or token change
//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   // Chart data and options
//   const chartData = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ],
//     datasets: [
//       {
//         label: 'Monthly Sales',
//         data: monthlySales,
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderWidth: 2,
//         tension: 0.3, // Smooth curve
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: 'top' },
//     },
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };

//   return (
//     <div>
//       <h3>Order Page</h3>

//       {/* Orders List */}
//       <div>
//         {orders.map((order, index) => (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//             key={index}
//           >
//             <img className="w-12" src={order.image} alt="Order" />
//             <div>
//               <div>
//                 {order.items.map((item, i) => (
//                   <p className="py-0.5" key={i}>
//                     {item.name} x {item.quantity}
//                   </p>
//                 ))}
//               </div>
//               <p className="mt-3 mb-2 font-medium">
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <div>
//                 <p>{order.address.street},</p>
//                 <p>
//                   {order.address.city}, {order.address.state},{' '}
//                   {order.address.country}, {order.address.zipcode}
//                 </p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//               <p>Items: {order.items.length}</p>
//               <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p>
//               {currency}
//               {order.amount}
//             </p>
//             {/* Dropdown to update status */}
//             <select
//               onChange={(event) => statusHandler(event, order._id)}
//               value={order.status}
//             >
//               <option value="OrderPlaced">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>

//       {/* Sales Chart */}
//       <div className="mt-10">
//         <h3>Monthly Sales Chart</h3>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default Orders;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';
// import { backendUrl, currency } from '../App';

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   // Fetch orders from the backend
//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {},
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders); // Save orders
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Update order status and trigger email
//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/status`,
//         { orderId, status: event.target.value },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success('Order status updated and email sent to the customer!');
//         fetchAllOrders(); // Refresh orders
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to update order status or send email.');
//       console.error(error);
//     }
//   };

//   // Fetch orders on component mount or token change
//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>

//       {/* Orders List */}
//       <div>
//         {orders.map((order, index) => (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//             key={index}
//           >
//             <img className="w-12" src={assets.parcel_icon} alt="" />
//             <div>
//               <div>
//                 {order.items.map((item, i) => (
//                   <p className="py-0.5" key={i}>
//                     {item.name} x {item.quantity}
//                   </p>
//                 ))}
//               </div>
//               <p className="mt-3 mb-2 font-medium">
//                 {order.address.firstName} {order.address.lastName}
//               </p>
//               <div>
//                 <p>{order.address.street},</p>
//                 <p>
//                   {order.address.city}, {order.address.state},{' '}
//                   {order.address.country}, {order.address.zipcode}
//                 </p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//               <p>Items: {order.items.length}</p>
//               <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
//               <p>Date: {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p>
//               {currency}
//               {order.amount}
//             </p>

//             {/* Status Dropdown */}
//             <select
//               onChange={(event) => statusHandler(event, order._id)} // Link the dropdown to the status handler
//               value={order.status}
//             >
//               <option value="OrderPlaced">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
