import React, { useState } from 'react';

// 1. 基本类型练习
const stringVar: string = 'Hello TypeScript';
const numberVar: number = 42;
const booleanVar: boolean = true;
const arrayVar: number[] = [1, 2, 3, 4, 5];
const tupleVar: [string, number] = ['John', 30];

// 2. 接口练习
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// 3. 泛型练习
function identity<T>(value: T): T {
  return value;
}

interface Box<T> {
  value: T;
}

// 4. React组件中使用TypeScript
interface TypeScriptPracticeProps {
  title: string;
  initialCount: number;
}

interface UserState {
  name: string;
  age: number;
  isActive: boolean;
}

function TypeScriptPractice({ title, initialCount }: TypeScriptPracticeProps) {
  // 为状态指定类型
  const [count, setCount] = useState<number>(initialCount);
  const [user, setUser] = useState<UserState>({
    name: 'John',
    age: 30,
    isActive: true,
  });
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Product 1',
      price: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      description: 'This is a product',
    },
  ]);

  // 为事件处理函数指定类型
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: `Product ${products.length + 1}`,
      price: Math.floor(Math.random() * 1000) + 1,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // 使用泛型函数
  const stringValue = identity<string>('Hello');
  const numberValue = identity<number>(123);

  // 使用泛型接口
  const stringBox: Box<string> = { value: 'Hello' };
  const numberBox: Box<number> = { value: 123 };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{title}</h2>

      {/* 基本类型展示 */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>基本类型练习</h3>
        <p>String: {stringVar}</p>
        <p>Number: {numberVar}</p>
        <p>Boolean: {booleanVar.toString()}</p>
        <p>Array: {arrayVar.join(', ')}</p>
        <p>
          Tuple: {tupleVar[0]}, {tupleVar[1]}
        </p>
      </div>

      {/* 泛型展示 */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>泛型练习</h3>
        <p>Generic String: {stringValue}</p>
        <p>Generic Number: {numberValue}</p>
        <p>Generic Box String: {stringBox.value}</p>
        <p>Generic Box Number: {numberBox.value}</p>
      </div>

      {/* 状态管理 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>状态管理</h3>
        <p>Count: {count}</p>
        <button type="button" onClick={handleIncrement} style={{ marginRight: '10px' }}>
          Increment
        </button>
        <button type="button" onClick={() => setCount(initialCount)}>
          Reset
        </button>
      </div>

      {/* 用户信息 */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h3>用户信息</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input type="text" name="name" value={user.name} onChange={handleUserChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Age: </label>
          <input type="number" name="age" value={user.age} onChange={handleUserChange} style={{ marginLeft: '10px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Active: </label>
          <input type="checkbox" name="isActive" checked={user.isActive} onChange={handleUserChange} style={{ marginLeft: '10px' }} />
        </div>
        <p>User: {JSON.stringify(user)}</p>
      </div>

      {/* 产品列表 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>产品列表</h3>
        <button type="button" onClick={handleAddProduct} style={{ marginBottom: '10px' }}>
          Add Product
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <strong>{product.name}</strong> - ${product.price}
              {product.description && <span> - {product.description}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TypeScriptPractice;
