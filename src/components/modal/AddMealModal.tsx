import { useState, useMemo } from 'react';
import type { FoodItem } from '@/types/meal';
import { MealItemForm } from './MealItemForm';
import { MealItemsTable } from './MealItemsTable';
import { MealMacrosSummary } from './MealMacrosSummary';
import { FormField } from '../forms/FormField';
import type { MealCategory } from '@/types/meal';
import { createMeal } from '@/services/mealService';
import { MEAL_CATEGORIES } from '@/constants/mealCategories';
import { MEAL_CATEGORY_BY_ID } from '@/constants/mealCategories';


interface AddMealModalProps {
  open: boolean;
  typeMeal: MealCategory;
  onClose: () => void;
  onRemoveItem?: (item: FoodItem) => void;
  onMealCreated: () => Promise<void>;
  
}

export function AddMealModal({
  open,
  typeMeal,
  onClose,
  onMealCreated
}: AddMealModalProps) {
  if (!typeMeal){
    return (<></>);
  }
  const category = MEAL_CATEGORY_BY_ID[typeMeal];

  const [items, setItems] = useState<FoodItem[]>([]);
  const [meal, setMeal] = useState({
    description: '',
    type: category.id,
    eatTime: '',
  });

  function handleAddItem(
    item: FoodItem,
  ) {
    setItems((current) => [
      ...current,
      item,
    ]);
  }

  function handleRemoveItem(
    item: FoodItem,
  ) {
    setItems((current) =>
      current.filter(
        (x) => x.id !== item.id,
      ),
    );
  }

  const macros = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc.carbs += item.carbs;
          acc.proteins += item.protein;
          acc.fats += item.fat;
          acc.calories += item.calories;

          return acc;
        },
        {
          carbs: 0,
          proteins: 0,
          fats: 0,
          calories: 0,
          caloriesGoal: 0,
        },
      ),
    [items],
  );

  async function handleSaveMeal() {
    await createMeal({
      ...meal,
      items: items.map((item) => ({
        foodId: item.foodId,
        grams: item.grams,
      })),
    });

    await onMealCreated();

    onClose();
  }
  

  return (
    <div className={`modal ${open ? 'modal-open' : ''}`} role="dialog">
      <div className="modal-box max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Adicionar Refeição</h2>
        
        <MealMacrosSummary macros={macros} />
        <section className="grid lg:grid-cols-3 gap-4 mb-8">
          <FormField label="Descrição" htmlFor="meal-description" className="lg:col-span-1">
            <input
              id="meal-description"
              type="text"
              placeholder="Ex: almoço pós treino"
              className="input input-bordered w-full"
              onChange={(e) =>
                setMeal({
                  ...meal,
                  description: e.target.value,
                })
              }
            />
          </FormField>
    
          <FormField label="Categoria" htmlFor="meal-category">
            <select
              id="meal-category"
              className="select select-bordered w-full"
              defaultValue={category.id}
              onChange={(e) =>
                setMeal({
                  ...meal,
                  type: e.target.value,
                })
              }
            >
              <option disabled value="">
                Selecione categoria
              </option>
              {MEAL_CATEGORIES.map(category => (
                <option key={category.id} value={category.id} >
                  {category.label}
                </option>
              ))}
            </select>
          </FormField>
    
          <FormField label="Data e horário" htmlFor="meal-datetime">
            <input
              id="meal-datetime"
              type="datetime-local"
              className="input input-bordered w-full"
              onChange={(e) =>
                setMeal({
                  ...meal,
                  eatTime: e.target.value,
                })
              }
            />
          </FormField>
        </section>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Itens da Refeição</h3>
          <MealItemForm  onAdd={handleAddItem} />
        </div>

        <MealItemsTable items={items} onRemove={handleRemoveItem} />

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSaveMeal}>
            Salvar refeição
          </button>
        </div>
      </div>
    </div>
  );
}
