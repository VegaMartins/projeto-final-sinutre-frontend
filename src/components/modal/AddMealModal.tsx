import type { FoodItem, MacroSummary } from '@/types/meal';
import { MealItemForm } from './MealItemForm';
import { MealItemsTable } from './MealItemsTable';
import { MealMacrosSummary } from './MealMacrosSummary';
import { MealMetadataForm } from './MealMetadataForm';
import type { MealCategory } from '@/types/meal';

interface AddMealModalProps {
  open: boolean;
  macros: Pick<MacroSummary, 'carbs' | 'proteins' | 'fats' | 'calories'>;
  items: FoodItem[];
  typeMeal?: MealCategory;
  onClose: () => void;
  onSave: () => void;
  onRemoveItem?: (item: FoodItem) => void;
}

export function AddMealModal({
  open,
  macros,
  items,
  typeMeal,
  onClose,
  onSave,
  onRemoveItem,
}: AddMealModalProps) {
  return (
    <div className={`modal ${open ? 'modal-open' : ''}`} role="dialog">
      <div className="modal-box max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6">Adicionar Refeição</h2>
        
        <MealMacrosSummary macros={macros} />
        <MealMetadataForm typeMeal={typeMeal}/>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Itens da Refeição</h3>
          <MealItemForm />
        </div>

        <MealItemsTable items={items} onRemove={onRemoveItem} />

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Salvar refeição
          </button>
        </div>
      </div>
    </div>
  );
}
