// "use client";
// import useAuth from "@/app/hooks/useAuth";
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { db, storage } from "@/firebase/firebase";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const Services = () => {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   useEffect(() => {
//     if (user && userProfile.role === "user") {
//       router.push("/");
//     }
//   }, [user, userProfile, router]);
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("fikom");
//   const [contact, setContact] = useState("");
//   const [downloadUrl, setDownloadUrl] = useState("");
//   const [percentage, setPercentage] = useState(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "services"),
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
//     const uploadFile = async () => {
//       const storageRef = ref(
//         storage,
//         "services/" +
//           new Date().getTime() +
//           file.name.replace(" ", "%20") +
//           "UEU"
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
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setDownloadUrl(downloadURL);
//           });
//         }
//       );
//     };
//     file && uploadFile();
//     return () => {
//       unsub();
//     };
//   }, [file]);

//   const handleAddServices = async (e) => {
//     e.preventDefault();
//     // Collect user data and perform necessary operations
//     const serviceData = {
//       id: new Date().getTime() + title + "UEU",
//       image: downloadUrl,
//       title: title,
//       description: description,
//       category: category,
//       contact: contact,
//     };

//     try {
//       await setDoc(
//         doc(db, "services", new Date().getTime() + serviceData.title + "UEU"),
//         {
//           ...serviceData,
//           timeStamp: serverTimestamp(),
//         }
//       );
//       setFile(null);
//       setTitle("");
//       setDescription("");
//       setCategory("fikom");
//       setContact("");
//       document.getElementById("addServiceModal").close();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (id, image) => {
//     try {
//       await deleteDoc(doc(db, "services", id));
//       setData(data.filter((item) => item.id !== id));

//       const desertRef = ref(storage, image);
//       await deleteObject(desertRef);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-[87%] mx-auto mt-32">
//       <NavbarAdmin />

//       <div className="flex justify-between items-center gap-3 mb-10">
//         <h1 className="text-3xl font-semibold mb-3">Services List</h1>
//         <input
//           type="text"
//           placeholder="Search here"
//           className="input input-bordered w-full max-w-xs"
//         />
//         <label className="form-control w-full max-w-xs">
//           <select className="select select-bordered">
//             <option>All</option>
//             <option>Fikom</option>
//             <option>Fasilkom</option>
//             <option>DKV</option>
//           </select>
//         </label>
//         <button
//           className="btn bg-teal-600 hover:bg-teal-500 text-white"
//           onClick={() => document.getElementById("addServiceModal").showModal()}
//         >
//           Add Services
//         </button>
//         {/* Modal add user */}
//         <dialog id="addServiceModal" className="modal">
//           <div className="modal-box">
//             <h3 className="font-semibold text-xl">Add Services</h3>
//             <form onSubmit={handleAddServices}>
//               <div className="py-4">
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="image">Image</label>
//                   <input
//                     type="file"
//                     name="image"
//                     id="image"
//                     required
//                     onChange={(e) => setFile(e.target.files[0])}
//                   />
//                   {percentage !== null && percentage < 100 ? (
//                     <progress
//                       className="progress progress-accent w-56"
//                       value={percentage}
//                       max="100"
//                     ></progress>
//                   ) : (
//                     percentage === 100 && (
//                       <div className="text-green-500 font-semibold">
//                         Upload Completed
//                       </div>
//                     )
//                   )}
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="title">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     placeholder="Masukkan judul"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                     className="input input-bordered w-full "
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="description">Description</label>
//                   <textarea
//                     name="description"
//                     id="description"
//                     placeholder="Masukkan judul"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                     className="textarea textarea-accent w-full"
//                   ></textarea>
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="category">Kategori</label>
//                   <select
//                     name="category"
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                     className="select select-bordered w-full"
//                   >
//                     <option>fikom</option>
//                     <option>fasilkom</option>
//                     <option>dkv</option>
//                   </select>
//                 </div>
//                 <div className="flex flex-col gap-3 mb-3">
//                   <label htmlFor="contact">Contact</label>
//                   <input
//                     type="text"
//                     name="contact"
//                     id="contact"
//                     placeholder="Masukkan Kontak"
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     required
//                     className="input input-bordered w-full "
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className={`w-full btn ${
//                     percentage !== null && percentage < 100
//                       ? "btn-disabled"
//                       : "bg-teal-500"
//                   }`}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//             <div className="modal-action">
//               <form method="dialog" className="flex gap-1">
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() =>
//                     document.getElementById("addServiceModal").close()
//                   }
//                 >
//                   Close
//                 </button>
//               </form>
//             </div>
//           </div>
//         </dialog>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Kategori</th>
//               <th>Contact</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* row 1 */}
//             {data &&
//               data.map((product) => (
//                 <tr key={product.id}>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-12 h-12">
//                           <img
//                             src={product.image}
//                             alt="Avatar Tailwind CSS Component"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{product.title}</td>
//                   <td>{product.description}</td>
//                   <td>{product.category}</td>
//                   <td>{product.contact}</td>
//                   <td>
//                     <button
//                       className="btn btn-error"
//                       onClick={() => handleDelete(product.id, product.image)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Services;

//CODE SEBELUMNYA YANG FIXXXX BET
// "use client";
// import { useEffect, useState } from "react";
// import { auth, db } from "@/firebase/firebase";
// import { doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation"; 
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { useAuthState } from "react-firebase-hooks/auth";
// import CardItem6 from "@/components/CardItem6"; // Make sure this is the correct path
// import CardItem7 from "@/components/CardItem7";

// const UserProfile = () => {
//   const router = useRouter();
//   const [user, loading] = useAuthState(auth);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     contact: "",
//     address: "",
//     packaging: "",
//     namaProduct: "",
//     stock: "",
//     deliveryDate: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [orders, setOrders] = useState([]); // Add this line to initialize orders state

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             fullName: data.name || "",
//             contact: data.contact || "",
//             address: data.address || "",
//           }));
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         const q = query(collection(db, "userRelasi"), where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         const ordersData = querySnapshot.docs.map(doc => doc.data());
//         setOrders(ordersData);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const calculatePrice = () => {
//     const { packaging, namaProduct, stock } = formData;
//     let unitPrice = 0;

//     if (namaProduct === "Karila Pandan Wangi Premium") {
//       switch (packaging) {
//         case "3 Kg":
//           unitPrice = 49500;
//           break;
//         case "5 Kg":
//           unitPrice = 82500;
//           break;
//         case "10 Kg":
//           unitPrice = 165000;
//           break;
//         case "20 Kg":
//           unitPrice = 330000;
//           break;
//         case "25 Kg":
//           unitPrice = 412500;
//           break;
//         default:
//           unitPrice = 0;
//           break;
//       }
//     }

//     if (namaProduct === "Karila Ramos") {
//       switch (packaging) {
//         case "3 Kg":
//           unitPrice = 43500;
//           break;
//         case "5 Kg":
//           unitPrice = 72500;
//           break;
//         case "10 Kg":
//           unitPrice = 145000;
//           break;
//         case "20 Kg":
//           unitPrice = 290000;
//           break;
//         case "25 Kg":
//           unitPrice = 362500;
//           break;
//         default:
//           unitPrice = 0;
//           break;
//       }
//     }
//     return unitPrice * (parseInt(stock) || 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};

//     if (!formData.fullName) newErrors.fullName = "Full name is required";
//     if (!formData.contact) newErrors.contact = "Contact is required";
//     if (!formData.address) newErrors.address = "Address is required";
//     if (!formData.packaging) newErrors.packaging = "Packaging is required";
//     if (!formData.namaProduct) newErrors.namaProduct = "Product is required";
//     if (!formData.stock) newErrors.stock = "Stock is required";
//     if (!formData.deliveryDate) newErrors.deliveryDate = "Delivery date is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0 && user) {
//       const totalHarga = calculatePrice();

//       try {
//         await addDoc(collection(db, "userRelasi"), {
//           userId: user.uid,
//           fullName: formData.fullName,
//           contact: formData.contact,
//           address: formData.address,
//           packaging: formData.packaging,
//           namaProduct: formData.namaProduct,
//           stock: formData.stock,
//           deliveryDate: formData.deliveryDate,
//           totalHarga: totalHarga,
//           status: "barang ready",
//           timestamp: new Date(),
//         });

//         setToastMessage("Order requested successfully");

//         setFormData({
//           fullName: "",
//           contact: "",
//           address: "",
//           packaging: "",
//           namaProduct: "",
//           stock: "",
//           deliveryDate: "",
//         });
//       } catch (error) {
//         console.error("Error adding document: ", error);
//       }
//     }
//   };

//   return (
//     <div className="mt-10">
//       <NavbarAdmin />
//       <div className="py-24">
//         <form
//           onSubmit={handleSubmit}
//           className="max-w-xl mx-auto rounded-xl md:border p-8 md:shadow-lg"
//         >
//           <h2 className="text-center text-2xl font-semibold mb-10">Formulir Kerjasama</h2>
//           <div className="mb-4">
//             <label className="block mb-1">Nama Perusahaan</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.fullName && (
//               <p className="text-red-500">{errors.fullName}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Kontak</label>
//             <input
//               type="text"
//               name="contact"
//               value={formData.contact}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.contact && <p className="text-red-500">{errors.contact}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Alamat Pengiriman</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.address && <p className="text-red-500">{errors.address}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Kemasan</label>
//             <select
//               name="packaging"
//               value={formData.packaging}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             >
//               <option value="">Pilih Kemasan</option>
//               <option value="3 Kg">3 Kg</option>
//               <option value="5 Kg">5 Kg</option>
//               <option value="10 Kg">10 Kg</option>
//               <option value="20 Kg">20 Kg</option>
//               <option value="25 Kg">25 Kg</option>
//             </select>
//             {errors.packaging && (
//               <p className="text-red-500">{errors.packaging}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Nama Beras</label>
//             <select
//               name="namaProduct"
//               value={formData.namaProduct}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             >
//               <option value="">Pilih Beras</option>
//               <option value="Karila Pandan Wangi Premium">Karila Pandan Wangi Premium</option>
//               <option value="Karila Ramos">Karila Ramos</option>
//             </select>
//             {errors.namaProduct && (
//               <p className="text-red-500">{errors.namaProduct}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Stok</label>
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.stock && <p className="text-red-500">{errors.stock}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Tanggal Pengiriman</label>
//             <input
//               type="date"
//               name="deliveryDate"
//               value={formData.deliveryDate}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.deliveryDate && (
//               <p className="text-red-500">{errors.deliveryDate}</p>
//             )}
//           </div>

//           {toastMessage && (
//             <div className="toast toast-end">
//               <div className="alert alert-success">
//                 <span>{toastMessage}</span>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`bg-gray-200 transition-all duration-300 hover:bg-gray-900 hover:text-white px-6 py-4 rounded w-full`}
//           >
//             Pesan Beras
//           </button>
//         </form>

//         <div className="mt-10">
//           <h2 className="text-2xl font-semibold mb-4">Daftar Pesanan</h2>
//           <div className="grid grid-cols-1 gap-4">
//             {orders.map((order, index) => (
//               <CardItem7
//                 key={index}
//                 itemName={order.namaProduct}
//                 ptName={order.fullName}
//                 packaging={order.packaging}
//                 price={order.totalHarga}
//                 status={order.status}
//                 stock={order.stock}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

//CODE YANG SUDAH FIX SEBELUMNYA
// "use client";
// import { useEffect, useState } from "react";
// import { auth, db } from "@/firebase/firebase";
// import { doc, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation"; 
// import NavbarAdmin from "@/components/NavbarAdmin";
// import { useAuthState } from "react-firebase-hooks/auth";
// import CardItem7 from "@/components/CardItem7";

// const UserProfile = () => {
//   const router = useRouter();
//   const [user, loading] = useAuthState(auth);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     contact: "",
//     address: "",
//     packaging: "",
//     namaProduct: "",
//     stock: "",
//     deliveryDate: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);
//   const [orders, setOrders] = useState([]); // Add this line to initialize orders state

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             fullName: data.name || "",
//             contact: data.contact || "",
//             address: data.address || "",
//           }));
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         const q = query(collection(db, "userRelasi"), where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setOrders(ordersData);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const calculatePrice = () => {
//     const { packaging, namaProduct, stock } = formData;
//     let unitPrice = 0;

//     if (namaProduct === "Karila Pandan Wangi Premium") {
//       switch (packaging) {
//         case "3 Kg":
//           unitPrice = 49500;
//           break;
//         case "5 Kg":
//           unitPrice = 82500;
//           break;
//         case "10 Kg":
//           unitPrice = 165000;
//           break;
//         case "20 Kg":
//           unitPrice = 330000;
//           break;
//         case "25 Kg":
//           unitPrice = 412500;
//           break;
//         default:
//           unitPrice = 0;
//           break;
//       }
//     }

//     if (namaProduct === "Karila Ramos") {
//       switch (packaging) {
//         case "3 Kg":
//           unitPrice = 43500;
//           break;
//         case "5 Kg":
//           unitPrice = 72500;
//           break;
//         case "10 Kg":
//           unitPrice = 145000;
//           break;
//         case "20 Kg":
//           unitPrice = 290000;
//           break;
//         case "25 Kg":
//           unitPrice = 362500;
//           break;
//         default:
//           unitPrice = 0;
//           break;
//       }
//     }
//     return unitPrice * (parseInt(stock) || 0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};

//     if (!formData.fullName) newErrors.fullName = "Full name is required";
//     if (!formData.contact) newErrors.contact = "Contact is required";
//     if (!formData.address) newErrors.address = "Address is required";
//     if (!formData.packaging) newErrors.packaging = "Packaging is required";
//     if (!formData.namaProduct) newErrors.namaProduct = "Product is required";
//     if (!formData.stock) newErrors.stock = "Stock is required";
//     if (!formData.deliveryDate) newErrors.deliveryDate = "Delivery date is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0 && user) {
//       const totalHarga = calculatePrice();

//       try {
//         await addDoc(collection(db, "userRelasi"), {
//           userId: user.uid,
//           fullName: formData.fullName,
//           contact: formData.contact,
//           address: formData.address,
//           packaging: formData.packaging,
//           namaProduct: formData.namaProduct,
//           stock: formData.stock,
//           deliveryDate: formData.deliveryDate,
//           totalHarga: totalHarga,
//           status: "barang ready",
//           timestamp: new Date(),
//         });

//         setToastMessage("Order requested successfully");

//         setFormData({
//           fullName: "",
//           contact: "",
//           address: "",
//           packaging: "",
//           namaProduct: "",
//           stock: "",
//           deliveryDate: "",
//         });
//       } catch (error) {
//         console.error("Error adding document: ", error);
//       }
//     }
//   };

//   const filterOrdersByProductName = (productName) => {
//     return orders.filter(order => order.namaProduct === productName);
//   };

//   return (
//     <div className="mt-10">
//       <NavbarAdmin />
//       <div className="mt-53 px-10 my-16">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Order List</h2>
//         {["Karila Pandan Wangi Premium", "Karila Ramos"].map((productName) => (
//           <div key={productName}>
//             <h3 className="text-xl font-semibold mb-2">{productName}</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10" >
//               {filterOrdersByProductName(productName).map((order) => (
//                 <CardItem7
//                   key={order.id}
//                   id={order.id}
//                   itemName={order.namaProduct}
//                   ptName={order.fullName}
//                   packaging={order.packaging}
//                   // price={order.totalHarga}
//                   status={order.status}
//                   deliveryDate={order.deliveryDate}
//                   stock={order.stock}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, addDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; 
import NavbarAdmin from "@/components/NavbarAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import CardItem7 from "@/components/CardItem7";

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
            status: "diproses",
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

  const handleEdit = (order) => {
    setFormData({
      fullName: order.fullName,
      contact: order.contact,
      address: order.address,
      packaging: order.packaging,
      namaProduct: order.namaProduct,
      stock: order.stock,
      deliveryDate: order.deliveryDate,
      deadlineDate: order.deadlineDate,
    });
    setEditOrderId(order.id);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteDoc(doc(db, "userRelasi", orderId));
      setOrders(orders.filter(order => order.id !== orderId));
      setToastMessage("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
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
                    <CardItem7
                      key={order.id}
                      order={order}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <dialog open className="modal">
          <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Edit Order</h3>
            <div className="py-4">
              <label className="block mb-2">
                Nama Lengkap
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Kontak
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Alamat
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Kemasan
                <select
                  name="packaging"
                  value={formData.packaging}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Pilih Kemasan</option>
                  <option value="3 Kg">3 Kg</option>
                  <option value="5 Kg">5 Kg</option>
                  <option value="10 Kg">10 Kg</option>
                  <option value="20 Kg">20 Kg</option>
                  <option value="25 Kg">25 Kg</option>
                </select>
              </label>
              <label className="block mb-2">
                Nama Produk
                <select
                  name="namaProduct"
                  value={formData.namaProduct}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Pilih Produk</option>
                  <option value="Karila Pandan Wangi Premium">Karila Pandan Wangi Premium</option>
                  <option value="Karila Ramos">Karila Ramos</option>
                </select>
              </label>
              <label className="block mb-2">
                Stok
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Tanggal Pengiriman
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Akhir Kerjasama
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deadlineDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Tutup</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default UserProfile;


