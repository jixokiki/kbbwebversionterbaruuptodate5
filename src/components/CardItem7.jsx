// // components/CardItem.js

// import React from 'react';

// const CardItem7 = ({
//   itemName,
//   ptName,
//   packaging,
//   price,
//   status,
//   deliveryDate,
//   stock,
// }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{itemName}</h3>
//         <h3 className="text-lg font-semibold">{ptName}</h3>
//         <p className="text-gray-600 mb-2">Kemasan: {packaging}</p>
//         {/* <p className="text-gray-600 mb-2">Harga: Rp. {price}</p> */}
//         <p className="text-gray-600 mb-2">Status: {status}</p>
//         <p className="text-gray-600 mb-2">Tanggal Jadwal Pengiriman: {deliveryDate}</p>
//         <p className="text-gray-600 mb-2">Stok: {stock}</p>
//       </div>
//     </div>
//   );
// };

// export default CardItem7;


import React from 'react';

const CardItem7 = ({
  order,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{order.namaProduct}</h3>
        <h3 className="text-lg font-semibold">{order.fullName}</h3>
        <p className="text-gray-600 mb-2">Kemasan: {order.packaging}</p>
        {/* <p className="text-gray-600 mb-2">Harga: Rp. {order.totalHarga}</p> */}
        <p className="text-gray-600 mb-2">Status: {order.statusDelivery}</p>
        <p className="text-gray-600 mb-2">Tanggal Jadwal Pengiriman: {order.deliveryDate}</p>
        <p className="text-gray-600 mb-2">Akhir Kerjasama: {order.deadlineDate}</p>
        <p className="text-gray-600 mb-2">Stok: {order.stock}</p>
        <div className="mt-4 flex justify-between">
          <button className="btn btn-primary" onClick={() => handleEdit(order)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CardItem7;


