import React, { useState } from 'react';
import { FengShuiData, Category } from '../types';

interface DataManagementProps {
  data: Record<Category, FengShuiData[]>;
  onEdit: (category: Category, id: string, updatedData: FengShuiData) => void;
  onDelete: (category: Category, id: string) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ data, onEdit, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('CửuTinh');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<FengShuiData | null>(null);

  const filteredData = data[selectedCategory].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: FengShuiData) => {
    setEditingItem(item);
  };

  const handleSave = (updatedData: FengShuiData) => {
    onEdit(selectedCategory, updatedData.id, updatedData);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
      onDelete(selectedCategory, id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-800">Quản lý dữ liệu</h2>
      <div className="flex space-x-4 mb-4">
        {Object.keys(data).map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? 'bg-amber-600 text-white' : 'bg-amber-200'
            }`}
            onClick={() => setSelectedCategory(category as Category)}
          >
            {category}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên"
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-amber-100">Tên</th>
            <th className="border p-2 bg-amber-100">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h3 className="text-xl font-bold mb-4 text-amber-700">Sửa {editingItem.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingItem);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editingItem.characteristics}
                onChange={(e) => setEditingItem({ ...editingItem, characteristics: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editingItem.applications}
                onChange={(e) => setEditingItem({ ...editingItem, applications: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700">
                  Lưu
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setEditingItem(null)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement;