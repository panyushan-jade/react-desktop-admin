import React, { Suspense } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { open } from "@tauri-apps/api/shell";
import { Layout, Nav, Button, Spin, Avatar } from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconBell,
  IconGithubLogo,
  IconMoon,
  IconClose,
  IconCheckboxIndeterminate,
  IconMaximize,
} from "@douyinfe/semi-icons";
import { routes } from "../config/router";
import storage from "../utils/localStorage";
import { appWindow } from "@tauri-apps/api/window";
import styles from "./index.module.css";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

const LayoutPage = () => {
  const { Footer, Sider, Content } = Layout;
  const useInfo = storage.getItem("userInfo");
  const getMenuItems = (datas) => {
    const items = [];
    datas.forEach((ele) => {
      const key = ele.index ? "/" : ele.path;
      items.push({
        itemKey: key,
        text: ele.title,
        icon: ele.icon,
        items: ele.children?.length ? getMenuItems(ele.children) : [],
      });
    });
    return items;
  };

  const menuItems = getMenuItems(routes[0].children[0].children).filter(
    (d) => d.itemKey !== "*"
  );

  const renderWrapper = ({ itemElement, props }) => {
    return props.isSubNav ? (
      itemElement
    ) : (
      <Link style={{ textDecoration: "none" }} to={props.itemKey}>
        {itemElement}
      </Link>
    );
  };

  const changeMode = () => {
    const body = document.body;
    if (body.getAttribute("theme-mode") === "dark") {
      body.setAttribute("theme-mode", "light");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };

  if (!useInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  const operatHandle = (type) => {
    appWindow[type]()
  }

  const sendMessageHandle = async () => {
    let permissionGranted = await isPermissionGranted();
    console.log('permissionGranted====>: ', permissionGranted);
    if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
    sendNotification('您有消息来喽，注意查收！');
    }
  }

  return (
    <Layout
      style={{ border: "1px solid var(--semi-color-border)", height: "100vh" }}
    >
      <div data-tauri-drag-region className={styles.titlebar}>
        <Button
            theme="borderless"
            icon={<IconCheckboxIndeterminate />}
            style={{
              color: "var(--semi-color-text-2)"
            }}
            onClick={operatHandle.bind(this,'minimize')}
          />
        <Button
            theme="borderless"
            icon={<IconMaximize />}
            style={{
              color: "var(--semi-color-text-2)"
            }}
            onClick={operatHandle.bind(this,'toggleMaximize')}
          />
        <Button
            theme="borderless"
            icon={<IconClose />}
            style={{
              color: "var(--semi-color-text-2)"
            }}
            onClick={operatHandle.bind(this,'hide')}
          />
      </div>
      <div className={styles.layout_hearder} data-tauri-drag-region>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconSemiLogo style={{ height: "36px", fontSize: 36 }} />
          <span
            data-tauri-drag-region
            style={{
              marginRight: "24px",
              marginLeft: 10,
              color: "var(--semi-color-text-0)",
              fontWeight: "600",
            }}
          >
            企业级后台桌面系统
          </span>
        </div>
        <div>
          <Button
            theme="borderless"
            icon={<IconBell size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
            onClick={sendMessageHandle}
          />
          <Button
            theme="borderless"
            icon={<IconMoon size="large" />}
            onClick={changeMode}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />

          <Button
            theme="borderless"
            onClick={() =>
              open("https://github.com/panyushan-jade/react-desktop-admin")
            }
            icon={<IconGithubLogo size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
          <Avatar color="orange" size="small">
            Jay
          </Avatar>
        </div>
      </div>
      {/* </Header> */}
      <Layout>
        <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <Nav
            style={{ maxWidth: 220, height: "100%" }}
            defaultSelectedKeys={[window.location.pathname]}
            items={menuItems}
            renderWrapper={renderWrapper}
            footer={{
              collapseButton: true,
            }}
          />
        </Sider>
        <Content
          style={{
            padding: "24px",
            backgroundColor: "var(--semi-color-bg-0)",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              border: "1px solid var(--semi-color-border)",
              height: "calc(100%  - 70px)",
              padding: "32px",
            }}
          >
            <Suspense fallback={<Spin size="large" />}>
              <Outlet />
            </Suspense>
            {/* <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={true}>
                            <p>Hi, Bytedance dance dance.</p>
                            <p>Hi, Bytedance dance dance.</p>
                        </Skeleton> */}
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          color: "var(--semi-color-text-2)",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Copyright © 2024 Jade. All Rights Reserved. </span>
        </span>
        <span>
          <span style={{ marginRight: "24px" }}>平台客服</span>
          <span>反馈建议</span>
        </span>
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
