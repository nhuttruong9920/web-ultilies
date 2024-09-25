"use client";

import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as AntLayout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuInfo } from "rc-menu/lib/interface";
import React, { useEffect, useState } from "react";

const { Content, Sider } = AntLayout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
  background: "white",
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "sub1", <HomeOutlined />, [
    getItem(
      <Link href="/dashboard/date-conversion">Date conversion</Link>,
      "/dashboard/date-conversion"
    ),
    getItem(<Link href="/dashboard/email-editor">Email editor</Link>, "2"),
    getItem("Rich text editor", "/dashboard/email-editor"),
  ]),
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState("");

  const pathname = usePathname();

  const onMenuItemClick = (event: MenuInfo) => {
    setActiveRoute(event.key);
  };

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  return (
    <>
      <AntLayout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={siderStyle}
        >
          <div className="demo-logo-vertical" />
          <Menu
            defaultSelectedKeys={[activeRoute]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            onClick={onMenuItemClick}
          />
        </Sider>
        <AntLayout style={{ marginInlineStart: 200 }}>
          <Content>{children}</Content>
        </AntLayout>
      </AntLayout>
    </>
  );
}
