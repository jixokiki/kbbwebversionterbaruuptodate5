// "use client";
// import CardItem from "@/components/CardItem";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import Footer from "@/components/Footer";
// import useAuth from "../hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import NavbarUser from "@/components/NavbarUser";

// export default function Home() {
//   const { user, userProfile } = useAuth();
//   const router = useRouter();
//   const [userName, setUserName] = useState(""); // Inisialisasi state userName dengan nilai awal kosong
//   useEffect(() => {
//     if (user && userProfile.role === "admin") {
//       router.push("/admin");
//     }else if (user && userProfile.role === "gudang") {
//       router.push("/gudang");
//     }else if (user && userProfile.role === "user") {
//       // Jika user adalah admin, kita dapat menampilkan alert selamat datang
//       // dan menampilkan nama admin dari userProfile
//       alert("Selamat datang, " + userProfile.name);
//       setUserName(userProfile.name);
//     }
//   }, [user, userProfile, router]);
//   return (
//     <div>
//       <NavbarUser />
//       <div className="relative">
//         <Image
//           src={"/assets/kbbLogo.jpeg"}
//           width={3000 / 3}
//           height={2000 / 3}
//           className="relative w-full h-screen object-cover"
//           alt="Home Page"
//           priority
//         />
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
//           <h1 className="text-5xl font-extrabold text-orange-950">
//             KBB
//           </h1>
//           <p className="text-xl">Pilih Beras Yang Di Inginkan</p>
//           <button className="bg-white p-4 rounded-lg font-bold text-xl">
//             R +
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }



"use client";
import NavbarUser from "@/components/NavbarUser";
import Image from "next/image";
import Footer from "@/components/Footer";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState(""); // Initialize state userName with an empty value
  const [title, setTitle] = useState("KBB");

  useEffect(() => {
    if (user && userProfile.role === "admin") {
      router.push("/admin");
    } else if (user && userProfile.role === "gudang") {
      router.push("/gudang");
    }else if (user && userProfile.role === "delivery") {
      router.push("/delivery");
    } else if (user && userProfile.role === "user") {
      // If the user is an admin, we can display a welcome alert
      // and show the admin's name from userProfile
      alert("Selamat datang, " + userProfile.name);
      setUserName(userProfile.name);
      setTitle("Customer"); // Set title to Customer if the role is user
    }
  }, [user, userProfile, router]);

  const h1Classes = title === "KBB" ? "text-5xl font-extrabold text-white" : "text-5xl font-extrabold text-blue-950";

  return (
    <div>
      <NavbarUser />
      <div className="relative">
        {title === "KBB" ? (
          <Image
            src={"/assets/gudangkbb.jpeg"}
            width={3000 / 3}
            height={2000 / 3}
            className="relative w-full h-screen object-cover"
            alt="Home Page"
            priority
          />
        ) : (
          <Image
            src={"/assets/kbbLogo.jpeg"}
            width={3000 / 3}
            height={2000 / 3}
            className="relative w-full h-screen object-cover"
            alt="Home Page"
            priority
          />
        )}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center flex flex-col gap-3 w-3/4 md:w-fit">
          <h1 className={h1Classes}>{title}</h1>
          {/* <p className="text-xl">Pilih Beras Yang Di Inginkan</p> */}
          <button className="bg-white p-4 rounded-lg font-bold text-xl">
            R +
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

