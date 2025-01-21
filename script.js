const slots = document.querySelectorAll('.slot');
const materials = document.querySelectorAll('.material');
const outputSlot = document.querySelector('.output-slot');
const craftButton = document.getElementById('craftButton');

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
        img.style.width = '3.125em';
        img.style.height = '3.125em';

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
    'Iron Pickaxe' : ['iron', 'iron', 'iron', null, 'stick', null, null, 'stick', null]
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
