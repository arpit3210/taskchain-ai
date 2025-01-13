// // src/components/DatabaseStatus.tsx
// import React, { useState, useEffect } from 'react';
// import { getDatabaseStatus } from '@/lib/mongodb';

// export function DatabaseStatus() {
//   const [status, setStatus] = useState<{
//     isConnected: boolean;
//     uri?: string;
//     error?: string;
//   } | null>(null);

//   useEffect(() => {
//     async function checkDatabaseStatus() {
//       try {
//         console.log('Checking database status...');
//         const result = await getDatabaseStatus();
//         console.log('Database status result:', result);
//         setStatus(result);
//       } catch (error) {
//         console.error('Error checking database status:', error);
//         setStatus({
//           isConnected: false,
//           error: error instanceof Error ? error.message : 'Unknown error'
//         });
//       }
//     }
//     checkDatabaseStatus();
//   }, []);

//   if (!status) return <div>Checking database connection...</div>;

//   return (
//     <div className="database-status p-4 bg-gray-100 rounded-lg">
//       <h3 className="font-bold mb-2">Database Connection</h3>
//       {status.isConnected ? (
//         <div className="text-green-600">
//           ✅ Connected to MongoDB
//           {status.uri && <p className="text-xs truncate">URI: {status.uri}</p>}
//         </div>
//       ) : (
//         <div className="text-red-600">
//           ❌ Database Connection Failed
//           {status.error && <p className="text-xs">{status.error}</p>}
//         </div>
//       )}
//     </div>
//   );
// }