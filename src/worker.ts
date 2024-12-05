/**
 * Web Worker para procesamiento paralelo del modelo de lenguaje
 * 
 * @description
 * Un Web Worker es un script que se ejecuta en segundo plano, independiente del hilo principal
 * de ejecución de una aplicación web. Esto permite realizar tareas pesadas sin bloquear la
 * interfaz de usuario.
 * 
 * Beneficios del Web Worker:
 * - Ejecución paralela: Procesa el modelo mientras la UI sigue respondiendo
 * - Mejor rendimiento: Evita congelamientos en la interfaz
 * - Separación de responsabilidades: Aísla la lógica pesada del modelo
 * 
 * Funcionamiento:
 * 1. El hilo principal envía mensajes al Worker con tareas a procesar
 * 2. El Worker procesa estas tareas en segundo plano
 * 3. El Worker devuelve resultados al hilo principal mediante mensajes
 * 
 * En este caso específico, el Worker se encarga de:
 * - Cargar y ejecutar el modelo de lenguaje
 * - Procesar las solicitudes de generación de texto
 * - Manejar la comunicación con el hilo principal
 * 
 * @module worker
 */

import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// Instancia del manejador que procesa la comunicación con el modelo
const handler = new WebWorkerMLCEngineHandler();

/**
 * Listener de mensajes del Worker
 * Recibe y procesa los mensajes enviados desde el hilo principal
 * 
 * @param {MessageEvent} msg - Evento del mensaje recibido que contiene
 * las instrucciones o datos a procesar por el modelo
 */
self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};