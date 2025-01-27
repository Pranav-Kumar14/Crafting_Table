const slots = document.querySelectorAll('.slot');
const materials = document.querySelectorAll('.material');
const outputSlot = document.querySelector('.output-slot');
const craftButton = document.getElementById('craftButton');
const clearButton = document.getElementById('clearButton');

let selectedMaterial = null;

function clearCraftingTable() {
  slots.forEach(slot => {
    slot.innerHTML = ''; 
    delete slot.dataset.item;
  });
  outputSlot.innerHTML = '';
}

clearCraftingTable();

materials.forEach(material => {
  material.addEventListener('click', () => {
    materials.forEach(m => m.classList.remove('selected'));
    material.classList.add('selected');
    selectedMaterial = material.dataset.item === "remove" ? null : material.dataset.item;
  });
});

slots.forEach(slot => {
  slot.addEventListener('click', () => {
    if (selectedMaterial !== null) {
      slot.innerHTML = '';

      if (selectedMaterial) {
        const img = document.createElement('img');
        img.src = `./images/${selectedMaterial}.png`;
        img.alt = selectedMaterial;
        img.style.width = '3.124em';
        img.style.height = '3.124em';

        slot.appendChild(img);
        slot.dataset.item = selectedMaterial;
      }
    } else {
      slot.innerHTML = '';
      delete slot.dataset.item;
    }
  });
});

function checkRecipe() {
  const recipes = {
    'Diamond Sword': [null, 'diamond', null, null, 'diamond', null, null, 'stick', null],
    'Bow': [null, 'stick', 'string', 'stick', null, 'string', null, 'stick', 'string'],
    'Iron Pickaxe': ['iron', 'iron', 'iron', null, 'stick', null, null, 'stick', null],
    'Diamond Pickaxe': ['diamond', 'diamond', 'diamond', null, 'stick', null, null, 'stick', null],
    'Iron Sword': [null, 'iron', null, null, 'iron', null, null, 'stick', null],
    'Crossbow': [null, 'stick', 'string', 'iron', 'stick', 'string', null, 'stick', 'iron'],
    'Diamond Axe': ['diamond', 'diamond', null, 'diamond', 'stick', null, null, 'stick', null],
    'Iron Axe': ['iron', 'iron', null, 'iron', 'stick', null, null, 'stick', null],
    'Diamond Shovel': [null, 'diamond', null, null, 'stick', null, null, 'stick', null],
    'Iron Shovel': [null, 'iron', null, null, 'stick', null, null, 'stick', null],
    'Diamond Hoe': ['diamond', 'diamond', null, null, 'stick', null, null, 'stick', null],
    'Iron Hoe': ['iron', 'iron', null, null, 'stick', null, null, 'stick', null],
    'Diamond Helmet': ['diamond', 'diamond', 'diamond', 'diamond', null, 'diamond', null, null, null],
    'Iron Helmet': ['iron', 'iron', 'iron', 'iron', null, 'iron', null, null, null],
    'Diamond Chestplate': ['diamond', null, 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'diamond'],
    'Iron Chestplate': ['iron', null, 'iron', 'iron', 'iron', 'iron', 'iron', 'iron', 'iron'],
    'Diamond Leggings': ['diamond', 'diamond', 'diamond', 'diamond', null, 'diamond', 'diamond', null, 'diamond'],
    'Iron Leggings': ['iron', 'iron', 'iron', 'iron', null, 'iron', 'iron', null, 'iron'],
    'Diamond Boots': [null, null, null, 'diamond', null, 'diamond', 'diamond', null, 'diamond'],
    'Iron Boots': [null, null, null, 'iron', null, 'iron', 'iron', null, 'iron']
};


  const placedItems = Array.from(slots).map(slot => slot.dataset.item || null);

  for (const [itemName, pattern] of Object.entries(recipes)) {
    if (JSON.stringify(placedItems) === JSON.stringify(pattern)) {
      outputSlot.innerHTML = ''; 

      if (itemName) {
        const img = document.createElement('img');
        img.src = `./images/${itemName.replace(' ', '_').toLowerCase()}.png`;
        img.alt = itemName;
        img.style.width = '3.125em'; 
        img.style.height = '3.125em';

        outputSlot.appendChild(img);
      }
      return;
    }
  }

  outputSlot.innerHTML = ''; 
}

craftButton.addEventListener('click', () => {
  checkRecipe(); 
});

clearButton.addEventListener('click', () => {
  clearCraftingTable(); 
});
