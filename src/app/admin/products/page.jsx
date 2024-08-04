// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import Navbar from "@/components/Navbar";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { db, storage } from "@/firebase/firebase";
// import {
//   collection, doc, onSnapshot, serverTimestamp, setDoc, updateDoc,
// } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Purchase = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
  
//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);

//   const [file, setFile] = useState(null);
//   const [itemName, setItemName] = useState("");
//   const [category, setCategory] = useState("fikom");
//   const [quantity, setQuantity] = useState("");
//   const [status, setStatus] = useState("ready");
//   const [price, setPrice] = useState("");
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);
//   const [priceInput, setPriceInput] = useState({});

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "pembelian1"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     return () => {
//       unsub();
//     };
//   }, []);

//   const uploadFile = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storageRef = ref(
//         storage,
//         "pembelian1/" +
//         new Date().getTime() +
//         file.name.replace(" ", "%20") +
//         "KBB"
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setPercentage(progress);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleAddPurchase = async (e) => {
//     e.preventDefault();

//     try {
//       const downloadURL = await uploadFile(file);
//       const purchaseData = {
//         id: new Date().getTime() + user.uid + "PEMBELIAN",
//         image: downloadURL,
//         itemName: itemName,
//         category: category,
//         quantity: quantity,
//         status: status,
//         price: price,
//       };

//       await setDoc(doc(db, "pembelian1", purchaseData.id), {
//         ...purchaseData,
//         timeStamp: serverTimestamp(),
//       });

//       setFile(null);
//       setItemName("");
//       setCategory("fikom");
//       setQuantity("");
//       setStatus("ready");
//       setPrice("");
//       setPercentage(null);
//       alert("Pembelian berhasil ditambahkan!");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAccPurchase = async (id) => {
//     try {
//       const purchaseDocRef = doc(db, "pembelian1", id);
//       const price = priceInput[id];
//       await updateDoc(purchaseDocRef, { status: "pembelian di acc", price: price });
//       alert("Status pembelian berhasil diubah!");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePriceChange = (id, value) => {
//     setPriceInput(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   return (
//     <div className="w-[100%] mx-auto mt-32">
//       <NavbarAdmin />
//       <div className="w-[90%] flex justify-center items-center gap-3 mb-10">
//         <h1 className="text-3xl font-semibold mb-3">Request Order</h1>
//       </div>
//       <div className="w-[90%] mx-auto mt-10">
//         <h2 className="text-2xl font-semibold mb-5">Request Order List</h2>
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Image</th>
//                 <th>Item Name</th>
//                 <th>Category</th>
//                 <th>Quantity</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>TimeStamp</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((purchase, index) => (
//                 <tr key={purchase.id}>
//                   <th>{index + 1}</th>
//                   <td>
//                     <img src={purchase.image} alt={purchase.itemName} width="50" />
//                   </td>
//                   <td>{purchase.itemName}</td>
//                   <td>{purchase.category}</td>
//                   <td>{purchase.quantity}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={priceInput[purchase.id] || ""}
//                       onChange={(e) => handlePriceChange(purchase.id, e.target.value)}
//                       className="input input-bordered w-full"
//                     />
//                   </td>
//                   <td>{purchase.status}</td>
//                   <td>
//                     {purchase.timeStamp
//                       ? new Date(purchase.timeStamp.seconds * 1000).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   <td>
//                     {purchase.status === "ready" && (
//                       <button
//                         className="btn btn-success"
//                         onClick={() => handleAccPurchase(purchase.id)}
//                       >
//                         Acc
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       </div>
//   );
// };

// export default Purchase;



// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import Footer from "@/components/Footer";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { db, storage } from "@/firebase/firebase";
// import {
//   collection,
//   doc,
//   onSnapshot,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Purchase = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);

//   const [file, setFile] = useState(null);
//   const [productName, setProductName] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [contact, setContact] = useState("");
//   const [quantityRice, setQuantityRice] = useState("");
//   const [packageCategory, setPackageCategory] = useState("");
//   const [packageQuantity, setPackageQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "pembelian1"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     return () => {
//       unsub();
//     };
//   }, []);

//   const uploadFile = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storageRef = ref(
//         storage,
//         "pembelian1/" +
//           new Date().getTime() +
//           file.name.replace(" ", "%20") +
//           "KBB"
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setPercentage(progress);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleAddPurchase = async (e) => {
//     e.preventDefault();

//     try {
//       const downloadURL = file ? await uploadFile(file) : null;
//       const purchaseData = {
//         id: new Date().getTime() + user.uid + "PEMBELIAN",
//         image: downloadURL,
//         productName: productName,
//         deliveryAddress: deliveryAddress,
//         contact: contact,
//         quantityRice: quantityRice,
//         packageCategory: packageCategory,
//         packageQuantity: packageQuantity,
//         price: price,
//         status: "pending",
//         timeStamp: serverTimestamp(),
//       };

//       await setDoc(doc(db, "pembelian1", purchaseData.id), purchaseData);

//       setFile(null);
//       setProductName("");
//       setDeliveryAddress("");
//       setContact("");
//       setQuantityRice("");
//       setPackageCategory("");
//       setPackageQuantity("");
//       setPrice("");
//       setPercentage(null);
//       alert("Order request successfully added!");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handlePriceChange = async (newValue, itemId) => {
//     try {
//       await updateDoc(doc(db, "pembelian1", itemId), { price: newValue });
//       const newData = data.map((item) =>
//         item.id === itemId ? { ...item, price: newValue } : item
//       );
//       setData(newData);
//     } catch (error) {
//       console.log("Error updating price:", error);
//     }
//   };

//   const handleAcceptOrder = async (itemId) => {
//     try {
//       await updateDoc(doc(db, "pembelian1", itemId), { status: "silahkan melakukan pembayaran" });
//       alert("Order accepted successfully!");
//     } catch (error) {
//       console.log("Error accepting order:", error);
//     }
//   };

//   return (
//     <div className="w-[100%] mx-auto mt-32">
//       <NavbarAdmin />
//       <div className="w-[90%] mx-auto mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Order Requests</h2>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Delivery Address</th>
//               <th>Contact</th>
//               <th>Quantity of Rice</th>
//               <th>Package Category</th>
//               <th>Package Quantity</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Time Stamp</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.productName}</td>
//                 <td>{item.deliveryAddress}</td>
//                 <td>{item.contact}</td>
//                 <td>{item.quantityRice}</td>
//                 <td>{item.packageCategory}</td>
//                 <td>{item.packageQuantity}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={item.price}
//                     onChange={(e) => handlePriceChange(e.target.value, item.id)}
//                     className="input input-bordered w-full"
//                   />
//                 </td>
//                 <td>{item.status}</td>
//                 <td>{item.timeStamp?.toDate().toString()}</td>
//                 <td>
//                   {item.status === "product" && (
//                     <button
//                       onClick={() => handleAcceptOrder(item.id)}
//                       className="btn btn-sm btn-primary"
//                     >
//                       Accept
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Purchase;

//code sebelumnya
// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { db, storage } from "@/firebase/firebase";
// import {
//   collection,
//   doc,
//   onSnapshot,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Purchase = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);

//   const [file, setFile] = useState(null);
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);
//   const [namaProduct, setNamaProduct] = useState(""); // State untuk nama produk
//   const [address, setAddress] = useState(""); // State untuk alamat pengiriman
//   const [selectedItems, setSelectedItems] = useState([]); // State untuk menyimpan item yang dipilih

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "userRequestOrder"),
//       (snapshot) => {
//         let list = [];
//         snapshot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ref: doc.ref, ...doc.data() });
//         });
//         setData(list);

//         // Set nilai awal untuk nama produk dan alamat berdasarkan data pertama dari snapshot
//         if (list.length > 0) {
//           setNamaProduct(list[0].namaProduct || ""); // Mengambil nilai nama produk
//           setAddress(list[0].address || ""); // Mengambil nilai alamat pengiriman
//         }
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     return () => {
//       unsub();
//     };
//   }, []);

//   const handleCheckboxChange = (itemId) => {
//     const selectedIndex = selectedItems.indexOf(itemId);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selectedItems, itemId);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selectedItems.slice(1));
//     } else if (selectedIndex === selectedItems.length - 1) {
//       newSelected = newSelected.concat(selectedItems.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selectedItems.slice(0, selectedIndex),
//         selectedItems.slice(selectedIndex + 1)
//       );
//     }

//     setSelectedItems(newSelected);
//   };

//   const handleSendToGudang = async (e) => {
//     e.preventDefault();

//     try {
//       // Update status for selected items
//       for (const itemId of selectedItems) {
//         const selectedData = data.find((item) => item.id === itemId);

//         if (selectedData) {
//           await updateDoc(selectedData.ref, {
//             status: "pengecekan stock",
//           });
//         }
//       }

//       alert("Status updated to pengecekan stock!");
//       setSelectedItems([]);
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="w-[100%] mx-auto mt-32">
//       <NavbarAdmin />
//       <div className="w-[90%] mx-auto mt-10">
//         <h2 className="text-2xl font-semibold mb-4">Pesanan</h2>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th>Pilih</th>
//               <th>Nama Beras</th>
//               <th>Alamat Pengiriman</th>
//               <th>Kontak</th>
//               <th>Kategori Kemasan</th>
//               <th>Jumlah Kemasan</th>
//               <th>Harga</th>
//               <th>Tanggal Kirim</th>
//               <th>Status</th>
//               <th>Tanggal Pemesanan</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.indexOf(item.id) !== -1}
//                     onChange={() => handleCheckboxChange(item.id)}
//                   />
//                 </td>
//                 <td>{item.namaProduct}</td>
//                 <td>{item.address}</td>
//                 <td>{item.contact}</td>
//                 <td>{item.packaging}</td>
//                 <td>{item.stock}</td>
//                 <td>{item.totalHarga}</td>
//                 <td>{item.deliveryDate}</td>
//                 <td>{item.status}</td>
//                 <td>{item.timestamp?.toDate().toString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="w-[90%] mx-auto mt-10">
//         <h2 className="text-2xl font-semibold mb-5">Proses Kirim Ke Gudang</h2>
//         <form onSubmit={handleSendToGudang}>
//           {/* Tampilkan item yang dipilih di sini */}
//           {selectedItems.length > 0 && (
//             <div className="mb-5">
//               <h3 className="text-xl font-semibold mb-2">Pilih Pesanan:</h3>
//               <ul>
//                 {selectedItems.map((itemId) => {
//                   const selectedData = data.find((item) => item.id === itemId);
//                   if (selectedData) {
//                     return (
//                       <li key={selectedData.id}>
//                         <p>Nama Beras: {selectedData.namaProduct}</p>
//                         <p>Alamat Pengiriman: {selectedData.address}</p>
//                         <p>Kontak: {selectedData.contact}</p>
//                         <p>Kategori Kemasan: {selectedData.packaging}</p>
//                         <p>Jumlah Kemasan: {selectedData.stock}</p>
//                         <p>Tanggal Pemesanan: {selectedData.timestamp?.toDate().toString()}</p>
//                       </li>
//                     );
//                   }
//                   return null;
//                 })}
//               </ul>
//             </div>
//           )}
//           <div className="modal-action">
//             <button className="btn btn-primary" type="submit">
//               Kirim Ke Gudang
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Purchase;



// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, doc, onSnapshot, updateDoc, getDoc, addDoc, query, orderBy } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarGudang from "@/components/NavbarGudang";
// import Footer from "@/components/Footer";
// import { useRouter } from "next/navigation"; // import useRouter from next/router
// import NavbarAdmin from "@/components/NavbarAdmin";

// const Purchase = () => {
//     const { user, userProfile } = useAuth();
//     const [dataPembelian, setDataPembelian] = useState([]);
//     const [dataRequestOrder, setDataRequestOrder] = useState([]);
//     const [dataRelasi, setDataRelasi] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [nominalInput, setNominalInput] = useState("");
//     const [deliveryData, setDeliveryData] = useState([]);
//     const router = useRouter(); // initialize router

//     useEffect(() => {
//         if (user && userProfile.role === "user") {
//             router.push("/");
//         }
//     }, [user, userProfile]);

//     useEffect(() => {
//         const unsubscribePembelian = onSnapshot(collection(db, "userPembelian"), (snapshot) => {
//             const pembelianData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataPembelian(pembelianData);
//         });

//         const unsubscribeRequestOrder = onSnapshot(collection(db, "userRequestOrder"), (snapshot) => {
//             const requestOrderData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRequestOrder(requestOrderData);
//         });

//         const unsubscribeRelasi = onSnapshot(collection(db, "userRelasi"), (snapshot) => {
//             const relasiData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRelasi(relasiData);
//         });

//         const q = query(collection(db, "userDelivery"), orderBy("createdAt", "desc"));
//         const unsubscribeDelivery = onSnapshot(q, (snapshot) => {
//             const deliveryData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDeliveryData(deliveryData);
//         });

//         return () => {
//             unsubscribePembelian();
//             unsubscribeRequestOrder();
//             unsubscribeRelasi();
//             unsubscribeDelivery();
//         };
//     }, []);

//     const handleCheckboxChange = (itemId, type) => {
//         const selectedIndex = selectedItems.findIndex((item) => item.id === itemId && item.type === type);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedItems, { id: itemId, type });
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedItems.slice(1));
//         } else if (selectedIndex === selectedItems.length - 1) {
//             newSelected = newSelected.concat(selectedItems.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
//         }

//         setSelectedItems(newSelected);
//     };

//     const handleProcess = (e) => {
//         e.preventDefault();

//         const nominal = selectedItems
//             .filter(item => item.type === "relasi")
//             .map(item => {
//                 const selectedData = dataRelasi.find(data => data.id === item.id);
//                 return selectedData ? selectedData.stock : Infinity;
//             })
//             .reduce((min, stock) => Math.min(min, stock), Infinity);

//         setNominalInput(nominal === Infinity ? "" : nominal);

//         const modal = document.getElementById("combinedForm");
//         modal.showModal();
//     };

//     const handleSelesai = async () => {
//         try {
//             const requestOrderUpdates = selectedItems
//                 .filter(item => item.type === "relasi")
//                 .map(async (selectedItem) => {
//                     const itemRef = doc(db, "userRelasi", selectedItem.id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status, deliveryDate } = itemDoc.data();

//                         if (status === "dikirim") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "diproses" }));
//                         }
//                         if (deliveryDate) {
//                             const currentDate = new Date(deliveryDate);
//                             currentDate.setMonth(currentDate.getMonth() + 1);
//                             const newDeliveryDate = currentDate.toISOString().split("T")[0];
//                             requestOrderUpdates.push(updateDoc(itemRef, { deliveryDate: newDeliveryDate }));
//                         }
//                     }
//                 });

//             await Promise.all(requestOrderUpdates);

//             alert("Status berhasil diperbarui menjadi 'Diproses'!");
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleStockReduction = async () => {
//         try {
//             if (!nominalInput) {
//                 alert("Masukkan nominal untuk pengurangan stock.");
//                 return;
//             }

//             const nominal = parseInt(nominalInput);

//             const pembelianUpdates = [];
//             const requestOrderUpdates = [];
//             const relasiUpdates = [];

//             for (const selectedItem of selectedItems) {
//                 const { id, type } = selectedItem;

//                 if (type === "pembelian") {
//                     const itemRef = doc(db, "userPembelian", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { stock } = itemDoc.data();

//                         if (stock >= nominal) {
//                             const newStock = stock - nominal;
//                             pembelianUpdates.push(updateDoc(itemRef, { stock: newStock }));
//                         } else {
//                             alert(`Stock tidak mencukupi untuk item ${id}`);
//                             return;
//                         }
//                     }
//                 } else if (type === "relasi") {
//                     const itemRef = doc(db, "userRelasi", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status } = itemDoc.data();

//                         if (status === "diproses") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "dikirim" }));
//                         }
//                     }
//                 }
//             }

//             // Perform stock reduction for pembelian items
//             await Promise.all(pembelianUpdates);

//             // Perform status update for request order items
//             await Promise.all(requestOrderUpdates);

//             // Perform delivery date update for relasi items
//             await Promise.all(relasiUpdates);

//             // Create invoice from selected items
//             const invoiceData = selectedItems.map((selectedItem) => {
//                 const { id, type } = selectedItem;
//                 if (type === "pembelian") {
//                     return dataPembelian.find((item) => item.id === id);
//                 } else if (type === "relasi") {
//                     return dataRelasi.find((item) => item.id === id);
//                 }
//                 return null;
//             }).filter(item => item !== null);

//             await addDoc(collection(db, "userDelivery"), {
//                 items: invoiceData,
//                 createdAt: new Date()
//             });

//             alert("Pengurangan stock berhasil dilakukan dan invoice berhasil dibuat!");
//             document.getElementById("combinedForm").close();
//             setSelectedItems([]);
//             setNominalInput("");
//         } catch (error) {
//             console.error("Error reducing stock:", error);
//         }
//     };

//     const handleDeliver = async (deliveryId) => {
//         try {
//             const deliveryDoc = await getDoc(doc(db, "userRelasi", deliveryId));
//             if (deliveryDoc.exists()) {
//                 const deliveryItems = deliveryDoc.data().items;

//                 const updatedItems = deliveryItems.map((item) => {
//                     if (item.statusDelivery === "siap dikirim") {
//                         return { ...item, statusDelivery: "menunggu dikirim" };
//                     }
//                     return item;
//                 });

//                 await updateDoc(doc(db, "userRelasi", deliveryId), { items: updatedItems });
//                 alert("Status berhasil diperbarui menjadi 'dikirim'!");
//             } else {
//                 console.error(`No delivery document found for ID: ${deliveryId}`);
//             }
//         } catch (error) {
//             console.error("Error updating delivery status:", error);
//         }
//     };

//     const groupOrdersByField = (orders, field) => {
//         const groupedOrders = {};
//         orders.forEach((order) => {
//             if (!groupedOrders[order[field]]) {
//                 groupedOrders[order[field]] = [];
//             }
//             groupedOrders[order[field]].push(order);
//         });
//         return groupedOrders;
//     };

//     return (
//         <div className="w-full mx-auto h-12 mt-10">
//             <NavbarAdmin />

//             {/* Section to display the created delivery */}
//             <div className="w-[90%] mx-auto mt-10">
//                 <h2 className="text-2xl font-semibold mb-5">Delivery Details</h2>
//                 <div className="border p-4 rounded-md">
//                     {deliveryData.length > 0 ? (
//                         deliveryData.map((delivery, index) => (
//                             <div key={index} className="mb-4">
//                                 <h4 className="text-xl font-semibold">Invoice {index + 1}</h4>
//                                 {delivery.items.map((item, idx) => (
//                                     <div key={idx} className="mb-4">
//                                         <p>Nama: {item.itemName || item.fullName}</p>
//                                         <p>Kategori Kemasan: {item.packaging}</p>
//                                         <p>Jumlah Kemasan: {item.stock}</p>
//                                         <p>Status: {item.statusDelivery}</p>
//                                         {item.image && <img src={item.image} alt="Payment Proof" className="h-52 w-auto mt-2 mx-auto" />}
//                                         <p>Alamat: {item.address}</p>
//                                         <p>Kontak: {item.contact}</p>
//                                     </div>
//                                 ))}
//                                 <button className="btn btn-primary" onClick={() => handleDeliver(delivery.id)}>
//                                     Deliver
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No delivery data to display.</p>
//                     )}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Purchase;


// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, doc, onSnapshot, updateDoc, getDoc, addDoc, query, orderBy } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarGudang from "@/components/NavbarGudang";
// import Footer from "@/components/Footer";
// import { useRouter } from "next/navigation"; // import useRouter from next/router
// import NavbarAdmin from "@/components/NavbarAdmin";

// const Purchase = () => {
//     const { user, userProfile } = useAuth();
//     const [dataPembelian, setDataPembelian] = useState([]);
//     const [dataRequestOrder, setDataRequestOrder] = useState([]);
//     const [dataRelasi, setDataRelasi] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [nominalInput, setNominalInput] = useState("");
//     const [deliveryData, setDeliveryData] = useState([]);
//     const router = useRouter(); // initialize router

//     useEffect(() => {
//         if (user && userProfile.role === "user") {
//             router.push("/");
//         }
//     }, [user, userProfile]);

//     useEffect(() => {
//         const unsubscribePembelian = onSnapshot(collection(db, "userPembelian"), (snapshot) => {
//             const pembelianData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataPembelian(pembelianData);
//         });

//         const unsubscribeRequestOrder = onSnapshot(collection(db, "userRequestOrder"), (snapshot) => {
//             const requestOrderData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRequestOrder(requestOrderData);
//         });

//         const unsubscribeRelasi = onSnapshot(collection(db, "userRelasi"), (snapshot) => {
//             const relasiData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRelasi(relasiData);
//         });

//         const q = query(collection(db, "userDelivery"), orderBy("createdAt", "desc"));
//         const unsubscribeDelivery = onSnapshot(q, (snapshot) => {
//             const deliveryData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDeliveryData(deliveryData);
//         });

//         return () => {
//             unsubscribePembelian();
//             unsubscribeRequestOrder();
//             unsubscribeRelasi();
//             unsubscribeDelivery();
//         };
//     }, []);

//     const handleCheckboxChange = (itemId, type) => {
//         const selectedIndex = selectedItems.findIndex((item) => item.id === itemId && item.type === type);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedItems, { id: itemId, type });
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedItems.slice(1));
//         } else if (selectedIndex === selectedItems.length - 1) {
//             newSelected = newSelected.concat(selectedItems.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
//         }

//         setSelectedItems(newSelected);
//     };

//     const handleProcess = (e) => {
//         e.preventDefault();

//         const nominal = selectedItems
//             .filter(item => item.type === "relasi")
//             .map(item => {
//                 const selectedData = dataRelasi.find(data => data.id === item.id);
//                 return selectedData ? selectedData.stock : Infinity;
//             })
//             .reduce((min, stock) => Math.min(min, stock), Infinity);

//         setNominalInput(nominal === Infinity ? "" : nominal);

//         const modal = document.getElementById("combinedForm");
//         modal.showModal();
//     };

//     const handleSelesai = async () => {
//         try {
//             const requestOrderUpdates = selectedItems
//                 .filter(item => item.type === "relasi")
//                 .map(async (selectedItem) => {
//                     const itemRef = doc(db, "userRelasi", selectedItem.id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status, deliveryDate } = itemDoc.data();

//                         if (status === "dikirim") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "diproses" }));
//                         }
//                         if (deliveryDate) {
//                             const currentDate = new Date(deliveryDate);
//                             currentDate.setMonth(currentDate.getMonth() + 1);
//                             const newDeliveryDate = currentDate.toISOString().split("T")[0];
//                             requestOrderUpdates.push(updateDoc(itemRef, { deliveryDate: newDeliveryDate }));
//                         }
//                     }
//                 });

//             await Promise.all(requestOrderUpdates);

//             alert("Status berhasil diperbarui menjadi 'Diproses'!");
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleStockReduction = async () => {
//         try {
//             if (!nominalInput) {
//                 alert("Masukkan nominal untuk pengurangan stock.");
//                 return;
//             }

//             const nominal = parseInt(nominalInput);

//             const pembelianUpdates = [];
//             const requestOrderUpdates = [];
//             const relasiUpdates = [];

//             for (const selectedItem of selectedItems) {
//                 const { id, type } = selectedItem;

//                 if (type === "pembelian") {
//                     const itemRef = doc(db, "userPembelian", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { stock } = itemDoc.data();

//                         if (stock >= nominal) {
//                             const newStock = stock - nominal;
//                             pembelianUpdates.push(updateDoc(itemRef, { stock: newStock }));
//                         } else {
//                             alert(`Stock tidak mencukupi untuk item ${id}`);
//                             return;
//                         }
//                     }
//                 } else if (type === "relasi") {
//                     const itemRef = doc(db, "userRelasi", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status } = itemDoc.data();

//                         if (status === "diproses") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "dikirim" }));
//                         }
//                     }
//                 }
//             }

//             // Perform stock reduction for pembelian items
//             await Promise.all(pembelianUpdates);

//             // Perform status update for request order items
//             await Promise.all(requestOrderUpdates);

//             // Perform delivery date update for relasi items
//             await Promise.all(relasiUpdates);

//             // Create invoice from selected items
//             const invoiceData = selectedItems.map((selectedItem) => {
//                 const { id, type } = selectedItem;
//                 if (type === "pembelian") {
//                     return dataPembelian.find((item) => item.id === id);
//                 } else if (type === "relasi") {
//                     return dataRelasi.find((item) => item.id === id);
//                 }
//                 return null;
//             }).filter(item => item !== null);

//             await addDoc(collection(db, "userDelivery"), {
//                 items: invoiceData,
//                 createdAt: new Date()
//             });

//             alert("Pengurangan stock berhasil dilakukan dan invoice berhasil dibuat!");
//             document.getElementById("combinedForm").close();
//             setSelectedItems([]);
//             setNominalInput("");
//         } catch (error) {
//             console.error("Error reducing stock:", error);
//         }
//     };

//     //code fix handle deliver pembaruan statusDelivery pada userDeliver 
//     // const handleDeliver = async (deliveryId) => {
//     //     try {
//     //         console.log(`Attempting to retrieve document with ID: ${deliveryId}`); // Debugging line
//     //         const deliveryDoc = await getDoc(doc(db, "userDelivery", deliveryId)); // Retrieve from userDelivery
//     //         console.log(`Document data:`, deliveryDoc.data()); // Debugging line
    
//     //         if (deliveryDoc.exists()) {
//     //             const deliveryItems = deliveryDoc.data().items;
    
//     //             const updatePromises = deliveryItems.map(async (item) => {
//     //                 const itemRef = doc(db, "userRelasi", item.id); // Get reference from userRelasi
//     //                 const itemDoc = await getDoc(itemRef);
    
//     //                 if (itemDoc.exists()) {
//     //                     const { statusDelivery } = itemDoc.data();
    
//     //                     if (statusDelivery === "siap dikirim") {
//     //                         await updateDoc(itemRef, { statusDelivery: "menunggu dikirim" });
//     //                     }
//     //                 } else {
//     //                     console.error(`No userRelasi document found for ID: ${item.id}`);
//     //                 }
//     //             });
    
//     //             await Promise.all(updatePromises);
    
//     //             alert("Status berhasil diperbarui menjadi 'menunggu dikirim'!");
//     //         } else {
//     //             console.error(`No delivery document found for ID: ${deliveryId}`);
//     //         }
//     //     } catch (error) {
//     //         console.error("Error updating delivery status:", error);
//     //     }
//     // };
    
//     const handleDeliver = async (deliveryId) => {
//         try {
//             console.log(`Attempting to retrieve document with ID: ${deliveryId}`); // Debugging line
//             const deliveryDoc = await getDoc(doc(db, "userDelivery", deliveryId)); // Retrieve from userDelivery
//             console.log(`Document data:`, deliveryDoc.data()); // Debugging line
    
//             if (deliveryDoc.exists()) {
//                 const deliveryItems = deliveryDoc.data().items;
    
//                 const updatePromises = deliveryItems.map(async (item) => {
//                     const itemRef = doc(db, "userRelasi", item.id); // Get reference from userRelasi
//                     const itemDoc = await getDoc(itemRef);
    
//                     if (itemDoc.exists()) {
//                         const { statusDelivery } = itemDoc.data();
    
//                         if (statusDelivery === "siap dikirim") {
//                             await updateDoc(itemRef, { statusDelivery: "menunggu dikirim" });
    
//                             // Update local state
//                             setDataRelasi((prevData) =>
//                                 prevData.map((dataItem) =>
//                                     dataItem.id === item.id ? { ...dataItem, statusDelivery: "menunggu dikirim" } : dataItem
//                                 )
//                             );
//                         }
//                     } else {
//                         console.error(`No userRelasi document found for ID: ${item.id}`);
//                     }
//                 });
    
//                 await Promise.all(updatePromises);
    
//                 alert("Status berhasil diperbarui menjadi 'menunggu dikirim'!");
//             } else {
//                 console.error(`No delivery document found for ID: ${deliveryId}`);
//             }
//         } catch (error) {
//             console.error("Error updating delivery status:", error);
//         }
//     };
    
    

//     const groupOrdersByField = (orders, field) => {
//         const groupedOrders = {};
//         orders.forEach((order) => {
//             if (!groupedOrders[order[field]]) {
//                 groupedOrders[order[field]] = [];
//             }
//             groupedOrders[order[field]].push(order);
//         });
//         return groupedOrders;
//     };

//     return (
//         <div className="w-full mx-auto h-12 mt-10">
//             <NavbarAdmin />

//             {/* Section to display the created delivery */}
//             <div className="w-[90%] mx-auto mt-10">
//                 <h2 className="text-2xl font-semibold mb-5">Delivery Details</h2>
//                 <div className="border p-4 rounded-md">
//                     {deliveryData.length > 0 ? (
//                         deliveryData.map((delivery, index) => (
//                             <div key={index} className="mb-4">
//                                 <h4 className="text-xl font-semibold">Invoice {index + 1}</h4>
//                                 {delivery.items.map((item, idx) => (
//                                     <div key={idx} className="mb-4">
//                                         <p>Nama: {item.itemName || item.fullName}</p>
//                                         <p>Kategori Kemasan: {item.packaging}</p>
//                                         <p>Jumlah Kemasan: {item.stock}</p>
//                                         <p>Status: {item.statusDelivery}</p>
//                                         {item.image && <img src={item.image} alt="Payment Proof" className="h-52 w-auto mt-2 mx-auto" />}
//                                         <p>Alamat: {item.address}</p>
//                                         <p>Kontak: {item.contact}</p>
//                                     </div>
//                                 ))}
//                                 <button className="btn btn-primary" onClick={() => handleDeliver(delivery.id)}>
//                                     Deliver
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No delivery data to display.</p>
//                     )}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Purchase;


// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, doc, onSnapshot, updateDoc, getDoc, addDoc, query, orderBy } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarGudang from "@/components/NavbarGudang";
// import Footer from "@/components/Footer";
// import { useRouter } from "next/navigation"; // import useRouter from next/router
// import NavbarAdmin from "@/components/NavbarAdmin";

// const Purchase = () => {
//     const { user, userProfile } = useAuth();
//     const [dataPembelian, setDataPembelian] = useState([]);
//     const [dataRequestOrder, setDataRequestOrder] = useState([]);
//     const [dataRelasi, setDataRelasi] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [nominalInput, setNominalInput] = useState("");
//     const [deliveryData, setDeliveryData] = useState([]);
//     const router = useRouter(); // initialize router

//     useEffect(() => {
//         if (user && userProfile.role === "user") {
//             router.push("/");
//         }
//     }, [user, userProfile]);

//     useEffect(() => {
//         const unsubscribePembelian = onSnapshot(collection(db, "userPembelian"), (snapshot) => {
//             const pembelianData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataPembelian(pembelianData);
//         });

//         const unsubscribeRequestOrder = onSnapshot(collection(db, "userRequestOrder"), (snapshot) => {
//             const requestOrderData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRequestOrder(requestOrderData);
//         });

//         const unsubscribeRelasi = onSnapshot(collection(db, "userRelasi"), (snapshot) => {
//             const relasiData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRelasi(relasiData);
//         });

//         const q = query(collection(db, "userDelivery"), orderBy("createdAt", "desc"));
//         const unsubscribeDelivery = onSnapshot(q, (snapshot) => {
//             const deliveryData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDeliveryData(deliveryData);
//         });

//         return () => {
//             unsubscribePembelian();
//             unsubscribeRequestOrder();
//             unsubscribeRelasi();
//             unsubscribeDelivery();
//         };
//     }, []);

//     const handleCheckboxChange = (itemId, type) => {
//         const selectedIndex = selectedItems.findIndex((item) => item.id === itemId && item.type === type);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedItems, { id: itemId, type });
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedItems.slice(1));
//         } else if (selectedIndex === selectedItems.length - 1) {
//             newSelected = newSelected.concat(selectedItems.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
//         }

//         setSelectedItems(newSelected);
//     };

//     const handleProcess = (e) => {
//         e.preventDefault();

//         const nominal = selectedItems
//             .filter(item => item.type === "relasi")
//             .map(item => {
//                 const selectedData = dataRelasi.find(data => data.id === item.id);
//                 return selectedData ? selectedData.stock : Infinity;
//             })
//             .reduce((min, stock) => Math.min(min, stock), Infinity);

//         setNominalInput(nominal === Infinity ? "" : nominal);

//         const modal = document.getElementById("combinedForm");
//         modal.showModal();
//     };

//     const handleSelesai = async () => {
//         try {
//             const requestOrderUpdates = selectedItems
//                 .filter(item => item.type === "relasi")
//                 .map(async (selectedItem) => {
//                     const itemRef = doc(db, "userRelasi", selectedItem.id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status, deliveryDate } = itemDoc.data();

//                         if (status === "dikirim") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "diproses" }));
//                         }
//                         if (deliveryDate) {
//                             const currentDate = new Date(deliveryDate);
//                             currentDate.setMonth(currentDate.getMonth() + 1);
//                             const newDeliveryDate = currentDate.toISOString().split("T")[0];
//                             requestOrderUpdates.push(updateDoc(itemRef, { deliveryDate: newDeliveryDate }));
//                         }
//                     }
//                 });

//             await Promise.all(requestOrderUpdates);

//             alert("Status berhasil diperbarui menjadi 'Diproses'!");
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleStockReduction = async () => {
//         try {
//             if (!nominalInput) {
//                 alert("Masukkan nominal untuk pengurangan stock.");
//                 return;
//             }

//             const nominal = parseInt(nominalInput);

//             const pembelianUpdates = [];
//             const requestOrderUpdates = [];
//             const relasiUpdates = [];

//             for (const selectedItem of selectedItems) {
//                 const { id, type } = selectedItem;

//                 if (type === "pembelian") {
//                     const itemRef = doc(db, "userPembelian", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { stock } = itemDoc.data();

//                         if (stock >= nominal) {
//                             const newStock = stock - nominal;
//                             pembelianUpdates.push(updateDoc(itemRef, { stock: newStock }));
//                         } else {
//                             alert(`Stock tidak mencukupi untuk item ${id}`);
//                             return;
//                         }
//                     }
//                 } else if (type === "relasi") {
//                     const itemRef = doc(db, "userRelasi", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status } = itemDoc.data();

//                         if (status === "diproses") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "dikirim" }));
//                         }
//                     }
//                 }
//             }

//             // Perform stock reduction for pembelian items
//             await Promise.all(pembelianUpdates);

//             // Perform status update for request order items
//             await Promise.all(requestOrderUpdates);

//             // Perform delivery date update for relasi items
//             await Promise.all(relasiUpdates);

//             // Create invoice from selected items
//             const invoiceData = selectedItems.map((selectedItem) => {
//                 const { id, type } = selectedItem;
//                 if (type === "pembelian") {
//                     return dataPembelian.find((item) => item.id === id);
//                 } else if (type === "relasi") {
//                     return dataRelasi.find((item) => item.id === id);
//                 }
//                 return null;
//             }).filter(item => item !== null);

//             await addDoc(collection(db, "userDelivery"), {
//                 items: invoiceData,
//                 createdAt: new Date()
//             });

//             alert("Pengurangan stock berhasil dilakukan dan invoice berhasil dibuat!");
//             document.getElementById("combinedForm").close();
//             setSelectedItems([]);
//             setNominalInput("");
//         } catch (error) {
//             console.error("Error reducing stock:", error);
//         }
//     };

//     const handleDeliver = async (deliveryId) => {
//         try {
//             console.log(`Attempting to retrieve document with ID: ${deliveryId}`); // Debugging line
//             const deliveryDoc = await getDoc(doc(db, "userDelivery", deliveryId)); // Retrieve from userDelivery
//             console.log(`Document data:`, deliveryDoc.data()); // Debugging line
    
//             if (deliveryDoc.exists()) {
//                 const deliveryItems = deliveryDoc.data().items;
    
//                 const updatePromises = deliveryItems.map(async (item) => {
//                     console.log(`Processing item with ID: ${item.id}`); // Debugging line
//                     const itemRef = doc(db, "userRelasi", item.id); // Get reference from userRelasi
//                     const itemDoc = await getDoc(itemRef);
    
//                     if (itemDoc.exists()) {
//                         const { statusDelivery } = itemDoc.data();
//                         console.log(`Current statusDelivery for item ID ${item.id}: ${statusDelivery}`); // Debugging line
    
//                         if (statusDelivery === "siap dikirim") {
//                             await updateDoc(itemRef, { statusDelivery: "menunggu dikirim" });
    
//                             // Update local state
//                             setDataRelasi((prevData) =>
//                                 prevData.map((dataItem) =>
//                                     dataItem.id === item.id ? { ...dataItem, statusDelivery: "menunggu dikirim" } : dataItem
//                                 )
//                             );
//                         }
//                     } else {
//                         console.error(`No userRelasi document found for ID: ${item.id}`);
//                     }
//                 });
    
//                 await Promise.all(updatePromises);
    
//                 alert("Status berhasil diperbarui menjadi 'menunggu dikirim'!");
//             } else {
//                 console.error(`No delivery document found for ID: ${deliveryId}`);
//             }
//         } catch (error) {
//             console.error("Error updating delivery status:", error);
//         }
//     };

//     const groupOrdersByField = (orders, field) => {
//         const groupedOrders = {};
//         orders.forEach((order) => {
//             if (!groupedOrders[order[field]]) {
//                 groupedOrders[order[field]] = [];
//             }
//             groupedOrders[order[field]].push(order);
//         });
//         return groupedOrders;
//     };

//     return (
//         <div className="w-full mx-auto h-12 mt-10">
//             <NavbarAdmin />

//             {/* Section to display the created delivery */}
//             <div className="w-[90%] mx-auto mt-10">
//                 <h2 className="text-2xl font-semibold mb-5">Delivery Details</h2>
//                 <div className="border p-4 rounded-md">
//                     {deliveryData.length > 0 ? (
//                         deliveryData.map((delivery, index) => (
//                             <div key={index} className="mb-4">
//                                 <h4 className="text-xl font-semibold">Invoice {index + 1}</h4>
//                                 {delivery.items.map((item, idx) => (
//                                     <div key={idx} className="mb-4">
//                                         <p>Nama: {item.itemName || item.fullName}</p>
//                                         <p>Kategori Kemasan: {item.packaging}</p>
//                                         <p>Jumlah Kemasan: {item.stock}</p>
//                                         <p>Status: {item.statusDelivery}</p>
//                                         {item.image && <img src={item.image} alt="Payment Proof" className="h-52 w-auto mt-2 mx-auto" />}
//                                         <p>Alamat: {item.address}</p>
//                                         <p>Kontak: {item.contact}</p>
//                                     </div>
//                                 ))}
//                                 <button className="btn btn-primary" onClick={() => handleDeliver(delivery.id)}>
//                                     Deliver
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No delivery data to display.</p>
//                     )}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Purchase;


// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, doc, onSnapshot, updateDoc, getDoc, addDoc, query, orderBy } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarGudang from "@/components/NavbarGudang";
// import Footer from "@/components/Footer";
// import { useRouter } from "next/navigation"; // import useRouter from next/router
// import NavbarAdmin from "@/components/NavbarAdmin";

// const Purchase = () => {
//     const { user, userProfile } = useAuth();
//     const [dataPembelian, setDataPembelian] = useState([]);
//     const [dataRequestOrder, setDataRequestOrder] = useState([]);
//     const [dataRelasi, setDataRelasi] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [nominalInput, setNominalInput] = useState("");
//     const [deliveryData, setDeliveryData] = useState([]);
//     const router = useRouter(); // initialize router

//     useEffect(() => {
//         if (user && userProfile.role === "user") {
//             router.push("/");
//         }
//     }, [user, userProfile]);

//     useEffect(() => {
//         const unsubscribePembelian = onSnapshot(collection(db, "userPembelian"), (snapshot) => {
//             const pembelianData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataPembelian(pembelianData);
//         });

//         const unsubscribeRequestOrder = onSnapshot(collection(db, "userRequestOrder"), (snapshot) => {
//             const requestOrderData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRequestOrder(requestOrderData);
//         });

//         const unsubscribeRelasi = onSnapshot(collection(db, "userRelasi"), (snapshot) => {
//             const relasiData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDataRelasi(relasiData);
//         });

//         const q = query(collection(db, "userDelivery"), orderBy("createdAt", "desc"));
//         const unsubscribeDelivery = onSnapshot(q, (snapshot) => {
//             const deliveryData = snapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setDeliveryData(deliveryData);
//         });

//         return () => {
//             unsubscribePembelian();
//             unsubscribeRequestOrder();
//             unsubscribeRelasi();
//             unsubscribeDelivery();
//         };
//     }, []);

//     const handleCheckboxChange = (itemId, type) => {
//         const selectedIndex = selectedItems.findIndex((item) => item.id === itemId && item.type === type);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedItems, { id: itemId, type });
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedItems.slice(1));
//         } else if (selectedIndex === selectedItems.length - 1) {
//             newSelected = newSelected.concat(selectedItems.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedItems.slice(0, selectedIndex), selectedItems.slice(selectedIndex + 1));
//         }

//         setSelectedItems(newSelected);
//     };

//     const handleProcess = (e) => {
//         e.preventDefault();

//         const nominal = selectedItems
//             .filter(item => item.type === "relasi")
//             .map(item => {
//                 const selectedData = dataRelasi.find(data => data.id === item.id);
//                 return selectedData ? selectedData.stock : Infinity;
//             })
//             .reduce((min, stock) => Math.min(min, stock), Infinity);

//         setNominalInput(nominal === Infinity ? "" : nominal);

//         const modal = document.getElementById("combinedForm");
//         modal.showModal();
//     };

//     const handleSelesai = async () => {
//         try {
//             const requestOrderUpdates = selectedItems
//                 .filter(item => item.type === "relasi")
//                 .map(async (selectedItem) => {
//                     const itemRef = doc(db, "userRelasi", selectedItem.id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status, deliveryDate } = itemDoc.data();

//                         if (status === "dikirim") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "diproses" }));
//                         }
//                         if (deliveryDate) {
//                             const currentDate = new Date(deliveryDate);
//                             currentDate.setMonth(currentDate.getMonth() + 1);
//                             const newDeliveryDate = currentDate.toISOString().split("T")[0];
//                             requestOrderUpdates.push(updateDoc(itemRef, { deliveryDate: newDeliveryDate }));
//                         }
//                     }
//                 });

//             await Promise.all(requestOrderUpdates);

//             alert("Status berhasil diperbarui menjadi 'Diproses'!");
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     const handleStockReduction = async () => {
//         try {
//             if (!nominalInput) {
//                 alert("Masukkan nominal untuk pengurangan stock.");
//                 return;
//             }

//             const nominal = parseInt(nominalInput);

//             const pembelianUpdates = [];
//             const requestOrderUpdates = [];
//             const relasiUpdates = [];

//             for (const selectedItem of selectedItems) {
//                 const { id, type } = selectedItem;

//                 if (type === "pembelian") {
//                     const itemRef = doc(db, "userPembelian", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { stock } = itemDoc.data();

//                         if (stock >= nominal) {
//                             const newStock = stock - nominal;
//                             pembelianUpdates.push(updateDoc(itemRef, { stock: newStock }));
//                         } else {
//                             alert(`Stock tidak mencukupi untuk item ${id}`);
//                             return;
//                         }
//                     }
//                 } else if (type === "relasi") {
//                     const itemRef = doc(db, "userRelasi", id);
//                     const itemDoc = await getDoc(itemRef);

//                     if (itemDoc.exists()) {
//                         const { status } = itemDoc.data();

//                         if (status === "diproses") {
//                             requestOrderUpdates.push(updateDoc(itemRef, { status: "dikirim" }));
//                         }
//                     }
//                 }
//             }

//             // Perform stock reduction for pembelian items
//             await Promise.all(pembelianUpdates);

//             // Perform status update for request order items
//             await Promise.all(requestOrderUpdates);

//             // Perform delivery date update for relasi items
//             await Promise.all(relasiUpdates);

//             // Create invoice from selected items
//             const invoiceData = selectedItems.map((selectedItem) => {
//                 const { id, type } = selectedItem;
//                 if (type === "pembelian") {
//                     return dataPembelian.find((item) => item.id === id);
//                 } else if (type === "relasi") {
//                     return dataRelasi.find((item) => item.id === id);
//                 }
//                 return null;
//             }).filter(item => item !== null);

//             await addDoc(collection(db, "userDelivery"), {
//                 items: invoiceData,
//                 createdAt: new Date()
//             });

//             alert("Pengurangan stock berhasil dilakukan dan invoice berhasil dibuat!");
//             document.getElementById("combinedForm").close();
//             setSelectedItems([]);
//             setNominalInput("");
//         } catch (error) {
//             console.error("Error reducing stock:", error);
//         }
//     };

//     const handleDeliver = async (deliveryId) => {
//         try {
//             console.log(`Attempting to retrieve document with ID: ${deliveryId}`); // Debugging line
//             const deliveryDoc = await getDoc(doc(db, "userDelivery", deliveryId)); // Retrieve from userDelivery
//             console.log(`Document data:`, deliveryDoc.data()); // Debugging line
    
//             if (deliveryDoc.exists()) {
//                 const deliveryItems = deliveryDoc.data().items;
    
//                 const updatePromises = deliveryItems.map(async (item) => {
//                     console.log(`Processing item with ID: ${item.id}`); // Debugging line
//                     const itemRef = doc(db, "userRelasi", item.id); // Get reference from userRelasi
//                     const itemDoc = await getDoc(itemRef);
    
//                     if (itemDoc.exists()) {
//                         const { statusDelivery } = itemDoc.data();
//                         console.log(`Current statusDelivery for item ID ${item.id}: ${statusDelivery}`); // Debugging line
    
//                         if (statusDelivery === "siap dikirim") {
//                             await updateDoc(itemRef, { statusDelivery: "menunggu dikirim" });
    
//                             // Update local state
//                             setDataRelasi((prevData) =>
//                                 prevData.map((dataItem) =>
//                                     dataItem.id === item.id ? { ...dataItem, statusDelivery: "menunggu dikirim" } : dataItem
//                                 )
//                             );
//                         }
//                     } else {
//                         console.error(`No userRelasi document found for ID: ${item.id}`);
//                     }
//                 });
    
//                 await Promise.all(updatePromises);
    
//                 alert("Status berhasil diperbarui menjadi 'menunggu dikirim'!");
//             } else {
//                 console.error(`No delivery document found for ID: ${deliveryId}`);
//             }
//         } catch (error) {
//             console.error("Error updating delivery status:", error);
//         }
//     };

//     const groupOrdersByField = (orders, field) => {
//         const groupedOrders = {};
//         orders.forEach((order) => {
//             if (!groupedOrders[order[field]]) {
//                 groupedOrders[order[field]] = [];
//             }
//             groupedOrders[order[field]].push(order);
//         });
//         return groupedOrders;
//     };

//     return (
//         <div className="w-full mx-auto h-12 mt-10">
//             <NavbarAdmin />

//             {/* Section to display the created delivery */}
//             <div className="w-[90%] mx-auto mt-10">
//                 <h2 className="text-2xl font-semibold mb-5">Delivery Details</h2>
//                 <div className="border p-4 rounded-md">
//                     {deliveryData.length > 0 ? (
//                         deliveryData.map((delivery, index) => (
//                             <div key={index} className="mb-4">
//                                 <h4 className="text-xl font-semibold">Invoice {index + 1}</h4>
//                                 {delivery.items.map((item, idx) => (
//                                     <div key={idx} className="mb-4">
//                                         <p>Nama: {item.itemName || item.fullName}</p>
//                                         <p>Kategori Kemasan: {item.packaging}</p>
//                                         <p>Jumlah Kemasan: {item.stock}</p>
//                                         <p>Status: {item.statusDelivery}</p>
//                                         {item.image && <img src={item.image} alt="Payment Proof" className="h-52 w-auto mt-2 mx-auto" />}
//                                         <p>Alamat: {item.address}</p>
//                                         <p>Kontak: {item.contact}</p>
//                                     </div>
//                                 ))}
//                                 <button className="btn btn-primary" onClick={() => handleDeliver(delivery.id)}>
//                                     Deliver
//                                 </button>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No delivery data to display.</p>
//                     )}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Purchase;


"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; 
import NavbarAdmin from "@/components/NavbarAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import CardItem7 from "@/components/CardItem7";
import CardItem8 from "@/components/CardItem8";

const UserProfile = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    address: "",
    packaging: "",
    namaProduct: "",
    stock: "",
    deliveryDate: "",
    deadlineDate:"",
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [orders, setOrders] = useState([]); 
  const [editOrderId, setEditOrderId] = useState(null); // Add state to manage edit mode
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData((prevFormData) => ({
            ...prevFormData,
            fullName: data.name || "",
            contact: data.contact || "",
            address: data.address || "",
          }));
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const q = query(collection(db, "userRelasi"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      }
    };
    fetchOrders();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculatePrice = () => {
    const { packaging, namaProduct, stock } = formData;
    let unitPrice = 0;

    if (namaProduct === "Karila Pandan Wangi Premium") {
      switch (packaging) {
        case "3 Kg":
          unitPrice = 49500;
          break;
        case "5 Kg":
          unitPrice = 82500;
          break;
        case "10 Kg":
          unitPrice = 165000;
          break;
        case "20 Kg":
          unitPrice = 330000;
          break;
        case "25 Kg":
          unitPrice = 412500;
          break;
        default:
          unitPrice = 0;
          break;
      }
    }

    if (namaProduct === "Karila Ramos") {
      switch (packaging) {
        case "3 Kg":
          unitPrice = 43500;
          break;
        case "5 Kg":
          unitPrice = 72500;
          break;
        case "10 Kg":
          unitPrice = 145000;
          break;
        case "20 Kg":
          unitPrice = 290000;
          break;
        case "25 Kg":
          unitPrice = 362500;
          break;
        default:
          unitPrice = 0;
          break;
      }
    }
    return unitPrice * (parseInt(stock) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.packaging) newErrors.packaging = "Packaging is required";
    if (!formData.namaProduct) newErrors.namaProduct = "Product is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.deliveryDate) newErrors.deliveryDate = "Delivery date is required";
    if (!formData.deadlineDate) newErrors.deadlineDate = "Dadline date is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && user) {
      const totalHarga = calculatePrice();

      try {
        if (editOrderId) {
          // Update existing order
          const docRef = doc(db, "userRelasi", editOrderId);
          await updateDoc(docRef, {
            userId: user.uid,
            fullName: formData.fullName,
            contact: formData.contact,
            address: formData.address,
            packaging: formData.packaging,
            namaProduct: formData.namaProduct,
            stock: formData.stock,
            deliveryDate: formData.deliveryDate,
            deadlineDate:formData.deadlineDate,
            totalHarga: totalHarga,
            statusDelivery: "menunggu dikirim", // update statusDelivery
            status: "menunggu dikirim", // update status
            timestamp: new Date(),
          });
          setToastMessage("Order updated successfully");
        } else {
          // Add new order
          await addDoc(collection(db, "userRelasi"), {
            userId: user.uid,
            fullName: formData.fullName,
            contact: formData.contact,
            address: formData.address,
            packaging: formData.packaging,
            namaProduct: formData.namaProduct,
            stock: formData.stock,
            deliveryDate: formData.deliveryDate,
            deadlineDate: formData.deadlineDate,
            totalHarga: totalHarga,
            status: "barang ready",
            timestamp: new Date(),
          });
          setToastMessage("Order requested successfully");
        }

        setFormData({
          fullName: "",
          contact: "",
          address: "",
          packaging: "",
          namaProduct: "",
          stock: "",
          deliveryDate: "",
          deadlineDate:"",
        });
        setEditOrderId(null);
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error adding or updating document: ", error);
      }
    }
  };

  const handleEdit = async (order) => {
    const docRef = doc(db, "userRelasi", order.id);
    await updateDoc(docRef, {
      statusDelivery: "menunggu dikirim",
      status: "menunggu dikirim"
    });
    setToastMessage("Order status updated successfully");
  };

  const filterOrdersByProductName = (productName) => {
    return orders.filter(order => order.namaProduct === productName);
  };

  const groupOrdersByFullName = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      if (!groupedOrders[order.fullName]) {
        groupedOrders[order.fullName] = [];
      }
      groupedOrders[order.fullName].push(order);
    });
    return groupedOrders;
  };

  return (
    <div className="mt-10">
      <NavbarAdmin />
      <div className="mt-53 px-10 my-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Order List</h2>
        {["Karila Pandan Wangi Premium", "Karila Ramos"].map((productName) => (
          <div key={productName}>
            <h3 className="text-xl font-semibold mb-2">{productName}</h3>
            {Object.entries(groupOrdersByFullName(filterOrdersByProductName(productName))).map(([fullName, orders]) => (
              <div key={fullName} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">{fullName}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {orders.map((order) => (
                    <CardItem8
                      key={order.id}
                      order={order}
                      handleEdit={handleEdit}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;








