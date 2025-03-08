import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, message, Typography, Skeleton, Badge ,Alert} from 'antd';
import { EditOutlined, InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text } = Typography;

const StockAdd = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedStock, setUpdatedStock] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallProduct`,
        { withCredentials: true }
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const notifyAdmin = async (product) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notify/make`, {
        productId: product._id,
        productName: product.name
      });
      message.success(`Admin notified about ${product.name} being out of stock.`);
    } catch (error) {
      console.error("Failed to notify admin:", error);
      message.error("Failed to notify admin. Please try again later.");
    }
  };






  const openModal = (product) => {
    setCurrentProduct(product);
    setUpdatedStock(product.stockNum);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/updateProduct/${currentProduct._id}`,
        { stockNum: Number(updatedStock) },
        { withCredentials: true }
      );

      const updatedProducts = products.map((product) =>
        product._id === currentProduct._id
          ? { ...product, stockNum: Number(updatedStock) }
          : product
      );

      setProducts(updatedProducts);
      setIsModalOpen(false);

      message.success({
        content: response.data.message || 'Stock updated successfully!',
        icon: <Badge status="success" />,
        className: 'custom-message-success'
      });
    } catch (error) {
      console.error("Failed to update stock:", error);
      message.error({
        content: error.response?.data?.error || "Failed to update stock. Please try again later.",
        className: 'custom-message-error'
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const outOfStockProducts = products.filter(product => product.stockNum <= 0);
  const getStockStatus = (stock) => {
    if (stock <= 0) return { status: 'error', text: 'Out of Stock' };
    if (stock < 10) return { status: 'warning', text: 'Low Stock' };
    return { status: 'success', text: 'In Stock' };
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      ellipsis: true,
      width: '25%',
      render: (id) => (
        <Text copyable ellipsis style={{ maxWidth: 150 }}>{id}</Text>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <Text strong>{name}</Text>
      )
    },
    {
      title: 'Stock',
      dataIndex: 'stockNum',
      key: 'stock',
      render: (stockNum,record) => {
        const { status, text } = getStockStatus(stockNum);
        if (stockNum <= 0) notifyAdmin(record);
        return (
          <Badge status={status} text={
            <span>
              <Text strong>{stockNum}</Text>
              <Text type={status === 'error' ? 'danger' : status === 'warning' ? 'warning' : ''} style={{ marginLeft: 8 }}>
                {text}
              </Text>
            </span>
          } />
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => openModal(record)}
          icon={<EditOutlined />}
          className="update-button"
        >
          Update
        </Button>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1"
    >
       
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <Title level={2} className="text-center text-white mb-2">Product Stock Management</Title>
          <Text className="text-center block text-white opacity-80">Manage your inventory with ease</Text>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              prefix={<InboxOutlined />}
              className="max-w-xs"
              allowClear
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchProducts}
              loading={loading}
              type="default"
            >
              Refresh
            </Button>
          </div>
          {outOfStockProducts.length > 0 && (
        <Alert
          message="Attention: Some products are out of stock!"
          type="error"
          showIcon
          closable
          style={{ marginBottom: '20px' }}
        />
      )}
          <AnimatePresence>
            {loading ? (
              <Skeleton active paragraph={{ rows: 5 }} />
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Table
                  dataSource={filteredProducts}
                  columns={columns}
                  rowKey="_id"
                  className="stock-table"
                  pagination={{
                    pageSize: 5,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  }}
                  rowClassName={(record) =>
                    record.stockNum <= 0 ? 'out-of-stock-row' :
                      record.stockNum < 10 ? 'low-stock-row' : ''
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center">
            <EditOutlined className="mr-2 text-blue-500" />
            <span>Update Stock for {currentProduct?.name}</span>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        cancelText="Cancel"
        centered
        className="stock-modal"
        okButtonProps={{
          className: "save-button",
          size: "large"
        }}
        cancelButtonProps={{ size: "large" }}
      >
        <div className="p-4">
          <Text>Current Stock: <Text strong>{currentProduct?.stockNum}</Text></Text>
          <Input
            type="number"
            value={updatedStock}
            onChange={(e) => setUpdatedStock(e.target.value)}
            placeholder="Enter new stock quantity"
            className="mt-4 stock-input"
            min={0}
            addonBefore="Quantity"
            size="large"
          />
        </div>
      </Modal>

      <style jsx>{`
        .stock-table .ant-table {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }
        
        .out-of-stock-row {
          background-color: rgba(255, 77, 79, 0.1);
        }
        
        .low-stock-row {
          background-color: rgba(250, 173, 20, 0.1);
        }
        
        .update-button {
          background: linear-gradient(90deg, #1890ff, #46c6ff);
          border: none;
          transition: all 0.3s;
        }
        
        .update-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
        }
        
        .stock-input:focus {
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
        
        .stock-modal .ant-modal-content {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .save-button {
          background: linear-gradient(90deg, #1890ff, #46c6ff);
          border: none;
        }
        
        .custom-message-success {
          background: linear-gradient(90deg, #52c41a, #b7eb8f);
          border-radius: 4px;
        }
        
        .custom-message-error {
          background: linear-gradient(90deg, #ff4d4f, #ffccc7);
          border-radius: 4px;
        }
      `}</style>
    </motion.div>
  );
};

export default StockAdd;