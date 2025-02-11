import {useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined, QrcodeOutlined} from '@ant-design/icons';
import {Button, Layout, Menu, theme, Image} from 'antd';
import logo_buymed from './assets/logo_buymed.svg';
import logo_buymed_toolkit from './assets/logo_buymed_toolkit.svg';
import Features from './features/index.jsx';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentAppId, setCurrentAppId] = useState('product-qr');
  const {
    token: {colorBgContainer, borderRadiusLG, neutral4},
  } = theme.useToken();

  const onClickMenuItem = item => {
    setCurrentAppId(item.key);
  };

  return (
    <Layout style={{height: '100vh'}}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={'light'}
        collapsedWidth={80}
        width={250}>
        <center>
          <Image
            preview={false}
            width={collapsed ? 40 : 250}
            src={collapsed ? logo_buymed : logo_buymed_toolkit}
            style={{textAlign: 'center', marginBottom: collapsed ? 16 : 0}}
          />
        </center>
        <Menu
          defaultSelectedKeys={['product-qr']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          onClick={onClickMenuItem}
          items={[
            // {
            //   key: 'deeplink',
            //   icon: <LinkOutlined />,
            //   label: 'Deeplink Generator',
            // },
            {
              key: 'product-qr',
              icon: <QrcodeOutlined />,
              label: 'Product QR Generator',
            },
            // {
            //   key: 'sideloader',
            //   icon: <CloudDownloadOutlined />,
            //   label: 'Bundle Sideloader',
            // },
          ]}
        />
      </Layout.Sider>
      <Layout backgroundColor={neutral4}>
        <Layout.Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky', // Sticky header
            top: 0,
            zIndex: 1000,
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Layout.Header>
        <Layout.Content
          className={'hide-scroll-bar'}
          style={{
            margin: 16,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            flex: 1, // Occupy remaining space
          }}>
          <Features appId={currentAppId} />
        </Layout.Content>
        <Layout.Footer
          style={{
            background: colorBgContainer,
            textAlign: 'center',
            position: 'sticky', // Sticky footer
            bottom: 0,
          }}>
          Powered by Daniel from Buymed Technology Center - Buymed Group
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default App;
