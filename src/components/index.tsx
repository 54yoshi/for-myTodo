"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Index: React.FC = () => {
  const router = useRouter();
  router.push("/admin/login");
  return null
};

export default Index;