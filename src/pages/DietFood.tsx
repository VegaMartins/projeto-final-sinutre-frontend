import { useEffect, useState } from 'react';
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react';

import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { AddFoodModal } from '@/components/modal/AddFoodModal';
import { EditFoodModal } from '@/components/modal/EditFoodModal';

import { getFoods, deleteFood } from '@/services/foodService';
import type { Food } from '@/types/food';

const MODAL_ID = 'create-food-modal';

export function DietFoodPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  const EDIT_MODAL_ID = 'edit-food-modal';
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  function handleEditClick(food: Food) {
    setSelectedFood(food);
    (document.getElementById(EDIT_MODAL_ID) as HTMLDialogElement)?.showModal();
  }

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteFood(id: number) {
    if (confirm('Tem certeza que deseja excluir este alimento?')) {
      try {
        await deleteFood(id);
        loadFoods();
      } catch (error) {
        alert('Erro ao excluir alimento');
      }
    }
  }

  useEffect(() => {
    loadFoods();
  }, []);

  return (
    <div className="w-full max-w-300 mx-auto">
      <SimpleHeader
        title="Dieta"
        subtitle="Gerencie seus alimentos"
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {foods.map((food) => (
            <div
              key={food.id}
              className="card bg-base-100 shadow-sm"
            >
              <div className="card-body">
                
                {/* Cabeçalho do Card: Título e Botões */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="card-title">
                    {food.name}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(food)}
                      className="btn btn-ghost btn-sm text-info"
                      title="Editar alimento"
                    >
                      <PencilSimple size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteFood(food.id)}
                      className="btn btn-ghost btn-sm text-error"
                      title="Excluir alimento"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div> {/* Fim do Cabeçalho do Card */}

                {/* Macros: Movidos para fora do flex justify-between */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>
                    🔥 {food.caloriesPer100g} kcal
                  </span>
                  <span>
                    🍞 {food.carbsPer100g} g
                  </span>
                  <span>
                    🍗 {food.proteinPer100g} g
                  </span>
                  <span>
                    🥑 {food.fatPer100g} g
                  </span>
                </div>
                
              </div>
            </div>
          ))} {/* Aqui fechamos o map da forma correta */}
        </div>
      )}

      <button
        className="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-lg z-50"
        onClick={() =>
          (
            document.getElementById(MODAL_ID) as HTMLDialogElement
          )?.showModal()
        }
      >
        <Plus size={24} weight="bold" />
      </button>

      <AddFoodModal
        modalId={MODAL_ID}
        onCreated={loadFoods}
      />

      <EditFoodModal
        modalId={EDIT_MODAL_ID}
        food={selectedFood}
        onUpdated={loadFoods}
      />
    </div>
  );
}