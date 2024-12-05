import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

/**
 * Props del componente ModelSelector
 * @interface ModelSelectorProps
 * @property {string} selectedModel - ID del modelo actualmente seleccionado
 * @property {Array<{model_id: string}>} modelList - Lista de modelos disponibles
 * @property {function} onModelSelect - Función que maneja la selección de un nuevo modelo
 * @property {boolean} [disabled] - Indica si el selector está deshabilitado
 */
interface ModelSelectorProps {
  selectedModel: string;
  modelList: Array<{ model_id: string }>;
  onModelSelect: (value: string) => void;
  disabled?: boolean;
}

/**
 * Componente que permite seleccionar un modelo de chat de una lista predefinida
 * 
 * @component
 * @param {ModelSelectorProps} props - Props del componente
 * @returns {JSX.Element} Selector desplegable con lista de modelos
 * 
 * @description
 * Este componente renderiza un selector desplegable que:
 * - Muestra el modelo actualmente seleccionado
 * - Permite seleccionar entre una lista de modelos disponibles
 * - Muestra un ícono y el ID de cada modelo en la lista
 * - Se puede deshabilitar mediante la prop disabled
 * - Incluye efectos visuales de hover y transiciones
 */
export const ModelSelector = ({ selectedModel, modelList, onModelSelect, disabled }: ModelSelectorProps) => {
  return (
    <Select value={selectedModel} onValueChange={onModelSelect} disabled={disabled}>
      <SelectTrigger className="w-full bg-background border-2 hover:bg-accent/10 transition-colors rounded-xl">
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Selecciona un modelo" />
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {modelList.map((model) => (
          <SelectItem 
            key={model.model_id} 
            value={model.model_id}
            className="hover:bg-accent/10 cursor-pointer py-3 px-4"
          >
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{model.model_id}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};