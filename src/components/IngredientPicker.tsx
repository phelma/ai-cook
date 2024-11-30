'use client';

import { useState } from 'react';
import { Ingredient, IngredientType, UserPreferences } from '@/types/ingredients';

export default function IngredientPicker() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    allergies: [],
    dietaryPreferences: [],
    equipment: [],
    servings: 2,
    unitPreference: 'metric'
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Pick Your Ingredients</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Proteins</h2>
          {/* Protein selector will go here */}
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Carbs</h2>
          {/* Carbs selector will go here */}
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Vegetables</h2>
          {/* Vegetable selector will go here */}
        </section>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
        {/* Preferences form will go here */}
      </div>
    </div>
  );
}
