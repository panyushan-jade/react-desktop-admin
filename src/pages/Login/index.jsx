import React from "react";
import { Form, Layout, Typography } from "@douyinfe/semi-ui";
import { IconUser, IconLock, IconBytedanceLogo } from "@douyinfe/semi-icons";

const { Header, Footer, Content } = Layout;

const LoginPage = () => {
  return (
    <Layout className="components-layout-demo">
      <Content
        style={{
          height: "calc(-62px + 100vh)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title heading={3}>企业后台管理系统</Typography.Title>
        <Form
          // wrapperCol={{ span: 20 }}
          // labelCol={{ span: 2 }}
          labelPosition="left"
          labelAlign="right"
        >
          <Form.Input
            prefix={<IconUser />}
            noLabel
            field="account"
            label="账号"
            trigger="blur"
            style={{ width: 250 }}
            placeholder="请输入姓名"
            initValue="semi"
          />
          <Form.Input
            prefix={<IconLock />}
            noLabel
            field="password"
            label="密码"
            trigger="blur"
            style={{ width: 250 }}
            placeholder="请输入姓名"
            initValue="semi"
          />
        </Form>
      </Content>
      <Footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Typography.Text type="secondary">
          <span>Copyright © 2024 Jade. All Rights Reserved. </span>
        </Typography.Text>
      </Footer>
    </Layout>
  );
};

export default LoginPage;
