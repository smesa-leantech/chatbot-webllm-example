import { Message } from "@/lib/chat-engine";
import { Bot, User } from "lucide-react";

/**
 * Props del componente ChatMessages
 * @interface ChatMessagesProps
 * @property {Message[]} messages - Array de mensajes a mostrar
 * @property {boolean} isModelLoading - Indica si el modelo está cargando
 * @property {string} loadingProgress - Texto que indica el progreso de carga
 * @property {string | null} error - Mensaje de error si existe alguno
 * @property {string} selectedModel - ID del modelo seleccionado
 */
interface ChatMessagesProps {
  messages: Message[];
  isModelLoading: boolean;
  loadingProgress: string;
  error: string | null;
  selectedModel: string;
}

/**
 * Componente que muestra los mensajes del chat y estados de carga
 * 
 * @component
 * @param {ChatMessagesProps} props - Props del componente
 * @returns {JSX.Element} Mensajes del chat o estados de carga/error
 * 
 * @description
 * Este componente maneja diferentes estados de visualización:
 * 
 * 1. Sin modelo seleccionado:
 *    - Muestra un mensaje pidiendo seleccionar un modelo
 * 
 * 2. Modelo cargando:
 *    - Muestra un spinner y el progreso de carga
 * 
 * 3. Error:
 *    - Muestra el mensaje de error en rojo
 * 
 * 4. Estado normal:
 *    - Muestra la lista de mensajes del chat
 *    - Diferencia visualmente entre mensajes del usuario y del asistente
 *    - Incluye iconos y estilos específicos para cada tipo de mensaje
 */
export const ChatMessages = ({ messages, isModelLoading, loadingProgress, error, selectedModel }: ChatMessagesProps) => {
  if (!selectedModel) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-3">
        <Bot className="h-12 w-12 text-muted-foreground/60" />
        <p className="text-muted-foreground text-lg font-medium">Por favor selecciona un modelo para comenzar</p>
      </div>
    );
  }

  if (isModelLoading) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-lg font-medium">Cargando modelo...</p>
        {loadingProgress && (
          <p className="text-sm text-muted-foreground/80 text-center max-w-md">
            {loadingProgress}
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-3">
        <div className="rounded-full bg-red-100 p-3">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p className="text-red-500 text-lg font-medium text-center max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((message, i) => (
        <div key={i} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex gap-2 items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`rounded-full p-2 ${message.role === 'user' ? 'bg-primary/10' : 'bg-muted'}`}>
              {message.role === 'user' ? (
                <User className="h-4 w-4 text-primary" />
              ) : (
                <Bot className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div 
              className={`rounded-2xl px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-muted rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};