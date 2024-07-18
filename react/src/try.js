import React, { useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';

const DataViewDemo = () => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const data = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Doe', age: 40 },
  ];

  const onSortChange = (event) => {
    setSortField(event.sortField);
    setSortOrder(event.sortOrder);
  };

  const toggleSort = () => {
    if (sortOrder === 1) {
      setSortOrder(-1); // יורד
    } else {
      setSortOrder(1); // עולה
    }
  };

  const itemTemplate = (item) => {
    return (
      <div className="p-grid">
        <div className="p-col">{item.id}</div>
        <div className="p-col">{item.name}</div>
        <div className="p-col">{item.age}</div>
      </div>
    );
  };

  return (
    <div className="dataview-demo">
      <div className="p-mb-3">
        <Button onClick={toggleSort} label="החלף מיון" />
      </div>
      <DataView
        value={data}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        itemTemplate={itemTemplate}
        paginator
        rows={5}
        className="p-dataview-striped"
      />
    </div>
  );
};

export default DataViewDemo;
