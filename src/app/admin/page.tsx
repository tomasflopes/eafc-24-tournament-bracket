"use client";

import PageContainer from "@/components/PageContainer";

const Admin: React.FC = () => {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center relative">
      <h1 className="text-3xl font-bold text-center pt-3">Admin Page</h1>
      <PageContainer />
    </section>
  );
};

export default Admin;
