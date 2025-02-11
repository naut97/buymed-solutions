import React from 'react';
import {Button, DatePicker, Flex, Form, Input, Layout, Typography} from 'antd';
import dayjs from 'dayjs';
import {QRCodeSVG} from 'qrcode.react';

const ProductQRGenerator = () => {
  const [currentLink, setCurrentLink] = React.useState('');

  const onFinish = values => {
    const {
      computerCode,
      productId,
      sellerCode,
      lot,
      vat,
      expiredDate,
      purchaseOrderId,
      increaseCode,
    } = values;
    console.log('Success:', values);

    let link = 'https://thuocsi.vn/qr/';
    if (productId) {
      link += `P${productId.length.toString().padStart(2, '0')}${productId}`;
    }
    if (sellerCode) {
      link += `S${sellerCode.length.toString().padStart(2, '0')}${sellerCode}`;
    }
    if (lot) {
      link += `L${lot.length.toString().padStart(2, '0')}${lot}`;
    }
    if (expiredDate) {
      const date = dayjs(expiredDate).format('DDMMYY');
      link += `E${date.length.toString().padStart(2, '0')}${date}`;
    }
    if (vat) {
      link += `V${vat.length.toString().padStart(2, '0')}${vat}`;
    }
    if (purchaseOrderId) {
      link += `R${purchaseOrderId.length.toString().padStart(2, '0')}${purchaseOrderId}`;
    }

    const createdTimestamp = Math.floor(new Date().getTime() / 1000.0).toString();
    const uniqueId =
      `T${createdTimestamp.length.toString().padStart(2, '0')}${createdTimestamp}C${computerCode.length.toString().padStart(2, '0')}${computerCode}I${increaseCode.length.toString().padStart(2, '0')}${increaseCode}`
        .length;
    console.log('uniqueId', uniqueId);

    link += `U${uniqueId}`;
    link += `T${createdTimestamp.length.toString().padStart(2, '0')}${createdTimestamp}`;

    if (computerCode) {
      link += `C${computerCode.length.toString().padStart(2, '0')}${computerCode}`;
    }
    if (increaseCode) {
      link += `I${increaseCode.length.toString().padStart(2, '0')}${increaseCode}`;
    }
    setCurrentLink(link);
  };

  return (
    <Layout>
      <Typography.Title style={{textAlign: 'center'}}>Buymed Product QR Generator</Typography.Title>
      <Flex gap="small">
        <Layout>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onFinish}>
            <Form.Item
              label="Product ID"
              name="productId"
              rules={[
                {
                  required: true,
                  message: 'Please input product ID!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Seller Code"
              name="sellerCode"
              rules={[
                {
                  required: true,
                  message: 'Please input seller code!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Lot"
              name="lot"
              rules={[
                {
                  required: true,
                  message: 'Please input product lot!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Expiry Date"
              name="expiredDate"
              rules={[
                {
                  required: true,
                  message: 'Please input expiry date!',
                },
              ]}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="VAT Value"
              name="vat"
              rules={[
                {
                  required: true,
                  message: 'Please input vat!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Purchase Order ID"
              name="purchaseOrderId"
              rules={[
                {
                  required: true,
                  message: 'Please input purchase order ID!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Computer Code"
              name="computerCode"
              rules={[
                {
                  required: true,
                  message: 'Please input computer code!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Increase Code"
              name="increaseCode"
              rules={[
                {
                  required: true,
                  message: 'Please input increase code!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Generate QR
              </Button>
            </Form.Item>
          </Form>
        </Layout>
        {currentLink ? (
          <Layout>
            <Typography.Title level={4}>QR Canvas: </Typography.Title>
            <QRCodeSVG value={currentLink} />
            <Typography.Title level={4}>Link: </Typography.Title>
            <Typography.Text copyable>{currentLink}</Typography.Text>
          </Layout>
        ) : (
          <></>
        )}
      </Flex>
    </Layout>
  );
};

export default ProductQRGenerator;
