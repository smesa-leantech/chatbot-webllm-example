# Chat Application

## Descripción
Esta es una aplicación de chat moderna desarrollada con React y TypeScript, utilizando una arquitectura modular y componentes UI reutilizables basados en Radix UI y Tailwind CSS.

## Estructura del Proyecto

```
src/
├── app/
│   ├── public/
│   │   └── chat/
│   │       ├── ChatPage.tsx
│   │       └── index.ts
│   └── index.ts
├── assets/
│   └── react.svg
├── components/
│   └── ui/
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       └── form.tsx
```

## Características Principales

- **Interfaz Modular**: Arquitectura basada en componentes reutilizables
- **Componentes UI Avanzados**: Implementación de elementos UI complejos como:
  - Acordeones
  - Diálogos de alerta
  - Avatares
  - Breadcrumbs
  - Carruseles
  - Gráficos
  - Menús contextuales
  - Formularios
  - Y más...

## Tecnologías Utilizadas

- React
- TypeScript
- Radix UI
- Tailwind CSS
- CMDK
- Lucide React
- React Hook Form
- Vaul

## Componentes UI Destacados

### ChatPage
El componente principal que renderiza la interfaz de chat utilizando `ChatScreen` del módulo de chat.

### Componentes de UI
- **Accordion**: Componente colapsable para mostrar/ocultar contenido
- **Alert**: Sistema de alertas y notificaciones
- **Avatar**: Componente para mostrar imágenes de perfil
- **Button**: Botones personalizables con diferentes variantes
- **Calendar**: Selector de fechas
- **Carousel**: Carrusel de contenido
- **Chart**: Componente para visualización de datos
- **Form**: Sistema de formularios con validación

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Uso

La aplicación proporciona una interfaz de chat accesible a través de la ruta principal, donde los usuarios pueden interactuar con el sistema de mensajería.

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
