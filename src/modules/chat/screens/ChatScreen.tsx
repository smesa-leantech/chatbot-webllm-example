import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createChatEngine, Message } from "@/lib/chat-engine";
import type { MLCEngineInterface } from "@mlc-ai/web-llm";
import { useEffect, useState } from 'react';
import { ChatInput, ChatMessages, ModelSelector } from "../components";
import config from "../shared/config/config";
import './../../../styles/chat.css';

/**
 * Componente principal de la pantalla de chat
 * 
 * @component
 * @description
 * Este componente maneja toda la lógica principal del chat, incluyendo:
 * - Gestión del estado del chat y mensajes
 * - Carga y configuración de modelos
 * - Manejo de errores y estados de carga
 * - Interfaz de usuario principal
 * 
 * Estados principales:
 * - chat: Instancia del motor de chat
 * - messages: Array de mensajes en la conversación
 * - input: Texto actual en el campo de entrada
 * - isLoading: Estado de carga al enviar mensajes
 * - isModelLoading: Estado de carga al inicializar modelos
 * - selectedModel: Modelo actualmente seleccionado
 * - loadingProgress: Progreso de carga del modelo
 * - error: Mensaje de error si existe
 * - loadedModels: Set de modelos ya cargados
 */
export const ChatScreen = () => {
  const [chat, setChat] = useState<MLCEngineInterface | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());

  const engine = createChatEngine();

  /**
   * Efecto para inicializar y gestionar el motor de chat
   * Se ejecuta cuando cambia el modelo seleccionado
   * 
   * @effect
   * @listens selectedModel
   * 
   * @description
   * - Inicializa el motor de chat cuando se selecciona un modelo
   * - Maneja la carga del modelo si no está previamente cargado
   * - Gestiona errores durante la inicialización
   * - Limpia recursos al desmontar el componente
   */
  useEffect(() => {
    const initChat = async () => {
      if (!selectedModel) return;

      try {
        setIsModelLoading(true);
        setError(null);

        if (!loadedModels.has(selectedModel)) {
          engine.setInitProgressCallback((report) => setLoadingProgress(report.text));
          await engine.reload(selectedModel);
          setLoadedModels((prev) => new Set(prev).add(selectedModel));
        }

        setChat(engine);
      } catch (err) {
        console.error('Error inicializando el chat:', err);
        setError(err instanceof Error ? 
          `Error al cargar el modelo: ${err.message}` : 
          'Error desconocido al cargar el modelo'
        );
      } finally {
        setIsModelLoading(false);
      }
    };

    initChat();

    return () => {
      chat?.unload();
    };
  }, [selectedModel]);

  /**
   * Maneja el envío de mensajes y la generación de respuestas
   * 
   * @param {React.FormEvent} e - Evento del formulario
   * 
   * @description
   * - Valida el input y estado del chat
   * - Agrega el mensaje del usuario a la conversación
   * - Genera y muestra la respuesta del modelo de forma streaming
   * - Maneja errores durante la generación de respuestas
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading || !selectedModel) return;

    setIsLoading(true);
    const newMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const completion = await chat.chat.completions.create({
        messages: newMessages.map((msg) => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        stream: true,
        stream_options: { include_usage: true },
      });

      let responseText = '';
      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta.content;
        if (delta) {
          responseText += delta;
          setMessages([
            ...newMessages, 
            { role: 'assistant', content: responseText }
          ]);
        }
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      setError(error instanceof Error ? 
        `Error generando respuesta: ${error.message}` : 
        'Error desconocido generando respuesta'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reinicia la conversación y limpia los mensajes
   * 
   * @description
   * - Reinicia el estado del chat
   * - Limpia el historial de mensajes
   * - Elimina cualquier error existente
   */
  const handleReset = async () => {
    if (chat) {
      await chat.resetChat();
      setMessages([]);
      setError(null);
    }
  };

  /**
   * Maneja el cambio en el input de texto
   * 
   * @param {string} value - Nuevo valor del input
   */
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm">
          <div className="w-full md:w-2/3">
            <ModelSelector
              selectedModel={selectedModel}
              modelList={config.model_list}
              onModelSelect={setSelectedModel}
              disabled={isLoading || isModelLoading}
            />
          </div>

          <Button 
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="w-full md:w-auto hover:bg-destructive/90 hover:text-destructive-foreground transition-all duration-200 transform hover:scale-105"
            disabled={isLoading || isModelLoading || !selectedModel}
          >
            Reiniciar conversación
          </Button>
        </div>

        <Card className="min-h-[750px] flex flex-col shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30 transition-colors">
            <ChatMessages
              messages={messages}
              isModelLoading={isModelLoading}
              loadingProgress={loadingProgress}
              error={error}
              selectedModel={selectedModel}
            />
          </CardContent>
          
          <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm rounded-b-2xl">
            <ChatInput
              input={input}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isModelLoading={isModelLoading}
              selectedModel={selectedModel}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};