import React,{ Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from '../../utils/localStorage';
import { Form, Layout, Typography,Col, Row,Button,Toast,Spin } from "@douyinfe/semi-ui";
import { IconUser, IconLock } from "@douyinfe/semi-icons";
import login from "../../assets/login.svg";
import styles from './login.module.css';

const { Footer, Content } = Layout;

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LoginPage = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setLoading(true);
    await delay(1000);
    setLoading(false);
    storage.setItem('userInfo',values)
    Toast.success('登陆成功🎉🎉🎉');
    navigate("/"); 
   }

  return (
    <Suspense fallback={<Spin size="large" />}>
    <Layout>
      <Row>
        <Col span={10}>
        <Content
          style={{
            height: "calc(-82px + 100vh)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.login}>
          <Typography.Title heading={3}>企业创作服务平台</Typography.Title>
          <Form
          onSubmit={onSubmit}
            labelPosition="left"
            labelAlign="right"
            initValues={{account:'admin',password:'admin'}}
          >
            <Form.Input
              prefix={<IconUser />}
              noLabel
              field="account"
              label="账号"
              style={{ width: 250 }}
              placeholder="账号"
              rules={[
                { required: true, message: '请输入账号' }
              ]}
            />
            <Form.Input
              prefix={<IconLock />}
              noLabel
              field="password"
              mode="password"
              label="密码"
              style={{ width: 250 }}
              placeholder="密码"
              rules={[
                { required: true, message: '请输入密码' }
              ]}
            />
            {/* <Button disabled={!values.agree} htmlType='submit' type="tertiary">Log in</Button> */}
            <Button htmlType='submit' style={{width:250,marginTop:20}} loading={loading}>登录</Button>
          </Form>
          </div>
        </Content>
        </Col>
        <Col span={14} style={{paddingRight:100,marginTop:20}}><img src={login} alt="login" style={{width:'100%',height:'calc(-82px + 100vh)'}} /></Col>
      </Row>
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
    </Suspense>
  );
};

export default LoginPage;
