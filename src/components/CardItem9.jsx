import React from 'react';

const CardItem9 = ({ order, handleEdit, handleEdit2 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{order.namaProduct}</h3>
        <h3 className="text-lg font-semibold">{order.fullName}</h3>
        <p className="text-gray-600 mb-2">Kemasan: {order.packaging}</p>
        <p className="text-gray-600 mb-2">Status: {order.statusDelivery}</p>
        <p className="text-gray-600 mb-2">Tanggal Jadwal Pengiriman: {order.deliveryDate}</p>
        <p className="text-gray-600 mb-2">Akhir Kerjasama: {order.deadlineDate}</p>
        <p className="text-gray-600 mb-2">Stok: {order.stock}</p>
        <div className="mt-4 flex justify-between">
          {order.statusDelivery === "menunggu dikirim" && (
            <button className="btn btn-primary" onClick={() => handleEdit(order, "dikirim")}>Dikirim</button>
          )}
          {order.statusDelivery === "dikirim" && (
            <button className="btn btn-primary" onClick={() => handleEdit2(order, "diproses")}>Selesai</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem9;
