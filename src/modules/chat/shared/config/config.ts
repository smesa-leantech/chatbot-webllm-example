import { prebuiltAppConfig } from "@mlc-ai/web-llm";

/**
 * Configuración principal para el motor de chat
 * 
 * @description
 * Este objeto contiene la configuración esencial para el funcionamiento del chat:
 * 
 * @property {Array} model_list - Lista de modelos disponibles importada de web-llm
 * @property {boolean} use_web_worker - Habilita el uso de Web Workers para procesamiento
 * en segundo plano, mejorando el rendimiento y evitando bloqueos en la UI
 * @property {Object} cache_options - Opciones de caché para los modelos
 * @property {boolean} cache_options.enable_cache - Activa el almacenamiento en caché
 * @property {string} cache_options.cache_dir - Directorio donde se almacena la caché
 */
export default {
  model_list: prebuiltAppConfig.model_list,
  use_web_worker: true, // Importante: asegurarse que esto está en true
  cache_options: {
    enable_cache: true,
    cache_dir: 'cache',
  }
};