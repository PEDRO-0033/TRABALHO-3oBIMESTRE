
export const POKEMON_LIST = [
    { name: 'mimikyu', id: 778 },
    { name: 'shinx', id: 403 },
    { name: 'sylveon', id: 700 },
    { name: 'ampharos', id: 181 },
    { name: 'pumpkaboo', id: 710 },
    { name: 'corviknight', id: 823 },
    { name: 'bisharp', id: 625 },
    { name: 'ursaluna', id: 901 },
    { name: 'pancham', id: 674 },
    { name: 'volcarona', id: 637 }
  ];
  
  export const getDescription = (speciesData) => {
    const ptEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "pt");
    const enEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    return (ptEntry?.flavor_text || enEntry?.flavor_text || "Descrição não disponível")
      .replace(/[\n\f]/g, ' ');
  };
  
  export const getCategory = (speciesData) => {
    return speciesData.genera.find(g => g.language.name === "pt")?.genus || 
           speciesData.genera.find(g => g.language.name === "en")?.genus ||
           "Categoria desconhecida";
  };