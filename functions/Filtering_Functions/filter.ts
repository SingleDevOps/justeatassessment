export function filterCuisines(item) {
    return item.cuisines
        .map((cuisine) => {
            const name = cuisine.name;

            switch (true) {
                // case lower.includes('fish & chips'):
                //     return name + ' 🐟🍟 ';
                // case lower.includes('curry'):
                //     return name + ' 🍛 ';
                // case lower.includes('groceries'):
                //     return name + ' 🛍️ ';
                // case lower.includes('low delivery fee'):
                //     return name + ' 💸 ';
                // case lower.includes('shops'):
                //     return name + ' 🛒 ';
                // case lower.includes('collect stamps'):
                //     return name + ' 📮 ';
                // case lower.includes('deals'):
                //     return name + ' 🤑 ';
                // case lower.includes('pharmacy'):
                //     return name + ' 💊 ';
                // case lower.includes('alcohol'):
                //     return name + ' 🍺 ';
                // case lower.includes('pizza'):
                //     return name + ' 🍕 ';
                // case lower.includes('off'):
                //     return name + ' 💲 ';
                // case lower.includes('halal'):
                //     return name + ' حلال ';
                // case lower.includes('burger'):
                //     return name + ' 🍔 ';
                // case lower.includes('chicken'):
                //     return name + ' 🍗 ';
                // case lower.includes('convenience'):
                //     return name + ' 🏪 ';
                // case lower.includes('local legends'):
                //     return name + ' 👑 ';
                // case lower.includes('sandwich'):
                //     return name + ' 🥪 ';
                // case lower.includes('kebab'):
                //     return name + ' 🍖 ';
                // case lower.includes('breakfast'):
                //     return name + ' 🍳 ';
                // case lower.includes('desserts'):
                //     return name + ' 🍰 ';
                // case lower.includes('sushi'):
                //     return name + ' 🍣 ';
                // case lower.includes('curry'):
                //     return name + ' 🍛 ';
                // case lower.includes('coffee'):
                //     return name + ' ☕ ';
                // case lower.includes('indian'):
                //     return name + ' 🇮🇳 ';
                // case lower.includes('chinese'):
                //     return name + ' 🥡 ';
                // case lower.includes('milkshakes'):
                //     return name + ' 🥤 ';
                // case lower.includes('doughnuts'):
                //     return name + ' 🍩 ';
                // case lower.includes('bakery'):
                //     return name + ' 🍞 ';
                // case lower.includes('steak'):
                //     return name + ' 🥩 ';
                // case lower.includes('pasta'):
                //     return name + ' 🍝 ';
                // case lower.includes('thai'):
                //     return name + ' 🇹🇭 ';
                // case /^american$/.test(lower): //only matches American instead of South American.
                //     return name + ' 🇺🇸 ';
                // case lower.includes('south america'):
                //     return name + ' 🌎 ';
                // case lower.includes('italian'):
                //     return name + ' 🇮🇹 ';
                // case lower.includes('japanese'):
                //     return name + ' 🇯🇵 ';
                // case lower.includes('sushi'):
                //     return name + ' 🍣 ';
                // case lower.includes('freebies'):
                //     return name + ' 🆓 ';
                // case lower.includes('lunch'):
                //     return name + ' 🍴 ';
                // case lower.includes('dinner'):
                //     return name + ' 🍽️ ';
                // case lower.includes('asia'):
                //     return name + ' 🥢 ';
                // case lower.includes('leban'):
                //     return name + ' 🇱🇧 ';
                // case lower.includes('grill'):
                //     return name + ' 🔥 ';
                // case lower.includes('noodle'):
                //     return name + ' 🍜 ';
                // case lower.includes('ramen'):
                //     return name + ' 🍜 ';
                // case lower.includes('health'):
                //     return name + ' 💚 ';
                // case lower.includes('gree'):
                //     return name + ' 🇬🇷 ';
                // case lower.includes('turk'):
                //     return name + ' 🇹🇷 ';
                // case lower.includes('caribb'):
                //     return name + ' 🏝️ ';
                // case lower.includes('mexi'):
                //     return name + ' 🇲🇽 ';
                // case lower.includes('burrito'):
                //     return name + ' 🌯 ';
                // case lower.includes('jamaica'):
                //     return name + ' 🇯🇲 ';
                // case lower.includes('mediterranean'):
                //     return name + ' ⛵ ';
                // case lower.includes('korea'):
                //     return name + ' 🇰🇷 ';
                // // Add more cases if needed
                // case lower.includes('jerk'):
                //     return name + ' 🐂 ';
                // case lower.includes('africa'):
                //     return name + ' 🌍 ';
                // case lower.includes('nigeria'):
                //     return name + ' 🇳🇬 ';
                // case lower.includes('electron'):
                //     return name + ' 📱 ';
                // case lower.includes('salad'):
                //     return name + ' 🥗 ';
                // case lower.includes('venezue'):
                //     return name + ' 🇻🇪 ';
                // case lower.includes('veg'):
                //     return name + ' 🥑 ';
                // case lower.includes('wrap'):
                //     return name + ' 🌯 ';
                // case lower.includes('pakist'):
                //     return name + ' 🇵🇰 ';
                // case lower.includes('peri peri'):
                //     return name + ' 🌶️🍗 ';
                // case lower.includes('waffle'):
                //     return name + ' 🧇 ';
                default:
                    return '• ' + name + ' \n';
            }
        })
        .join('');
}
