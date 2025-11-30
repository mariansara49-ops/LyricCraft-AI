
import React from 'react';

interface OptionSelectorProps<T extends string> {
  label: string;
  options: T[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

const OptionSelector = <T extends string,>({ label, options, selectedValue, onSelect }: OptionSelectorProps<T>) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out transform hover:scale-105
              ${
                selectedValue === option
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;
