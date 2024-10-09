import React, { useState, useEffect } from 'react';
import Lookup from './components/Lookup';
import DataEntry from './components/DataEntry';
import DataManagement from './components/DataManagement';
import { FengShuiData, Category } from './types';
import { Compass, Upload } from 'lucide-react';

const initialData: Record<Category, FengShuiData[]> = {
  CửuTinh: [],
  BátMôn: [],
  BátThần: [],
  CáchCục: [],
};

function App() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<'lookup' | 'dataEntry' | 'dataManagement'>('lookup');

  useEffect(() => {
    const savedData = localStorage.getItem('fengShuiData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Lỗi khi đọc dữ liệu từ localStorage:', error);
        alert('Có lỗi xảy ra khi đọc dữ liệu đã lưu. Dữ liệu có thể đã bị hỏng.');
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fengShuiData', JSON.stringify(data));
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu vào localStorage:', error);
      alert('Có lỗi xảy ra khi lưu dữ liệu. Một số thay đổi có thể không được lưu.');
    }
  }, [data]);

  const handleSave = (category: Category, newData: FengShuiData) => {
    setData((prevData) => ({
      ...prevData,
      [category]: [...prevData[category], newData],
    }));
  };

  const handleEdit = (category: Category, id: string, updatedData: FengShuiData) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      ),
    }));
  };

  const handleDelete = (category: Category, id: string) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].filter((item) => item.id !== id),
    }));
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const importedData = JSON.parse(content);
          const convertedData = {
            CửuTinh: importedData.CửuTinh?.map((star: any) => ({
              ...star,
              elementType: 'NgũHành',
              yinYang: star.yinYang === 'Yin' ? 'Âm' : 'Dương'
            })) || [],
            BátMôn: importedData.BátMôn?.map((gate: any) => ({
              ...gate,
              elementType: 'NgũHành'
            })) || [],
            BátThần: importedData.BátThần?.map((spirit: any) => ({
              ...spirit,
              elementType: 'NgũHành'
            })) || [],
            CáchCục: importedData.CáchCục?.map((formation: any) => ({
              ...formation,
              auspiciousness: formation.auspiciousness === 'Auspicious' ? 'Cát' : 
                              formation.auspiciousness === 'Inauspicious' ? 'Hung' : 'Tùy thuộc'
            })) || []
          };
          setData(convertedData);
          alert('Dữ liệu đã được nhập thành công!');
        } catch (error) {
          console.error('Lỗi khi phân tích dữ liệu:', error);
          alert(`Có lỗi xảy ra khi nhập dữ liệu. Chi tiết lỗi: ${(error as Error).message}. Vui lòng kiểm tra file và thử lại.`);
        }
      };
      reader.onerror = (error) => {
        console.error('Lỗi khi đọc file:', error);
        alert('Có lỗi xảy ra khi đọc file. Vui lòng thử lại.');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-700 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Compass className="mr-2" size={24} />
            <h1 className="text-2xl font-bold">Hệ thống Tham khảo Phong thủy</h1>
          </div>
          <div>
            <label htmlFor="import-data" className="cursor-pointer flex items-center bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded">
              <Upload size={20} className="mr-2" />
              Nhập dữ liệu
            </label>
            <input
              id="import-data"
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </div>
        </div>
      </header>
      <nav className="bg-amber-600 text-white">
        <div className="container mx-auto flex">
          <button
            className={`px-4 py-2 ${activeTab === 'lookup' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('lookup')}
          >
            Tra cứu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataEntry' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('dataEntry')}
          >
            Nhập dữ liệu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataManagement' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('dataManagement')}
          >
            Quản lý dữ liệu
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-8">
        {activeTab === 'lookup' && <Lookup data={data} />}
        {activeTab === 'dataEntry' && <DataEntry onSave={handleSave} />}
        {activeTab === 'dataManagement' && (
          <DataManagement data={data} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default App;