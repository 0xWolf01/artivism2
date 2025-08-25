# Artivism Web React

Un proyecto web de arte y activismo convertido a React, que presenta piezas de arte de protesta únicas y desafiantes.

## 🎨 Sobre el Proyecto

Artivism es una plataforma que transforma algunas de las protestas más icónicas de nuestro tiempo en piezas de arte únicas, permitiendo a cualquier coleccionista poseerlas no como titulares, sino como lo que realmente son: obras de arte.

**Filosofía**: "El arte es una forma de expresión humana. La protesta también lo es. Por lo tanto, ¿no es la protesta contra el arte la más alta expresión del arte mismo?"

## ✨ Características

- **Carrusel 3D Interactivo**: Navegación fluida con efectos de perspectiva y previews en hover
- **Galería de Arte**: Colección de piezas de protesta artística
- **Tienda**: Merchandising exclusivo de Artivism
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Navegación SPA**: Experiencia de usuario fluida con React Router

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Artivism-Web-React
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.js       # Navegación principal
│   ├── Footer.js       # Pie de página
│   └── Carousel3D.js   # Carrusel 3D interactivo
├── pages/              # Páginas de la aplicación
│   ├── Home.js         # Página principal con carrusel
│   ├── Gallery.js      # Galería de arte
│   ├── Store.js        # Tienda
│   ├── Gioconda.js     # Página de pieza individual
│   └── Monalisa.js     # Página de Mona Lisa
├── App.js              # Componente principal con routing
├── index.js            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎯 Componentes Principales

### Carousel3D
El componente estrella del proyecto, un carrusel 3D completamente interactivo que incluye:
- Navegación automática y manual
- Previews en hover con colores personalizados
- Controles táctiles y de rueda del ratón
- Efectos de perspectiva 3D
- Loop infinito sin costuras

### Header & Footer
Componentes de navegación que mantienen la identidad visual del proyecto original con enlaces activos y navegación SPA.

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **React Router 6** - Enrutamiento de aplicación
- **Tailwind CSS** - Framework de CSS utilitario
- **CSS3** - Estilos personalizados y animaciones
- **JavaScript ES6+** - Funcionalidad moderna

## 📱 Responsividad

El proyecto está completamente optimizado para dispositivos móviles, tablets y desktop, utilizando:
- Grid y Flexbox para layouts adaptativos
- Media queries para breakpoints específicos
- Unidades relativas (vh, vw, rem) para escalabilidad
- Touch events para dispositivos móviles

## 🔧 Personalización

### Colores del Carrusel
Los colores de preview del carrusel se pueden personalizar en `src/components/Carousel3D.js`:

```javascript
const previewColors = [
  '#ff5a5f', '#ffb400', '#00a699', '#007a87', '#7b0051',
  '#8ce071', '#ff8a65', '#b15cff', '#00d1c1', '#2b2d42'
];
```

### Imágenes
Las imágenes del carrusel se configuran en el mismo archivo:

```javascript
const slideData = [
  { src: '/assets/img/cuadro-ejemplo.png', previewColor: '#FF5733' },
  // ... más slides
];
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servidor Estático
El build genera archivos estáticos en la carpeta `build/` que se pueden servir desde cualquier servidor web estático.

### Netlify/Vercel
El proyecto está listo para despliegue en plataformas como Netlify o Vercel sin configuración adicional.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- El equipo original de Artivism por la visión y el diseño
- La comunidad de React por las herramientas y librerías
- Tailwind CSS por el sistema de diseño utilitario

## 📞 Contacto

Para preguntas sobre el proyecto o colaboraciones:
- Email: [tu-email@ejemplo.com]
- Website: [https://artivism.com]
- Twitter: [@artivism]

---

**Artivism** - Donde la protesta se convierte en arte, y el arte se convierte en protesta.
