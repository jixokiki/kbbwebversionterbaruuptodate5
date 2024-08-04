"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NavbarDelivery from "@/components/NavbarDelivery";
import Footer from "@/components/Footer";

const Delivery = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  const [deliveryName, setDeliveryName] = useState("");
  useEffect(() => {
    if (user && userProfile.role === "user") {
      router.push("/");
    } else if (user && userProfile.role === "admin") {
      // Jika user adalah admin, kita dapat menampilkan alert selamat datang
      // dan menampilkan nama admin dari userProfile
      alert("Selamat datang, " + userProfile.name);
      setAdminName(userProfile.name);
    }else if (user && userProfile.role === "gudang") {
      // Jika user adalah admin, kita dapat menampilkan alert selamat datang
      // dan menampilkan nama admin dari userProfile
      alert("Selamat datang, " + userProfile.name);
      setGudangName(userProfile.name);
    }else if (user && userProfile.role === "delivery") {
      // Jika user adalah admin, kita dapat menampilkan alert selamat datang
      // dan menampilkan nama admin dari userProfile
      alert("Selamat datang, " + userProfile.name);
      setDeliveryName(userProfile.name);
    }
  }, [user, userProfile, router]);
  return (
    <div>
      <div className="px-7 py-1 mt-14">
      <NavbarDelivery />
      <div className="flex mt-16 py-14 flex-col items-center">
        <Image
          src={"/assets/kbbLogo.jpeg"}
          width={1000 / 2}
          height={1125 / 4}
          alt="Logo"
        />
        <h1 className="text-3xl">Selamat Datang Di Halaman Delivery</h1>
        {deliveryName && <p>Delivery: {deliveryName}</p>}
      </div>
    {/* <div className="flex mt-1 justify-center items-center h-screen"> */}
      {/* <NavbarGudang /> */}
      {/* <div className="flex flex-col items-center">
        <Image
          src={"/assets/kbbLogo.jpeg"}
          width={1000 / 2}
          height={1125 / 4}
          alt="Logo"
        />
        <h1 className="text-3xl">Welcome To Gudang Page</h1>
        {gudangName && <p>Gudang: {gudangName}</p>}
      </div> */}
    </div>
    <Footer/>
    </div>
  );
};

export default Delivery;
