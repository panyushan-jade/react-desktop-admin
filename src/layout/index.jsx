import React,{ Suspense } from 'react';
import { Outlet,Link,Navigate } from "react-router-dom";
import { open } from '@tauri-apps/api/shell';
import { Layout, Nav, Button, Spin, Avatar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconGithubLogo, IconMoon,IconClose } from '@douyinfe/semi-icons';
import { routes } from '../config/router';
import storage from '../utils/localStorage';
import { invoke } from '@tauri-apps/api/tauri'

const LayoutPage = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const useInfo = storage.getItem('userInfo')
    const getMenuItems = (datas) => {
        const items = []
        datas.forEach( ele => {
            const key = ele.index ? '/' : ele.path
            items.push({
                itemKey: key,
                text: ele.title,
                icon:ele.icon,
                items: ele.children?.length ? getMenuItems(ele.children) : []
            })
        });
        return items
    }

    const menuItems = getMenuItems(routes[0].children[0].children).filter( d => d.itemKey !== '*')

    const renderWrapper = ({ itemElement, props }) => {
        return props.isSubNav ? itemElement : (
            <Link
                style={{ textDecoration: "none" }}
                to={props.itemKey}
            >
                {itemElement}
            </Link>
        );
    }

    const changeMode = () => {
        const body = document.body;
        if(body.getAttribute('theme-mode') === 'dark'){
            body.setAttribute('theme-mode', 'light');
        }else{
            body.setAttribute('theme-mode', 'dark');
        }
    }

    if(!useInfo){
        return <Navigate to="/login" replace={true} />;
    }
    
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)',height:'100vh'}}>
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <Nav mode="horizontal">
                        <Nav.Header>
                            <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />
                        </Nav.Header>
                        <span
                            style={{
                                color: 'var(--semi-color-text-2)',
                            }}
                        >
                            <span
                                style={{
                                    marginRight: '24px',
                                    color: 'var(--semi-color-text-0)',
                                    fontWeight: '600',
                                }}
                            >
                                企业级后台桌面系统
                            </span>
                        </span>
                        <Nav.Footer>
                            <Button
                                theme="borderless"
                                icon={<IconBell size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            />
                            <Button
                                theme="borderless"
                                icon={<IconMoon size="large" />}
                                onClick={changeMode}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            />
                            
                            <Button
                                theme="borderless"
                                onClick={() => open('https://github.com/panyushan-jade/react-desktop-admin')}
                                icon={<IconGithubLogo size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            />
                            <Button
                                theme="borderless"
                                icon={<IconClose size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                                onClick={() => invoke('close_window')}
                            />
                            <Avatar color="orange" size="small">
                                YJ
                            </Avatar>
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Layout>
                <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                        style={{ maxWidth: 220, height: '100%' }}
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
                        padding: '24px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                    }}
                >
                    <div
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--semi-color-border)',
                            height: 'calc(100%  - 70px)',
                            padding: '32px',
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span>Copyright © 2024 Jade. All Rights Reserved. </span>
                </span>
                <span>
                    <span style={{ marginRight: '24px' }}>平台客服</span>
                    <span>反馈建议</span>
                </span>
            </Footer>
        </Layout>
    );
};

export default LayoutPage
