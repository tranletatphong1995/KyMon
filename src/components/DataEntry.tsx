import React, { useState } from 'react';
import { FengShuiData, Category } from '../types';

interface DataEntryProps {
  onSave: (category: Category, data: FengShuiData) => void;
}

const DataEntry: React.FC<DataEntryProps> = ({ onSave }) => {
  const [category, setCategory] = useState<Category>('CửuTinh');
  const [formData, setFormData] = useState<Partial<FengShuiData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(category, { id: Date.now().toString(), ...formData } as FengShuiData);
    setFormData({});
  };

  const renderForm = () => {
    switch (category) {
      case 'CửuTinh':
        return (
          <>
            <input name="name" placeholder="Tên" onChange={handleInputChange} value={formData.name || ''} required className="w-full p-2 border rounded" />
            <select name="elementType" onChange={handleInputChange} value={formData.elementType || ''} required className="w-full p-2 border rounded">
              <option value="">Chọn Ngũ hành</option>
              <option value="Mộc">Mộc</option>
              <option value="Hỏa">Hỏa</option>
              <option value="Thổ">Thổ</option>
              <option value="Kim">Kim</option>
              <option value="Thủy">Thủy</option>
            </select>
            <select name="yinYang" onChange={handleInputChange} value={(formData as any).yinYang || ''} required className="w-full p-2 border rounded">
              <option value="">Chọn Âm/Dương</option>
              <option value="Âm">Âm</option>
              <option value="Dương">Dương</option>
            </select>
            <textarea name="characteristics" placeholder="Đặc tính" onChange={handleInputChange} value={formData.characteristics || ''} required className="w-full p-2 border rounded" />
            <textarea name="applications" placeholder="Ứng dụng" onChange={handleInputChange} value={formData.applications || ''} required className="w-full p-2 border rounded" />
          </>
        );
      case 'CáchCục':
        return (
          <>
            <input name="name" placeholder="Tên" onChange={handleInputChange} value={formData.name || ''} required className="w-full p-2 border rounded" />
            <input name="components" placeholder="Thành phần" onChange={handleInputChange} value={(formData as any).components || ''} required className="w-full p-2 border rounded" />
            <textarea name="meaning" placeholder="Ý nghĩa" onChange={handleInputChange} value={(formData as any).meaning || ''} required className="w-full p-2 border rounded" />
            <select name="auspiciousness" onChange={handleInputChange} value={(formData as any).auspiciousness || ''} required className="w-full p-2 border rounded">
              <option value="">Chọn Cát/Hung</option>
              <option value="Cát">Cát</option>
              <option value="Hung">Hung</option>
              <option value="Tùy thuộc">Tùy thuộc</option>
            </select>
            <textarea name="applications" placeholder="Ứng dụng" onChange={handleInputChange} value={formData.applications || ''} required className="w-full p-2 border rounded" />
          </>
        );
      default:
        return (
          <>
            <input name="name" placeholder="Tên" onChange={handleInputChange} value={formData.name || ''} required className="w-full p-2 border rounded" />
            <select name="elementType" onChange={handleInputChange} value={formData.elementType || ''} required className="w-full p-2 border rounded">
              <option value="">Chọn Ngũ hành</option>
              <option value="Mộc">Mộc</option>
              <option value="Hỏa">Hỏa</option>
              <option value="Thổ">Thổ</option>
              <option value="Kim">Kim</option>
              <option value="Thủy">Thủy</option>
            </select>
            <textarea name="characteristics" placeholder="Đặc tính" onChange={handleInputChange} value={formData.characteristics || ''} required className="w-full p-2 border rounded" />
            <textarea name="applications" placeholder="Ứng dụng" onChange={handleInputChange} value={formData.applications || ''} required className="w-full p-2 border rounded" />
          </>
        );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-amber-800">Nhập dữ liệu</h2>
      <div className="flex space-x-4 mb-4">
        {['CửuTinh', 'BátMôn', 'BátThần', 'CáchCục'].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              category === cat ? 'bg-amber-600 text-white' : 'bg-amber-200'
            }`}
            onClick={() => setCategory(cat as Category)}
          >
            {cat}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default DataEntry;