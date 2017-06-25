const getTerm = data => data.word;
const getDefinition = data => data.definition || data.translation;

const renderLoading = () => `
  <div class="content">Loading...</div>
`;

const renderTerm = data => `
  <div class="content">
    <div class="term">${getTerm(data)}</div>
    <div class="definition">${getDefinition(data)}</div>
  </div>
`;

