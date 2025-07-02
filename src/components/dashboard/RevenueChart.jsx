
// import React from 'react';
// import { motion } from 'framer-motion';

// const RevenueChart = () => {
//   // Mock data for the chart
//   const revenueData = [
//     { month: 'Jan', revenue: 4500 },
//     { month: 'Feb', revenue: 5200 },
//     { month: 'Mar', revenue: 4800 },
//     { month: 'Apr', revenue: 6100 },
//     { month: 'May', revenue: 5700 },
//     { month: 'Jun', revenue: 6900 },
//   ];

//   const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-end justify-between h-48 mt-4">
//         {revenueData.map((item, index) => (
//           <motion.div
//             key={item.month}
//             initial={{ height: 0 }}
//             animate={`{ height: ${(item.revenue / maxRevenue) * 100}% }`}
//             transition={{ duration: 0.8, delay: index * 0.1 }}
//             className="flex flex-col items-center w-12"
//           >
//             <div className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg relative">
//               <div className="absolute top-0 left-0 right-0 text-center text-xs text-white font-medium py-1">
//                 ${item.revenue}
//               </div>
//             </div>
//             <div className="text-xs text-gray-500 mt-2">{item.month}</div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default RevenueChart;
import React from 'react';
import { motion } from 'framer-motion';

const RevenueChart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 4500 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6100 },
    { month: 'May', revenue: 5700 },
    { month: 'Jun', revenue: 6900 },
  ];

  const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-6"
    >
      <div className="flex items-end justify-between h-64 border-t border-gray-200 px-4">
        {revenueData.map((item, index) => {
          const barHeight = (item.revenue / maxRevenue) * 100;

          return (
            <div key={item.month} className="flex flex-col items-center w-12">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg relative"
                style={{ minHeight: '20px' }} // optional: ensures small values still show
              >
                <div className="absolute -top-6 left-0 right-0 text-center text-xs text-blue-800 font-semibold">
                  ${item.revenue}
                </div>
              </motion.div>
              <div className="text-xs text-gray-600 mt-2">{item.month}</div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RevenueChart;
