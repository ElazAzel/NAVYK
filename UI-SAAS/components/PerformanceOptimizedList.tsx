import React, { memo } from 'react';

type PerformanceOptimizedListProps = {
  items: string[];
  onItemSelect?: (item: string) => void;
};

const PerformanceOptimizedList = memo(
  ({ items, onItemSelect }: PerformanceOptimizedListProps) => {
    if (!items?.length) {
      return (
        <div className="p-4 text-gray-700">
          Нет элементов для отображения
        </div>
      );
    }

    const handleItemClick = (item: string) => {
      onItemSelect?.(item);
    };

    return (
      <ul className="flex flex-col gap-2 p-4">
        {items.map((item, index) => (
          <li
            key={index}
            tabIndex={0}
            aria-label={`Выбрать элемент: ${item}`}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemClick(item);
              }
            }}
            className="cursor-pointer rounded-md bg-blue-100 p-2 hover:bg-blue-200"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
);

// Добавляем displayName для компонента
PerformanceOptimizedList.displayName = 'PerformanceOptimizedList';

export default PerformanceOptimizedList; 