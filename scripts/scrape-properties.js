/**
 * Script mejorado para extraer propiedades de arrowheadrealtygroup.com
 * Basado en la estructura real del modal
 *
 * INSTRUCCIONES:
 * 1. Abre cada página en tu navegador:
 *    - https://search.arrowheadrealtygroup.com/idx/featuredoffices/price_orderBy/desc_order/1_p
 *    - https://search.arrowheadrealtygroup.com/idx/featuredoffices/price_orderBy/desc_order/2_p
 *    - https://search.arrowheadrealtygroup.com/idx/featuredoffices/price_orderBy/desc_order/3_p
 *
 * 2. Abre la consola de desarrollador (F12)
 * 3. Copia y pega este script completo
 * 4. Presiona Enter
 * 5. El script hará click en cada propiedad para abrir el modal y extraer los datos
 * 6. Al final, copia el JSON que se muestra en la consola
 */

async function scrapeProperties() {
  const properties = [];

  // Encuentra todos los contenedores de propiedades
  const listingContainers = document.querySelectorAll('.listing-content');

  console.log(`Encontradas ${listingContainers.length} propiedades en esta página`);

  for (let i = 0; i < listingContainers.length; i++) {
    const container = listingContainers[i];

    console.log(`Procesando propiedad ${i + 1}/${listingContainers.length}...`);

    // Click en la propiedad para abrir el modal
    container.click();

    // Esperar a que el modal se abra
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extraer datos del modal
    const modal = document.querySelector('.apex-idxmdvmain');

    if (modal) {
      try {
        // Dirección
        const addressA = modal.querySelector('.apex-idxmdvcity span')?.textContent?.trim() || '';
        const addressB = modal.querySelector('.apex-idxmdvbb span')?.textContent?.trim() || '';
        const fullAddress = (addressA + ' ' + addressB).trim();

        // Precio
        const priceText = modal.querySelector('.apex-idxcurr-price-main span:last-child')?.textContent?.trim() || '';
        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;

        // Beds, Baths, SqFt, Lot Size desde la lista apex-idxmdvlist
        let bedrooms = 0;
        let bathrooms = 0;
        let sqft = 0;
        let lotSize = null;

        const statsList = modal.querySelectorAll('.apex-idxmdvlist.feat-list li');
        statsList.forEach(li => {
          const text = li.textContent.trim();
          if (text.includes('Beds')) {
            bedrooms = parseInt(li.querySelector('b')?.textContent || '0');
          } else if (text.includes('Baths')) {
            bathrooms = parseFloat(li.querySelector('b')?.textContent || '0');
          } else if (text.includes('SqFt') && !text.includes('Lot')) {
            sqft = parseInt(li.querySelector('b')?.textContent?.replace(/,/g, '') || '0');
          } else if (text.includes('SqFt Lot')) {
            lotSize = parseInt(li.querySelector('b')?.textContent?.replace(/,/g, '') || '0');
          }
        });

        // Datos del status section
        let status = 'for-sale';
        let daysOnMarket = null;
        let yearBuilt = null;
        let mlsNumber = '';
        let propertyType = 'single-family';
        let virtualTourUrl = null;

        const statusList = modal.querySelectorAll('.apex-idxmdvstatus ul li');
        statusList.forEach(li => {
          const keyElem = li.querySelector('.feat-key');
          const valElem = li.querySelector('.feat-value');

          if (!keyElem) return;

          const key = keyElem.textContent.trim();
          const value = valElem?.textContent?.trim() || '';

          if (key.includes('Status')) {
            const statusText = value.toLowerCase();
            if (statusText.includes('sold')) status = 'sold';
            else if (statusText.includes('pending')) status = 'pending';
            else status = 'for-sale';
          } else if (key.includes('Days on Market')) {
            daysOnMarket = parseInt(value) || null;
          } else if (key.includes('Year built')) {
            yearBuilt = parseInt(value) || null;
          } else if (key.includes('MLS#')) {
            mlsNumber = value;
          } else if (key.includes('Type')) {
            const typeText = value.toLowerCase();
            if (typeText.includes('condo')) propertyType = 'condo';
            else if (typeText.includes('townhouse')) propertyType = 'townhouse';
            else if (typeText.includes('multi')) propertyType = 'multi-family';
            else propertyType = 'single-family';
          }
        });

        // Virtual Tour
        const vtLink = modal.querySelector('.apex-idxmdvstatus a[target="_blank"]');
        if (vtLink && vtLink.textContent.includes('Virtual Tour')) {
          virtualTourUrl = vtLink.getAttribute('href');
        }

        // Descripción
        const description = modal.querySelector('.apex-idxmdvcontent div[data-bind*="rem"]')?.textContent?.trim() || '';

        // Features - desde la sección apex-idxmdventry
        const features = [];
        const featureItems = modal.querySelectorAll('.apex-idxmdventry ul li');
        featureItems.forEach(li => {
          const text = li.textContent?.trim();
          if (text && text.length > 0 && text.length < 50) {
            features.push(text);
          }
        });

        // Imágenes - desde fotorama
        const images = [];
        const imageElements = modal.querySelectorAll('.fotorama__nav__frame img');
        imageElements.forEach(img => {
          const src = img.getAttribute('src');
          if (src && src.includes('api.cotality.com') && !images.includes(src)) {
            images.push(src);
          }
        });

        // Si no hay imágenes en nav, intentar desde stage
        if (images.length === 0) {
          const stageImages = modal.querySelectorAll('.fotorama__stage__frame img');
          stageImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src && src.includes('api.cotality.com') && !images.includes(src)) {
              images.push(src);
            }
          });
        }

        // Separar dirección en componentes
        const addressParts = fullAddress.split(',').map(p => p.trim());
        const street = addressParts[0] || '';
        let city = 'San Bernardino';
        let state = 'CA';
        let zip = '92408';

        // Intentar parsear ciudad, estado y zip
        if (addressParts.length >= 2) {
          city = addressParts[1] || city;
        }
        if (addressParts.length >= 3) {
          const stateZipMatch = addressParts[2].match(/([A-Z]{2})\s*(\d{5})/);
          if (stateZipMatch) {
            state = stateZipMatch[1];
            zip = stateZipMatch[2];
          }
        }

        // Crear slug de la dirección
        const slug = street
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const property = {
          id: `prop-${Date.now()}-${i}`,
          slug: slug,
          status: status,
          price: price,
          address: {
            street: street,
            city: city,
            state: state,
            zip: zip
          },
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          sqft: sqft,
          lotSize: lotSize,
          yearBuilt: yearBuilt,
          propertyType: propertyType,
          description: description.substring(0, 800), // Limitar descripción
          features: features.slice(0, 15), // Primeras 15 características
          images: images.slice(0, 10), // Primeras 10 imágenes
          virtualTourUrl: virtualTourUrl,
          mlsNumber: mlsNumber,
          daysOnMarket: daysOnMarket,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        properties.push(property);
        console.log(`✓ Propiedad ${i + 1} extraída:`, property.address.street);
        console.log(`  Precio: $${property.price.toLocaleString()}, ${property.bedrooms}bd/${property.bathrooms}ba, ${property.sqft}sqft`);
        console.log(`  Imágenes: ${property.images.length}, Features: ${property.features.length}`);

      } catch (error) {
        console.error(`Error extrayendo propiedad ${i + 1}:`, error);
      }

      // Cerrar modal - intentar varios métodos
      const closeButton = modal.querySelector('.apex-idx-axe');
      if (closeButton) {
        closeButton.click();
      } else {
        // Presionar ESC
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 }));
      }

      // Esperar a que el modal se cierre
      await new Promise(resolve => setTimeout(resolve, 1500));
    } else {
      console.warn(`No se encontró modal para propiedad ${i + 1}`);
    }
  }

  console.log('\n=== EXTRACCIÓN COMPLETA ===');
  console.log(`Total de propiedades extraídas: ${properties.length}`);
  console.log('\n=== COPIA EL JSON DE ABAJO ===\n');
  console.log(JSON.stringify(properties, null, 2));

  return properties;
}

// Ejecutar la función
console.log('🚀 Iniciando extracción de propiedades...\n');
scrapeProperties().then(props => {
  console.log('\n✓ Proceso completado');
  console.log(`✓ ${props.length} propiedades procesadas`);
  console.log('\n📋 Copia el JSON de arriba y guárdalo en un archivo');
  console.log('📧 Luego envíalo para actualizar el sitio');
});
