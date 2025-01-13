import React, { useState } from 'react';
import { Equal, Divide, Minus, Plus, X, Delete, RotateCcw } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setShouldResetDisplay(true);
    setEquation(display + ' ' + operator + ' ');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setShouldResetDisplay(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className = '' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 transition-all duration-100 rounded-xl text-xl font-semibold 
      hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-100 p-6 rounded-2xl shadow-2xl w-full max-w-xs">
        <div className="mb-4">
          <div className="text-gray-500 text-right h-6 text-sm">{equation}</div>
          <div className="text-4xl font-bold text-right h-12 overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button 
            onClick={handleClear} 
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <RotateCcw className="w-5 h-5 mx-auto" />
          </Button>
          <Button 
            onClick={handleDelete} 
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            <Delete className="w-5 h-5 mx-auto" />
          </Button>
          <Button 
            onClick={() => handleOperator('%')} 
            className="bg-gray-200 hover:bg-gray-300"
          >
            %
          </Button>
          <Button 
            onClick={() => handleOperator('/')} 
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            <Divide className="w-5 h-5 mx-auto" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperator('*')} 
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            <X className="w-5 h-5 mx-auto" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperator('-')} 
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            <Minus className="w-5 h-5 mx-auto" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button 
              key={num} 
              onClick={() => handleNumber(num.toString())}
              className="bg-white hover:bg-gray-100"
            >
              {num}
            </Button>
          ))}
          <Button 
            onClick={() => handleOperator('+')} 
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            <Plus className="w-5 h-5 mx-auto" />
          </Button>

          <Button 
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-white hover:bg-gray-100"
          >
            0
          </Button>
          <Button 
            onClick={() => handleNumber('.')}
            className="bg-white hover:bg-gray-100"
          >
            .
          </Button>
          <Button 
            onClick={handleEqual} 
            className="bg-indigo-500 text-white hover:bg-indigo-600"
          >
            <Equal className="w-5 h-5 mx-auto" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;