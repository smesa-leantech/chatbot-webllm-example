import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

/**
 * Props del componente ChatInput
 * @interface ChatInputProps
 * @property {string} input - Texto actual del input
 * @property {function} onInputChange - Función que maneja los cambios en el input
 * @property {function} onSubmit - Función que maneja el envío del formulario
 * @property {boolean} isLoading - Indica si se está procesando el envío del mensaje
 * @property {boolean} isModelLoading - Indica si el modelo está cargando
 * @property {string} selectedModel - ID del modelo seleccionado actualmente
 */
interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isModelLoading: boolean;
  selectedModel: string;
}

/**
 * Componente que maneja la entrada de texto y envío de mensajes en el chat
 * 
 * @component
 * @param {ChatInputProps} props - Props del componente
 * @returns {JSX.Element} Formulario con input de texto y botón de envío
 * 
 * @description
 * Este componente renderiza un formulario con:
 * - Un campo de texto para escribir mensajes
 * - Un botón de envío que muestra un spinner cuando está cargando
 * 
 * El componente se deshabilita cuando:
 * - Se está enviando un mensaje (isLoading)
 * - El modelo está cargando (isModelLoading)
 * - No hay un modelo seleccionado (!selectedModel)
 */
export const ChatInput = ({ input, onInputChange, onSubmit, isLoading, isModelLoading, selectedModel }: ChatInputProps) => {
  const isDisabled = isLoading || isModelLoading || !selectedModel;
  
  return (
    <form onSubmit={onSubmit} className="p-4 border-t flex gap-3">
      <Input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={isLoading ? "Generando respuesta..." : "Escribe tu mensaje..."}
        disabled={isDisabled}
        className="rounded-full bg-muted/40 focus-visible:ring-offset-2 transition-colors"
      />
      <Button 
        type="submit" 
        disabled={isDisabled}
        size="icon"
        className="rounded-full w-10 h-10 hover:scale-105 transition-all"
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};