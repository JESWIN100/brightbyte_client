import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Modal, message, Typography } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';

const { Title } = Typography;

const StockAdd = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getallProduct`,
          { withCredentials: true }
        );
        setProducts(response.data.data);
        console.log("products", response.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedStock, setUpdatedStock] = useState('');

  const openModal = (product) => {
    setCurrentProduct(product);
    setUpdatedStock(product.stockNum);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/updateProduct/${currentProduct._id}`,
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
      message.success(response.data.message || 'Stock updated successfully!');
    } catch (error) {
      console.error("Failed to update stock:", error);
      message.error(error.response?.data?.error || "Failed to update stock. Please try again later.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Stock', dataIndex: 'stockNum', key: 'stock' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => openModal(record)} icon={<AiOutlineEdit />}>Update</Button>
      )
    }
  ];

  return (
    <div className={'ml-0 md:ml-64 flex-1 p-4 md:p-6 mt-1'}>
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
        <div className="min-h-screen bg-gray-100 flex ">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
            <Title level={2} className="text-center text-gray-800 mb-6">Product Stock Management</Title>
            <Table dataSource={products} columns={columns} rowKey="_id" className="rounded-lg overflow-hidden" pagination={{ pageSize: 5 }} />

            <Modal
              title={<Title level={4}>Update Stock for {currentProduct?.name}</Title>}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Save Changes"
              cancelText="Cancel"
              centered
              className="rounded-lg"
            >
              <Input
                type="number"
                value={updatedStock}
                onChange={(e) => setUpdatedStock(e.target.value)}
                placeholder="Enter new stock quantity"
                className="input input-bordered w-full mt-4"
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdd;