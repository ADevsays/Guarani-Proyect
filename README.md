# Pueblo Guaraní

Blog para publicar sobre la cultura Guaraní.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v14.x o superior)
- [npm](https://www.npmjs.com/) (v6.x o superior)

## Configuración del Proyecto

Sigue estos pasos para iniciar el proyecto localmente.

1. **Clona el Repositorio:**

   ```bash
   git clone https://github.com/ADevsays/Guarani-Proyect
   cd FRONT-END

2. **Instala las dependencias:**
   ```
   npm install
3. **Configura el entorno:**
   Crea un archivo .env y configura las variables
4. **Levanta la aplicación:**
   ```
   npm run dev
## Scripts NPM
   ```
   npm run dev   
   npm run build
   ```
## API de Paypal
Guía para integrar el API de PayPal en un proyecto Vue.js con TypeScript. Sigue los pasos a continuación para una implementación exitosa.

1. ## Instalación
Asegúrate de tener instaladas las siguientes dependencias en tu proyecto:

```bash
   npm install @paypal/paypal-js
```

2. ## Configuración
2.1 Obtener Credenciales de PayPal
Obtén credenciales de PayPal creando una aplicación en Developer Dashboard de PayPal.

2.2 Configuración en el Código
En tu archivo de integración de PayPal (por ejemplo, paypalIntegration.ts), utiliza el siguiente código como referencia:

``` js
import { PayPalButtonsComponent, loadScript } from "@paypal/paypal-js";
import { paypal_api } from "../../url";
import countOfRepeats from "../../../helpers/countOfRepeats";
import getRepeatItemsPaypal from "../../../helpers/getRepeatItemsPaypal";

let paypalButtonInstance: PayPalButtonsComponent | undefined;

export const callPaypalApi = async (container: HTMLElement) => {
    try {
        const response = await loadScript({ clientId: `${paypal_api}&locale=es_ES` })
        if (!(window.paypal && window.paypal.Buttons && container && response)) return;
        updatePaypalAmount('1', [], container);
    } catch (error) {
        console.error('Error al cargar el script de PayPal:', error);
    }
};

export const updatePaypalAmount = (totalPrice: string, products: Product[], container: HTMLElement) => {
    // ... (código existente)
};
```

1. ## Uso en Componentes Vue.js
En tu componente Vue.js donde desees integrar PayPal, importa las funciones y úsalas según sea necesario. Por ejemplo:

```html
<template>
  <div>
    <!-- Contenedor donde se renderizarán los botones de PayPal -->
    <div ref="paypalContainer"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { callPaypalApi, updatePaypalAmount } from './ruta/a tu /paypalIntegration'; // Actualiza la ruta según tu estructura de archivos

const buttonContainer = ref(null as HTMLRef);

onMounted(() => {
    callPaypalApi(buttonContainer.value as HTMLElement);
});

</script>
```
