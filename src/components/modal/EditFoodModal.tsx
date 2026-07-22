import { useEffect, useState } from 'react';
import { updateFood } from '@/services/foodService';
import { Food } from '@/types/food';

interface EditFoodModalProps {
  modalId: string;
  food: Food | null;
  onUpdated: () => Promise<void> | void;
}

export function EditFoodModal({
  modalId,
  food,
  onUpdated,
}: EditFoodModalProps) {
  const [name, setName] = useState('');
  const [caloriesPer100g, setCaloriesPer100g] = useState('');
  const [carbsPer100g, setCarbsPer100g] = useState('');
  const [proteinPer100g, setProteinPer100g] = useState('');
  const [fatPer100g, setFatPer100g] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (food) {
      setName(food.name);
      setCaloriesPer100g(String(food.caloriesPer100g));
      setCarbsPer100g(String(food.carbsPer100g));
      setProteinPer100g(String(food.proteinPer100g));
      setFatPer100g(String(food.fatPer100g));
    }
  }, [food]);

  async function handleSave() {
    if (!food) return;

    if (!name || !caloriesPer100g ) {
      alert('Preencha todos os campos para salvar as alterações.');
      return;
    }

    try {
      setLoading(true);

      await updateFood(Number(food.id), {
        name,
        caloriesPer100g: Number(caloriesPer100g),
        carbsPer100g: Number(carbsPer100g),
        proteinPer100g: Number(proteinPer100g),
        fatPer100g: Number(fatPer100g),
      });

      await onUpdated();

      (document.getElementById(modalId) as HTMLDialogElement)?.close();
    } catch (error) {
      alert('Erro ao atualizar alimento');
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-primary">
          Editar alimento
        </h3>

        <div className="space-y-3 mt-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Nome</span></label>
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label"><span className="label-text">Calorias (100g)</span></label>
              <input
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={caloriesPer100g}
                onChange={(e) => setCaloriesPer100g(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Carboidratos (100g)</span></label>
              <input
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={carbsPer100g}
                onChange={(e) => setCarbsPer100g(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Proteínas (100g)</span></label>
              <input
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={proteinPer100g}
                onChange={(e) => setProteinPer100g(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Gorduras (100g)</span></label>
              <input
                type="number"
                min="0"
                className="input input-bordered w-full"
                value={fatPer100g}
                onChange={(e) => setFatPer100g(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancelar</button>
          </form>

          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
