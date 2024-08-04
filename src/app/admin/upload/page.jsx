// "use client"
// import React, { useEffect, useState } from "react";
// import { db } from "@/firebase/firebase";
// import { collection, onSnapshot, query, updateDoc, doc } from "firebase/firestore";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import NavbarAdmin from "@/components/NavbarAdmin";

// const PaymentProofList = () => {
//   const [paymentProofs, setPaymentProofs] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(query(collection(db, "buktiTransfer")), (snapshot) => {
//       const proofs = [];
//       snapshot.forEach((doc) => {
//         proofs.push({ id: doc.id, ...doc.data() });
//       });
//       setPaymentProofs(proofs);
//     });

//     return () => unsubscribe();
//   }, []);

// //   const handleApprove = async (id) => {
// //     try {
// //       const proofDocRef = doc(db, "buktiTransfer", id);
// //       await updateDoc(proofDocRef, { statusPembayaranUpload: "bukti payment di acc", });
// //       alert("Status berhasil diubah menjadi 'bukti payment di acc'");
// //     } catch (error) {
// //       console.error("Error updating status: ", error);
// //       alert("Gagal mengubah status");
// //     }
// //   };

// const handleApprove = async (id) => {
//     try {
//       const proofDocRef = doc(db, "buktiTransfer", id);
//       await updateDoc(proofDocRef, { statusPembayaranUpload: "bukti payment di acc" });
  
//       // Setelah mengubah status di buktiTransfer, sinkronkan perubahan dengan products
//       const productQuery = query(collection(db, "products"), where("title", "==", proof.title));
//       const productSnapshot = await getDocs(productQuery);
  
//       if (!productSnapshot.empty) {
//         productSnapshot.forEach(async (doc) => {
//           const productDocRef = doc(db, "products", doc.id);
//           await updateDoc(productDocRef, { statusPembayaranUpload: "bukti payment di acc" });
//         });
//       }
  
//       alert("Status berhasil diubah menjadi 'bukti payment di acc'");
//     } catch (error) {
//       console.error("Error updating status: ", error);
//       alert("Gagal mengubah status");
//     }
//   };
  

//   return (
//     <div>
//       <NavbarAdmin />
//       <div className="p-8 md:p-24 mt-10">
//         <h2 className="text-3xl mb-8">Daftar Bukti Transfer</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {paymentProofs.map((proof) => (
//             <div key={proof.id} className="bg-white p-4 shadow-md rounded-lg">
//               <h3 className="text-xl font-semibold mb-2">{proof.title}</h3>
//               <p className="text-gray-700 mb-2">{proof.description}</p>
//               <p className="text-gray-700 mb-2">{`Price: ${proof.price}`}</p>
//               <img src={proof.proofUrl} alt="Payment Proof" className="w-full h-auto mb-4" />
//               <p className="text-gray-700 mb-2">{`Status: ${proof.statusPembayaranUpload}`}</p>
//               <p className="text-gray-700 mb-2">{`Timestamp: ${proof.timestamp.toDate().toLocaleString()}`}</p>
//               {proof.statusPembayaranUpload === "mohon menunggu proses pengerjaan" && (
//                 <button
//                   onClick={() => handleApprove(proof.id)}
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
//                 >
//                   Approve Bukti Payment
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PaymentProofList;

//code fix tanggal minggu 4 agustua
// "use client";
// import { useEffect, useState } from "react";
// import { auth, db } from "@/firebase/firebase";
// import { doc, getDoc, addDoc, collection } from "firebase/firestore";
// import { useRouter } from "next/navigation"; // Menggunakan next/router bukan next/navigation
// import Navbar from "@/components/Navbar";
// import { useAuthState } from "react-firebase-hooks/auth";
// import NavbarUser from "@/components/NavbarUser";
// import NavbarAdmin from "@/components/NavbarAdmin";

// const UserProfile = () => {
//   const router = useRouter();
//   const [user, loading] = useAuthState(auth);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     contact: "",
//     address: "",
//     packaging: "", // Tambahan state untuk packaging
//     namaProduct: "",
//     stock: "", // Tambahan state untuk stock
//     deliveryDate: "", // Tambahan state untuk tanggal pengiriman
//   });
//   const [errors, setErrors] = useState({});
//   const [toastMessage, setToastMessage] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user) {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setFormData({
//             ...formData,
//             fullName: data.name || "",
//             contact: data.contact || "",
//             address: data.address || "",
//           });
//         }
//       }
//     };
//     fetchUserData();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
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
//     return unitPrice * (parseInt(stock) || 0); // Mengalikan harga satuan dengan jumlah stok
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       let newErrors = {};
//       if (!formData.fullName) {
//         newErrors.fullName = "Full name is required";
//       }
//       if (!formData.contact) {
//         newErrors.contact = "Contact is required";
//       }
//       if (!formData.address) {
//         newErrors.address = "Address is required";
//       }
//       if (!formData.packaging) {
//         newErrors.packaging = "Packaging is required";
//       }
//       if (!formData.namaProduct) {
//         newErrors.namaProduct = "Product is required";
//       }
//       if (!formData.stock) {
//         newErrors.stock = "Stock is required";
//       }
//       if (!formData.deliveryDate) {
//         newErrors.deliveryDate = "Delivery date is required";
//       }
//       setErrors(newErrors);

//       if (Object.keys(newErrors).length === 0 && user) {
//         const totalHarga = calculatePrice();

//         // Simpan ke koleksi userRequestOrder di Firebase
//         const docRef = await addDoc(collection(db, "userRelasi"), {
//           userId: user.uid,
//           fullName: formData.fullName,
//           contact: formData.contact,
//           address: formData.address,
//           packaging: formData.packaging,
//           namaProduct: formData.namaProduct,
//           stock: formData.stock,
//           deliveryDate: formData.deliveryDate,
//           totalHarga: totalHarga, // Menambahkan total harga
//           status: "diproses", // Menambahkan status barang
//           timestamp: new Date(),
//         });

//         setToastMessage("Order requested successfully");

//         // Bersihkan form setelah submit
//         setFormData({
//           fullName: "",
//           contact: "",
//           address: "",
//           packaging: "",
//           namaProduct: "",
//           stock: "",
//           deliveryDate: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding document: ", error);
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
//               // value={formData.fullName}
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
//               // value={formData.contact}
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
//               // value={formData.address}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             {errors.address && <p className="text-red-500">{errors.address}</p>}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Kemasan</label>
//             <select
//               name="packaging"
//               // value={formData.packaging}
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
//               // value={formData.namaProduct}
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
//               // value={formData.stock}
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
//               // value={formData.deliveryDate}
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
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import NavbarUser from "@/components/NavbarUser";
import NavbarAdmin from "@/components/NavbarAdmin";

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
    deadlineDate: "", // Tambahan state untuk tanggal batasan waktu
  });
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...formData,
            fullName: data.name || "",
            contact: data.contact || "",
            address: data.address || "",
          });
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    try {
      e.preventDefault();
      let newErrors = {};
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.contact) {
        newErrors.contact = "Contact is required";
      }
      if (!formData.address) {
        newErrors.address = "Address is required";
      }
      if (!formData.packaging) {
        newErrors.packaging = "Packaging is required";
      }
      if (!formData.namaProduct) {
        newErrors.namaProduct = "Product is required";
      }
      if (!formData.stock) {
        newErrors.stock = "Stock is required";
      }
      if (!formData.deliveryDate) {
        newErrors.deliveryDate = "Delivery date is required";
      }
      if (!formData.deadlineDate) {
        newErrors.deadlineDate = "Deadline date is required";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && user) {
        const totalHarga = calculatePrice();

        // Simpan ke koleksi userRequestOrder di Firebase
        const docRef = await addDoc(collection(db, "userRelasi"), {
          userId: user.uid,
          fullName: formData.fullName,
          contact: formData.contact,
          address: formData.address,
          packaging: formData.packaging,
          namaProduct: formData.namaProduct,
          stock: formData.stock,
          deliveryDate: formData.deliveryDate,
          deadlineDate: formData.deadlineDate, // Menambahkan tanggal batasan waktu ke database
          totalHarga: totalHarga,
          status: "diproses",
          statusDelivery:"diproses",
          timestamp: new Date(),
        });

        setToastMessage("Order requested successfully");

        // Bersihkan form setelah submit
        setFormData({
          fullName: "",
          contact: "",
          address: "",
          packaging: "",
          namaProduct: "",
          stock: "",
          deliveryDate: "",
          deadlineDate: "",
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="mt-10">
      <NavbarAdmin />
      <div className="py-24">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto rounded-xl md:border p-8 md:shadow-lg"
        >
          <h2 className="text-center text-2xl font-semibold mb-10">Formulir Kerjasama</h2>
          <div className="mb-4">
            <label className="block mb-1">Nama Perusahaan</label>
            <input
              type="text"
              name="fullName"
              // value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Kontak</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.contact && <p className="text-red-500">{errors.contact}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Alamat Pengiriman</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Kemasan</label>
            <select
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Pilih Kemasan</option>
              <option value="3 Kg">3 Kg</option>
              <option value="5 Kg">5 Kg</option>
              <option value="10 Kg">10 Kg</option>
              <option value="20 Kg">20 Kg</option>
              <option value="25 Kg">25 Kg</option>
            </select>
            {errors.packaging && (
              <p className="text-red-500">{errors.packaging}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nama Beras</label>
            <select
              name="namaProduct"
              value={formData.namaProduct}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Pilih Beras</option>
              <option value="Karila Pandan Wangi Premium">Karila Pandan Wangi Premium</option>
              <option value="Karila Ramos">Karila Ramos</option>
            </select>
            {errors.namaProduct && (
              <p className="text-red-500">{errors.namaProduct}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tanggal Pengiriman</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.deliveryDate && (
              <p className="text-red-500">{errors.deliveryDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Tanggal Batasan Waktu</label>
            <input
              type="date"
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.deadlineDate && (
              <p className="text-red-500">{errors.deadlineDate}</p>
            )}
          </div>

          {toastMessage && (
            <div className="toast toast-end">
              <div className="alert alert-success">
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`bg-gray-200 transition-all duration-300 hover:bg-gray-900 hover:text-white px-6 py-4 rounded w-full`}
          >
            Pesan Beras
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
