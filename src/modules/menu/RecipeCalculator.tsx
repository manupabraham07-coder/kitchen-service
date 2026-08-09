import React, { useState } from 'react';
import { Calculator, Scale, AlertCircle } from 'lucide-react';
import { RecipeService, CalculatedIngredient } from '../../services/recipe.service';

export const RecipeCalculator: React.FC = () => {
  const [headCount, setHeadCount] = useState<number>(1000);
  const [selectedRecipeName, setSelectedRecipeName] = useState<string>('സാമ്പാർ (Sambar)');

  // സാമ്പിൾ റെസിപ്പി ഡാറ്റ (ഒരാൾക്ക് സാമ്പാർ ഉണ്ടാക്കാൻ വേണ്ട അളവുകൾ)
  const sampleIngredients = [
    { ingredient_name: 'തുവരപ്പരിപ്പ് (Dal)', qty_per_person: 0.03, unit: 'KG' },
    { ingredient_name: 'പച്ചക്കറികൾ (Vegetables)', qty_per_person: 0.1, unit: 'KG' },
    { ingredient_name: 'വെളിച്ചെണ്ണ (Oil)', qty_per_person: 10, unit: 'ML' },
    { ingredient_name: 'ഉപ്പ് (Salt)', qty_per_person: 5, unit: 'GRAMS' },
    { ingredient_name: 'സാമ്പാർ പൊടി (Spices)', qty_per_person: 8, unit: 'GRAMS' },
  ];

  const calculatedList: CalculatedIngredient[] = RecipeService.calculateTotalIngredients(
    sampleIngredients,
    headCount
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-emerald-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-400" />
            ഓട്ടോമാറ്റിക് റെസിപ്പി കാൽക്കുലേറ്റർ
          </h1>
          <p className="text-xs text-emerald-200 mt-1">
            ആളുകളുടെ എണ്ണത്തിനനുസരിച്ച് വിഭവങ്ങളുടെ അളവ് തനിയെ കണക്കാക്കുന്നു
          </p>
        </div>
      </div>

      {/* Headcount Selector Buttons */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          ആളുകളുടെ എണ്ണം തിരഞ്ഞെടുക്കുക / നൽകുക:
        </label>
        
        <div className="flex flex-wrap gap-2">
          {[300, 1000, 5000, 10000, 25000, 50000].map((num) => (
            <button
              key={num}
              onClick={() => setHeadCount(num)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                headCount === num
                  ? 'bg-amber-500 text-emerald-950 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {num.toLocaleString()} പേർ
            </button>
          ))}
        </div>

        <div className="pt-2">
          <input
            type="number"
            value={headCount}
            onChange={(e) => setHeadCount(Math.max(1, Number(e.target.value)))}
            className="w-full md:w-64 p-2.5 border border-gray-300 rounded-lg text-lg font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-600 outline-none"
            placeholder="Custom Headcount"
          />
        </div>
      </div>

      {/* Calculation Results Table */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            {selectedRecipeName} - {headCount.toLocaleString()} പേർക്ക് വേണ്ടത്:
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                <th className="p-3">ചേരുവകൾ (Ingredient)</th>
                <th className="p-3">ഒരാൾക്ക് വേണ്ടത്</th>
                <th className="p-3 text-emerald-800 font-bold">ആകെ ആവശ്യമായ അളവ്</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {calculatedList.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/50">
                  <td className="p-3 font-semibold text-gray-800">{item.ingredient_name}</td>
                  <td className="p-3 text-gray-500">
                    {item.qty_per_person} {item.unit}
                  </td>
                  <td className="p-3 font-bold text-emerald-900 text-base">
                    {item.total_required.toLocaleString()} {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          ഈ അളവ് പ്ലാൻ അനുസരിച്ച് സ്റ്റോക്ക് ഇൻവെന്ററിയിൽ നിന്ന് തനിയെ കുറവ് വരുത്താൻ സാധിക്കും.
        </div>
      </div>
    </div>
  );
};

