# Chat Application con WebLLM

## Descripción
Esta es una aplicación de chat moderna que implementa WebLLM para procesamiento local de modelos de lenguaje (LLM). Desarrollada con React y TypeScript, utiliza una arquitectura modular y componentes UI reutilizables basados en Radix UI y Tailwind CSS.

## ¿Qué es WebLLM?
WebLLM es una tecnología que permite ejecutar modelos de lenguaje grandes (LLM) directamente en el navegador web, ofreciendo:
- **Procesamiento Local**: Los modelos se ejecutan completamente en el dispositivo del usuario
- **Privacidad Mejorada**: No se requiere enviar datos a servidores externos
- **Menor Latencia**: Respuestas más rápidas al eliminar la latencia de red
- **Funcionamiento Offline**: Capacidad de operar sin conexión a internet una vez cargado el modelo

## Estructura del Proyecto

````
src/
├── app/
│   ├── public/
│   │   └── chat/
│   │       ├── ChatPage.tsx      # Componente principal del chat
│   │       └── index.ts
│   └── index.ts
├── modules/
│   └── chat/                     # Módulo de integración con WebLLM
├── components/
│   └── ui/                       # Componentes UI reutilizables
````

## Características Principales

- **Integración WebLLM**: 
  - Procesamiento de LLM local
  - Gestión eficiente de modelos
  - Optimización de rendimiento
- **Interfaz Modular**: Arquitectura basada en componentes reutilizables
- **Componentes UI Avanzados**: 
  - Chat UI optimizada para LLM
  - Sistema de mensajería en tiempo real
  - Indicadores de procesamiento
  - Historial de conversaciones
  - Gestión de contexto

## Tecnologías Utilizadas

- React
- TypeScript
- WebLLM
- Radix UI
- Tailwind CSS
- CMDK
- Lucide React
- React Hook Form
- Vaul

## Componentes Destacados

### ChatPage
Componente principal que integra WebLLM con la interfaz de usuario, gestionando:
- Carga y gestión del modelo
- Procesamiento de prompts
- Visualización de respuestas
- Gestión del estado de la conversación

### Componentes de UI
- **Chat Interface**: Diseñado específicamente para interacciones con LLM
- **Message Components**: Formateo especial para prompts y respuestas
- **Loading States**: Indicadores visuales durante el procesamiento
- **Error Handling**: Gestión visual de errores y recuperación

## Instalación

````bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
````

## Uso

1. Al iniciar la aplicación, WebLLM cargará automáticamente el modelo seleccionado
2. Una vez cargado, podrás interactuar con el chat como con cualquier otro LLM
3. Las respuestas se generarán localmente en tu dispositivo
4. El historial de conversación se mantiene en el contexto local

## Rendimiento y Requisitos

- **Navegador Compatible**: Chrome/Firefox/Safari actualizados
- **Memoria Recomendada**: 8GB+ RAM
- **Almacenamiento**: Espacio suficiente para los modelos (varía según el modelo)

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Recursos Adicionales

- [Documentación de WebLLM](https://webllm.org)
- [Guía de Optimización](https://webllm.org/docs/optimization)
- [Modelos Compatibles](https://webllm.org/docs/models)
