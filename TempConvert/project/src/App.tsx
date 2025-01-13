import React, { useState } from 'react';
import { ThermometerSun, ArrowRightLeft } from 'lucide-react';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

function App() {
  const [inputTemp, setInputTemp] = useState('');
  const [fromUnit, setFromUnit] = useState<TempUnit>('celsius');
  const [toUnit, setToUnit] = useState<TempUnit>('fahrenheit');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const convertTemperature = () => {
    setError('');
    const temp = parseFloat(inputTemp);
    
    if (isNaN(temp)) {
      setError('Please enter a valid number');
      setResult(null);
      return;
    }

    let converted: number;

    // First convert to Celsius as intermediate step
    let inCelsius: number;
    switch (fromUnit) {
      case 'fahrenheit':
        inCelsius = (temp - 32) * (5/9);
        break;
      case 'kelvin':
        inCelsius = temp - 273.15;
        break;
      default:
        inCelsius = temp;
    }

    // Then convert from Celsius to target unit
    switch (toUnit) {
      case 'fahrenheit':
        converted = (inCelsius * 9/5) + 32;
        break;
      case 'kelvin':
        converted = inCelsius + 273.15;
        break;
      default:
        converted = inCelsius;
    }

    setResult(converted.toFixed(2));
  };

  const unitSymbols: Record<TempUnit, string> = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
  };

  const UnitSelect = ({ value, onChange, label }: { 
    value: TempUnit; 
    onChange: (value: TempUnit) => void;
    label: string;
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TempUnit)}
        className="p-2 rounded-lg border border-gray-300 bg-white focus:ring-2 
        focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
      >
        <option value="celsius">Celsius (°C)</option>
        <option value="fahrenheit">Fahrenheit (°F)</option>
        <option value="kelvin">Kelvin (K)</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <ThermometerSun className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-gray-800">Temperature Converter</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Enter Temperature
            </label>
            <input
              type="number"
              value={inputTemp}
              onChange={(e) => setInputTemp(e.target.value)}
              placeholder="Enter temperature..."
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
              focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <UnitSelect 
              value={fromUnit} 
              onChange={setFromUnit}
              label="From"
            />
            <UnitSelect 
              value={toUnit} 
              onChange={setToUnit}
              label="To"
            />
          </div>

          <button
            onClick={convertTemperature}
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold
            hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-200 transition-all 
            duration-200 flex items-center justify-center gap-2"
          >
            <ArrowRightLeft className="w-5 h-5" />
            Convert
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {result && (
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Result:</div>
              <div className="text-3xl font-bold text-gray-800">
                {result} {unitSymbols[toUnit]}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                from {inputTemp} {unitSymbols[fromUnit]}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;