export function filterCuisines(item) {
    return item.cuisines
        .map((cuisine) => {
            const name = cuisine.name;
            const lower = name.toLowerCase();

            switch (true) {
                case lower.includes('chinese'):
                    return name + ' 🥡';
                case lower.includes('curry'):
                    return name + ' 🍛';
                case lower.includes('groceries'):
                    return name + ' 🛍️';
                case lower.includes('low delivery fee'):
                    return name + ' 💸';
                case lower.includes('shops'):
                    return name + ' 🛒';
                case lower.includes('collect stamps'):
                    return name + ' 📮';
                case lower.includes('deals'):
                    return name + ' 🤑';
                case lower.includes('pharmacy'):
                    return name + ' ❌';
                case lower.includes('alcohol'):
                    return name + ' 🍺';
                case lower.includes('pizza'):
                    return name + ' 🍕';
                case lower.includes('off'):
                    return name + ' 💲';
                case lower.includes('halal'):
                    return name + ' حلال';
                case lower.includes('burger'):
                    return name + ' 🍔';
                case lower.includes('chicken'):
                    return name + ' 🍗';
                case lower.includes('convenience'):
                    return name + ' 🏪';
                case lower.includes('local legends'):
                    return name + ' 👑';
                case lower.includes('sandwich'):
                    return name + ' 🥪';
                case lower.includes('kebab'):
                    return name + ' 🍖';
                case lower.includes('breakfast'):
                    return name + ' 🍳';
                case lower.includes('desserts'):
                    return name + ' 🍰';
                case lower.includes('sushi'):
                    return name + ' 🍣';
                case lower.includes('curry'):
                    return name + ' 🍛';
                case lower.includes('coffee'):
                    return name + ' ☕';
                case lower.includes('indian'):
                    return name + ' 🍛';
                case lower.includes('japanese'):
                    return name + ' 🍣';
                case lower.includes('chinese'):
                    return name + ' 🥡';
                case lower.includes('milkshakes'):
                    return name + ' 🥤';
                case lower.includes('doughnuts'):
                    return name + ' 🍩';
                case lower.includes('bakery'):
                    return name + ' 🍞';
                case lower.includes('steak'):
                    return name + ' 🥩';
                case lower.includes('pasta'):
                    return name + ' 🍝';
                // Add more cases if needed
                default:
                    return name;
            }
        })
        .join(', ');
}
