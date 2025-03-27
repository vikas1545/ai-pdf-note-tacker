import React from "react";
import Sider from "./_conponents/Sider";
import Header from "./_conponents/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 h-screen fixed">
        <Sider />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
