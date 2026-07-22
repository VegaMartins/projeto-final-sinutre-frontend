import { useEffect, useState } from 'react';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { saveProfile, getProfile } from '@/services/userService';
import { User, Ruler, Target } from '@phosphor-icons/react';

export function ProfilePage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [targetDietDaily, setTargetDietDaily] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setWeight(String(data.weight));
      setHeight(String(data.height));
      setTargetDietDaily(String(data.targetDietDaily));
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    
    if (!weight || !height || !targetDietDaily) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      await saveProfile({
        weight: Number(weight),
        height: Number(height),
        targetDietDaily: Number(targetDietDaily),
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao salvar perfil');
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className="w-full max-w-200 mx-auto">
      <SimpleHeader 
        title="Meu Perfil" 
        subtitle="Configure seus dados biométricos e metas"
      />

      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <User size={20} className="text-primary" /> Peso Atual (kg)
                </span>
              </label>
              <input 
                type="number" 
                step="0.1"
                placeholder="Ex: 75.5" 
                className="input input-bordered w-full" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Ruler size={20} className="text-primary" /> Altura (cm)
                </span>
              </label>
              <input 
                type="number" 
                placeholder="Ex: 175" 
                className="input input-bordered w-full" 
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Target size={20} className="text-primary" /> Meta Calórica Diária (kcal)
                </span>
              </label>
              <input 
                type="number" 
                placeholder="Ex: 2000" 
                className="input input-bordered w-full" 
                value={targetDietDaily}
                onChange={(e) => setTargetDietDaily(e.target.value)}
              />
            </div>

            <div className="card-action mt-4">
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Perfil'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
