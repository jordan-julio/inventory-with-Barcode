"use client";
import { Button, Form, Input, Layout, message, Modal, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from 'next/dynamic'
import { Option } from "antd/es/mentions";
import Sidebar from "@/components/sidebar";
import { Content, Header } from "antd/es/layout/layout";
import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';

interface ZxingOptions {
  deviceId?: string;
  hints?: Map<DecodeHintType, any>;
  constraints?: MediaStreamConstraints;
  timeBetweenDecodingAttempts?: number;
  onResult?: (result: Result) => void;
  onError?: (error: Error) => void;
}

const DeviceSelector = ({ visible, setVisible } : {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}) => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState('');

    useEffect(() => {
        const checkAndRequestCameraPermission = async () => {
            try {
                // Attempt to get a video stream. This prompts the user for permission if not already granted.
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                // If we get here, permission was granted. We can now list devices.
                const devices = await navigator.mediaDevices.enumerateDevices();
                setDevices(devices.filter(device => device.kind === 'videoinput'));
                // Make sure to stop the stream after getting permission to avoid keeping the camera on.
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                // Handle errors or permission denial here.
                console.error('Error requesting camera permission:', error);
                alert('Camera access is required for this feature.');
            }
        };
    
        checkAndRequestCameraPermission();
    }, []);

    const handleDeviceSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDevice(event.target.value);
    };

    return (
        <Modal open={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} destroyOnClose>
            <h2>Please select your device:</h2>
            <select value={selectedDevice} onChange={handleDeviceSelection}>
                <option value="">Select a device</option>
                {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>{device.label || 'Unnamed device'}</option>
                ))}
            </select>
            {selectedDevice && (
                <>
                    <p>You selected: {devices.find(device => device.deviceId === selectedDevice)?.label || 'Unnamed device'}</p>
                    <BarcodeScanner deviceId={selectedDevice} setVisible={setVisible} />
                </>
            )}
        </Modal>
    );
};
  
const useZxing = ({
  deviceId,
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
    const [constraints, setConstraints] = useState<MediaStreamConstraints>({
        audio: false,
        video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'environment' },
    });

  // Update constraints when deviceId changes
  useEffect(() => {
    setConstraints({
      audio: false,
      video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'environment' },
    });
  }, [deviceId]); // React to changes in deviceId

  const ref = useRef<HTMLVideoElement>(null);

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) return;
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result);
      if (error) onError(error);
    });
    return () => {
      reader.reset();
    };
  }, [ref, reader, constraints, onResult, onError]);

  return { ref };
};


const BarcodeScanner = ({
    deviceId,
    setVisible,
    onResult = (result) => {
      console.table(result);
      alert(result.getText());
      setVisible(false);
    },
    onError = (err) => {
      console.log(err);
    },
  }: {
    deviceId: string;
    setVisible: (visible: boolean) => void;
    onResult?: (result: Result) => void;
    onError?: (error: Error) => void;
  }) => {
    // Conditionally set the deviceId in the options for useZxing
    const zxingOptions = deviceId ? { deviceId, onResult, onError } : { onResult, onError };
    const { ref } = useZxing(zxingOptions);
  
    return <video ref={ref} />;
  };
// Path: src/app/admin/users/adduser/page.tsx
export default function AddProduct() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [categoriesDropdownData, setCategoriesDropdownData] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [result, setResult] = useState('');
    const [data, setData] = useState("Not ");
    const [externalCameraId, setExternalCameraId] = useState('');

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'New Product Added Successfully!',
          duration: 5,
        });
      };
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/getAllCategories`);
                setCategoriesDropdownData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllCategories();
    }, []);
    const handleSubmit = async (values: any) => {
        try {
            // hash password
            console.log(values);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/admins/api/addProduct`, { 
                productName: values.productName, 
                description: values.productDescription,
                price: values.productPrice,
                category: values.productCategory,
                // productImage: values.productImage,
                quantity: values.productQuantity,
            });
            form.resetFields();
            success();
          } catch (error) {
            console.error(error);
        }

    }
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout bg-[#e3e3e3]">
            <Header className="mx-8 site-layout-background bg-[#e3e3e3] font-bold" style={{ padding: 0 }}>Add Product to User</Header>
            {contextHolder}
                <Content className=''>
                    {/** add a pop up that says successfull if axios works */}
                    <Form form={form} onFinish={handleSubmit} className="login-form p-8">
                        <Form.Item
                            name="productCategory"
                            rules={[{ required: true, message: 'Please select category!' }]}
                        >
                            <Select placeholder="Select Category">
                                {categoriesDropdownData?.map((category: any) => {
                                    return <Option key={category.id} value={category.id}>{category.categoryName}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="productName"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <Input placeholder="Product Name" />
                        </Form.Item>
                        <Form.Item
                            name="productDescription"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name="productPrice"
                            rules={[{ required: true, message: 'Please input price!' }]}
                        >
                            <Input placeholder="Price" />
                        </Form.Item>
                        <Form.Item
                            name="productQuantity"
                            rules={[{ required: true, message: 'Please input quantity!' }]}
                        >
                            <Input placeholder="Quantity" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add Product
                            </Button>
                        </Form.Item>
                        <DeviceSelector visible={isActive} setVisible={setIsActive} />
                        <Button onClick={() => {setIsActive(!isActive)}} className="login-form-button">
                            {isActive ? "Stop Scanning" : "Start Barcode Scan"}
                        </Button>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
}