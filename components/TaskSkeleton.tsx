// Cria um esqueleto de carregamento para o item de tarefa

export function TaskSkeleton() {
  return (
    
    <li className="border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-sm flex justify-between items-start gap-4 animate-pulse">
      
      <div className="flex items-start gap-3 flex-1">
        <div className="w-5 h-5 mt-1 bg-gray-700 rounded-sm shrink-0" />
        
        <div className="flex flex-col gap-2 w-full">
          <div className="h-5 bg-gray-700 rounded w-3/4" />
          
          <div className="flex gap-2 mt-1">
             <div className="h-4 bg-gray-700 rounded w-20" />
          </div>
          <div className="h-3 bg-gray-700 rounded w-full mt-1" />
        </div>
      </div>

      <div className="w-8 h-8 bg-gray-700 rounded" />
    </li>
  );
}