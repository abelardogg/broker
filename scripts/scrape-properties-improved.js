/**
 * Script MEJORADO para extraer propiedades de arrowheadrealtygroup.com
 * Ahora incluye: listing-attr data, todos los features, y tipo de listing
 *
 * INSTRUCCIONES:
 * 1. Abre la página en tu navegador:
 *    https://search.arrowheadrealtygroup.com/idx/featuredoffices/price_orderBy/desc_order/1_p
 *
 * 2. Abre la consola de desarrollador (F12)
 * 3. Copia y pega este script completo
 * 4. Presiona Enter
 * 5. El script extraerá SOLO LAS PRIMERAS 3 PROPIEDADES
 * 6. Al final, copia el JSON que se muestra en la consola
 */

async function scrapePropertiesImproved() {
  const properties = [];

  // Encuentra todos los contenedores de propiedades
  const listingContainers = document.querySelectorAll('.listing-content');

  // Limitar a las primeras 3 propiedades para verificación
  const limitedContainers = Array.from(listingContainers).slice(0, 3);

  console.log(`🎯 Extrayendo las primeras 3 propiedades de ${listingContainers.length} totales`);

  for (let i = 0; i < limitedContainers.length; i++) {
    const container = limitedContainers[i];

    console.log(`\n📍 Procesando propiedad ${i + 1}/3...`);

    // NUEVO: Extraer tipo de listing ANTES de abrir el modal (string tal cual)
    let listingType = 'Sale'; // default
    const statusTxt = container.querySelector('.status_txt');
    if (statusTxt) {
      listingType = statusTxt.textContent.trim();
      console.log(`  📋 Listing Type: "${listingType}"`);
    }

    // Click en la propiedad para abrir el modal
    container.click();

    // Esperar a que el modal se abra
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Extraer datos del modal
    const modal = document.querySelector('.apex-idxmdvmain');

    if (modal) {
      try {
        // Dirección - addressA es la calle, addressB es ciudad/estado/zip
        const addressA = modal.querySelector('.apex-idxmdvcity span')?.textContent?.trim() || '';
        const addressB = modal.querySelector('.apex-idxmdvbb span')?.textContent?.trim() || '';

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

        // MEJORADO: Extraer TODOS los features de .apex-idxmdventry
        const features = [];
        const featureItems = modal.querySelectorAll('.apex-idxmdventry ul li');
        console.log(`  ✨ Features encontrados en modal: ${featureItems.length}`);

        featureItems.forEach(li => {
          const text = li.textContent?.trim();
          if (text && text.length > 0) {
            features.push(text);
          }
        });

        // NUEVO: Extraer datos de listing-attr
        const listingAttr = {
          source: null,
          listingAgent: null,
          listingAgentDRE: null,
          coListingAgent: null,
          coListingAgentDRE: null,
          listingUpdated: null,
          listingOffice: null,
          coListingOffice: null,
          databaseUpdated: null
        };

        const attrList = modal.querySelectorAll('.apex-idxmdvgray.listing-attr ul li');
        attrList.forEach(li => {
          const text = li.textContent.trim();
          const span = li.querySelector('span');
          const strong = li.querySelector('strong');

          if (!span || !strong) return;

          const label = span.textContent.trim();
          const value = strong.textContent.trim();

          if (label.includes('Source:')) {
            listingAttr.source = value;
          } else if (label.includes('LA:')) {
            listingAttr.listingAgent = value;
            // Extraer DRE si existe
            const dreMatch = text.match(/DRE#?\s*(\d+)/i);
            if (dreMatch) listingAttr.listingAgentDRE = dreMatch[1];
          } else if (label.includes('Co-LA:')) {
            listingAttr.coListingAgent = value;
            const dreMatch = text.match(/DRE#?\s*(\d+)/i);
            if (dreMatch) listingAttr.coListingAgentDRE = dreMatch[1];
          } else if (label.includes('Listing Updated:')) {
            listingAttr.listingUpdated = value;
          } else if (label.includes('LO:')) {
            listingAttr.listingOffice = value;
          } else if (label.includes('Co-LO:')) {
            listingAttr.coListingOffice = value;
          } else if (label.includes('Database Updated:')) {
            listingAttr.databaseUpdated = value;
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

        // Parsear dirección - addressA es calle, addressB es ciudad/estado/zip
        const street = addressA.trim();
        let city = '';
        let state = 'CA';
        let zip = '';

        // Parsear addressB para ciudad, estado y zip
        // Formato esperado: "Yorba Linda, CA 92886-" o "CA 92886-"
        if (addressB) {
          const parts = addressB.split(',').map(p => p.trim());
          if (parts.length >= 2) {
            // Formato: "Ciudad, CA 92886"
            city = parts[0];
            const stateZipMatch = parts[1].match(/([A-Z]{2})\s*(\d{5})/);
            if (stateZipMatch) {
              state = stateZipMatch[1];
              zip = stateZipMatch[2];
            }
          } else if (parts.length === 1) {
            // Formato: "CA 92886-"
            const stateZipMatch = parts[0].match(/([A-Z]{2})\s*(\d{5})/);
            if (stateZipMatch) {
              state = stateZipMatch[1];
              zip = stateZipMatch[2];
            }
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
          listingType: listingType, // NUEVO: tipo de listing (for-sale, for-rent, etc)
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
          description: description,
          features: features, // TODOS los features
          images: images,
          virtualTourUrl: virtualTourUrl,
          mlsNumber: mlsNumber,
          daysOnMarket: daysOnMarket,
          listingInfo: listingAttr, // NUEVO: información del listing
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };

        properties.push(property);
        console.log(`✅ Propiedad ${i + 1} extraída:`);
        console.log(`   📍 ${property.address.street}`);
        console.log(`   💰 $${property.price.toLocaleString()}`);
        console.log(`   🏠 ${property.bedrooms}bd/${property.bathrooms}ba, ${property.sqft}sqft`);
        console.log(`   📸 ${property.images.length} imágenes`);
        console.log(`   ✨ ${property.features.length} features`);
        console.log(`   📋 Listing Type: ${property.listingType}`);
        console.log(`   👤 Listing Agent: ${property.listingInfo.listingAgent || 'N/A'}`);

      } catch (error) {
        console.error(`❌ Error extrayendo propiedad ${i + 1}:`, error);
      }

      // Cerrar modal
      const closeButton = modal.querySelector('.apex-idx-axe');
      if (closeButton) {
        closeButton.click();
      } else {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27 }));
      }

      // Esperar a que el modal se cierre
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      console.warn(`⚠️  No se encontró modal para propiedad ${i + 1}`);
    }
  }

  console.log('\n\n═══════════════════════════════════════════════════════');
  console.log('🎉 EXTRACCIÓN COMPLETA');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📊 Total de propiedades extraídas: ${properties.length}`);
  console.log('\n📋 COPIA EL JSON DE ABAJO:\n');
  console.log(JSON.stringify(properties, null, 2));
  console.log('\n═══════════════════════════════════════════════════════');

  return properties;
}

// Ejecutar la función
console.log('🚀 Iniciando extracción MEJORADA de propiedades...');
console.log('📌 Solo extrayendo las primeras 3 propiedades para verificación\n');
scrapePropertiesImproved().then(props => {
  console.log(`\n✅ Proceso completado - ${props.length} propiedades procesadas`);
  console.log('📧 Copia el JSON de arriba y envíalo para verificación');
});
