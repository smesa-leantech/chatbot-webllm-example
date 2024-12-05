import * as webllm from "@mlc-ai/web-llm";
import config from '../modules/chat/shared/config/config';

/**
 * Interfaz que define la estructura de un mensaje en el chat
 */
export interface Message {
  /** Rol del mensaje: usuario o asistente */
  role: 'user' | 'assistant';
  /** Contenido del mensaje */
  content: string;
}

/**
 * Crea y configura una instancia del motor de chat
 * 
 * @returns Una instancia de MLCEngineInterface configurada según las preferencias
 * 
 * @description
 * Esta función crea un motor de chat que puede funcionar en dos modos:
 * - Modo Web Worker: Ejecuta el modelo en un hilo separado para mejor rendimiento
 * - Modo directo: Ejecuta el modelo en el hilo principal
 * 
 * El modo se determina por la configuración `use_web_worker` en el archivo de config
 */
export const createChatEngine = (): webllm.MLCEngineInterface => {
  return config.use_web_worker
    ? new webllm.WebWorkerMLCEngine(
        new Worker(new URL("../worker.ts", import.meta.url), { type: "module" }),
        { appConfig: config, logLevel: "INFO" }
      )
    : new webllm.MLCEngine({ appConfig: config });
};