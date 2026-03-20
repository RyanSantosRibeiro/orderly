export const orderlySnippet = "";
export const findMySizeScript = `<!-- orderly Size Finder & Chart -->
<div id="orderly-size-widget"></div>
<div id="orderly-chart-widget"></div>

<script src="https://orderly.vercel.app/orderlyFindMySize.js"></script>
<script src="https://orderly.vercel.app/orderlySizeChart.js"></script>

<script>
  // Inicializa Recomendador
  FindMySize.init({
    apiKey: 'SUA_CHAVE_AQUI',
    buttonSelector: '#orderly-size-widget',
    targetBrandId: 1, // ID da sua marca
    productImage: 'URL_DA_IMAGEM',
    productName: 'NOME_DO_PRODUTO'
  });

  // Inicializa Tabela de Medidas
  orderlySizeChart.init({
    apiKey: 'SUA_CHAVE_AQUI',
    tableId: 'ID_DA_TABELA',
    buttonSelector: '#orderly-chart-widget'
  });
</script>`