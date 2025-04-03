export function filterCuisines(item) {
    return item.cuisines
        .map((cuisine) => {
            const name = cuisine.name;
            const lower = name.toLowerCase();

            switch (true) {
                case lower.includes('fish & chips'):
                    return name + ' 🐟🍟\n';
                case lower.includes('curry'):
                    return name + ' 🍛\n';
                case lower.includes('groceries'):
                    return name + ' 🛍️\n';
                case lower.includes('low delivery fee'):
                    return name + ' 💸\n';
                case lower.includes('shops'):
                    return name + ' 🛒\n';
                case lower.includes('collect stamps'):
                    return name + ' 📮\n';
                case lower.includes('deals'):
                    return name + ' 🤑\n';
                case lower.includes('pharmacy'):
                    return name + ' 💊\n';
                case lower.includes('alcohol'):
                    return name + ' 🍺\n';
                case lower.includes('pizza'):
                    return name + ' 🍕\n';
                case lower.includes('off'):
                    return name + ' 💲\n';
                case lower.includes('halal'):
                    return name + ' حلال\n';
                case lower.includes('burger'):
                    return name + ' 🍔\n';
                case lower.includes('chicken'):
                    return name + ' 🍗\n';
                case lower.includes('convenience'):
                    return name + ' 🏪\n';
                case lower.includes('local legends'):
                    return name + ' 👑\n';
                case lower.includes('sandwich'):
                    return name + ' 🥪\n';
                case lower.includes('kebab'):
                    return name + ' 🍖\n';
                case lower.includes('breakfast'):
                    return name + ' 🍳\n';
                case lower.includes('desserts'):
                    return name + ' 🍰\n';
                case lower.includes('sushi'):
                    return name + ' 🍣\n';
                case lower.includes('curry'):
                    return name + ' 🍛\n';
                case lower.includes('coffee'):
                    return name + ' ☕\n';
                case lower.includes('indian'):
                    return name + ' 🇮🇳\n';
                case lower.includes('chinese'):
                    return name + ' 🥡\n';
                case lower.includes('milkshakes'):
                    return name + ' 🥤\n';
                case lower.includes('doughnuts'):
                    return name + ' 🍩\n';
                case lower.includes('bakery'):
                    return name + ' 🍞\n';
                case lower.includes('steak'):
                    return name + ' 🥩\n';
                case lower.includes('pasta'):
                    return name + ' 🍝\n';
                case lower.includes('thai'):
                    return name + ' 🇹🇭\n';
                case /^american$/.test(lower): //only matches American instead of South American.
                    return name + ' 🇺🇸\n';
                case lower.includes('south america'):
                    return name + ' 🌎\n';
                case lower.includes('italian'):
                    return name + ' 🇮🇹\n';
                case lower.includes('japanese'):
                    return name + ' 🇯🇵\n';
                case lower.includes('sushi'):
                    return name + ' 🍣\n';
                case lower.includes('freebies'):
                    return name + ' 🆓\n';
                case lower.includes('lunch'):
                    return name + ' 🍴\n';
                case lower.includes('dinner'):
                    return name + ' 🍽️\n';
                case lower.includes('asia'):
                    return name + ' 🥢\n';
                case lower.includes('leban'):
                    return name + ' 🇱🇧\n';
                case lower.includes('grill'):
                    return name + ' 🔥\n';
                case lower.includes('noodle'):
                    return name + ' 🍜\n';
                case lower.includes('ramen'):
                    return name + ' 🍜\n';
                case lower.includes('health'):
                    return name + ' 💚\n';
                case lower.includes('gree'):
                    return name + ' 🇬🇷\n';
                case lower.includes('turk'):
                    return name + ' 🇹🇷\n';
                case lower.includes('caribb'):
                    return name + ' 🏝️\n';
                case lower.includes('mexi'):
                    return name + ' 🇲🇽\n';
                case lower.includes('burrito'):
                    return name + ' 🌯\n';
                case lower.includes('jamaica'):
                    return name + ' 🇯🇲\n';
                case lower.includes('mediterranean'):
                    return name + ' ⛵\n';
                case lower.includes('korea'):
                    return name + ' 🇰🇷\n';
                // Add more cases if needed
                case lower.includes('jerk'):
                    return name + ' 🐂\n';
                case lower.includes('africa'):
                    return name + ' 🌍\n';
                case lower.includes('nigeria'):
                    return name + ' 🇳🇬\n';
                case lower.includes('electron'):
                    return name + ' 📱\n';
                case lower.includes('salad'):
                    return name + ' 🥗\n';
                case lower.includes('venezue'):
                    return name + ' 🇻🇪\n';
                case lower.includes('veg'):
                    return name + ' 🥑\n';
                case lower.includes('wrap'):
                    return name + ' 🌯\n';
                case lower.includes('pakist'):
                    return name + ' 🇵🇰\n';
                case lower.includes('peri peri'):
                    return name + ' 🌶️🍗\n';
                default:
                    return name + ' \n';
            }
        })
        .join('');
}
