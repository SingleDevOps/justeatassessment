/**
 * Function to match the cuisine names with emojis.
 * @param item - each restaurant object
 * @returns a string of text of all cuisines
 */


export function filterCuisines(item:any) {

    const cuisinesString = item.cuisines
        .slice(0, 2) // Only the first two cuisines are needed
        .map((cuisine:any) => {
            const name = cuisine.name;
            const lower = name.toLowerCase();
            switch (true) {
                // Existing cases
                case lower.includes('fish & chips'):
                    return '🐟🍟 ' + name;
                case lower.includes('curry'):
                    return '🍛 ' + name;
                case lower.includes('groceries'):
                    return '🛍️ ' + name;
                case lower.includes('low delivery fee'):
                    return '💸 ' + name;
                case lower.includes('shops'):
                    return '🛒 ' + name;
                case lower.includes('collect stamps'):
                    return '📮 ' + name;
                case lower.includes('deals'):
                    return '🤑 ' + name;
                case lower.includes('pharmacy'):
                    return '💊 ' + name;
                case lower.includes('alcohol'):
                    return '🍺 ' + name;
                case lower.includes('pizza'):
                    return '🍕 ' + name;
                case lower.includes('off'):
                    return '💲 ' + name;
                case lower.includes('halal'):
                    return 'حلال ' + name;
                case lower.includes('burger'):
                    return '🍔 ' + name;
                case lower.includes('chicken'):
                    return '🍗 ' + name;
                case lower.includes('convenience'):
                    return '🏪 ' + name;
                case lower.includes('local legends'):
                    return '👑 ' + name;
                case lower.includes('sandwich'):
                    return '🥪 ' + name;
                case lower.includes('kebab'):
                    return '🍖 ' + name;
                case lower.includes('breakfast'):
                    return '🍳 ' + name;
                case lower.includes('desserts'):
                    return '🍰 ' + name;
                case lower.includes('sushi'):
                    return '🍣 ' + name;
                case lower.includes('coffee'):
                    return '☕ ' + name;
                case lower.includes('indian'):
                    return '🇮🇳 ' + name;
                case lower.includes('chinese'):
                    return '🥡 ' + name;
                case lower.includes('milkshakes'):
                    return '🥤 ' + name;
                case lower.includes('doughnuts'):
                    return '🍩 ' + name;
                case lower.includes('bakery'):
                    return '🍞 ' + name;
                case lower.includes('steak'):
                    return '🥩 ' + name;
                case lower.includes('pasta'):
                    return '🍝 ' + name;
                case lower.includes('thai'):
                    return '🇹🇭 ' + name;
                case /^american$/.test(lower): // only matches American instead of South American
                    return '🇺🇸 ' + name;
                case lower.includes('south america'):
                    return '🌎 ' + name;
                case lower.includes('italian'):
                    return '🇮🇹 ' + name;
                case lower.includes('japanese'):
                    return '🇯🇵 ' + name;
                case lower.includes('freebies'):
                    return '🆓 ' + name;
                case lower.includes('lunch'):
                    return '' + name;
                case lower.includes('dinner'):
                    return '🍽️ ' + name;
                case lower.includes('asia'):
                    return '🥢 ' + name;
                case lower.includes('leban'):
                    return '🇱🇧 ' + name;
                case lower.includes('grill'):
                    return '🔥 ' + name;
                case lower.includes('noodle'):
                    return '🍜 ' + name;
                case lower.includes('ramen'):
                    return '🍜 ' + name;
                case lower.includes('health'):
                    return '💚 ' + name;
                case lower.includes('gree'):
                    return '🇬🇷 ' + name;
                case lower.includes('turk'):
                    return '🇹🇷 ' + name;
                case lower.includes('caribb'):
                    return '🏝️ ' + name;
                case lower.includes('mexi'):
                    return '🇲🇽 ' + name;
                case lower.includes('burrito'):
                    return '🌯 ' + name;
                case lower.includes('jamaica'):
                    return '🇯🇲 ' + name;
                case lower.includes('mediterranean'):
                    return '⛵ ' + name;
                case lower.includes('korea'):
                    return '🇰🇷 ' + name;
                case lower.includes('jerk'):
                    return '🐂 ' + name;
                case lower.includes('africa'):
                    return '🌍 ' + name;
                case lower.includes('nigeria'):
                    return '🇳🇬 ' + name;
                case lower.includes('electron'):
                    return '📱 ' + name;
                case lower.includes('salad'):
                    return '🥗 ' + name;
                case lower.includes('venezue'):
                    return '🇻🇪 ' + name;
                case lower.includes('veg'):
                    return '🥑 ' + name;
                case lower.includes('wrap'):
                    return '🌯 ' + name;
                case lower.includes('pakist'):
                    return '🇵🇰 ' + name;
                case lower.includes('peri peri'):
                    return '🌶️🍗 ' + name;
                case lower.includes('waffle'):
                    return '🧇 ' + name;
                case lower.includes('poke'):
                    return '🍚 ' + name;
                case lower.includes('oriental'):
                    return '🏮 ' + name;
                case lower.includes('glutenfree') || lower.includes('gluten free') || lower.includes('gluten-free'):
                    return '🌾❌ ' + name;
                case lower.includes('streetfood') || lower.includes('street food') || lower.includes('street-food'):
                    return '🛖 ' + name;
                case lower.includes('european'):
                    return '🇪🇺 ' + name;
                case lower.includes('fusion'):
                    return '🔄🍽️ ' + name;
                case lower.includes('french'):
                    return '🇫🇷 ' + name;
                case lower.includes('gourmet'):
                    return '👨‍🍳 ' + name;
                case lower.includes('cafe'):
                    return '☕🍰 ' + name;
                case lower.includes('vietnamese'):
                    return '🇻🇳 ' + name;
                case lower.includes('hot-dogs') || lower.includes('hot dogs') || lower.includes('hotdogs'):
                    return '🌭 ' + name;
                case lower.includes('bagels'):
                    return '🥯 ' + name;
                case lower.includes('bubble-tea') || lower.includes('bubble tea'):
                    return '🧋 ' + name;
                case lower.includes('smoothies'):
                    return '🥤 ' + name;
                case lower.includes('gifts'):
                    return '🎁 ' + name;
                case lower.includes('moroccan'):
                    return '🇲🇦 ' + name;
                case lower.includes('british'):
                    return '🇬🇧 ' + name;
                case lower.includes('pies'):
                    return '🥧 ' + name;
                case lower.includes('pubfood') || lower.includes('pub food'):
                    return '🍺🍔 ' + name;
                case lower.includes('persian'):
                    return '🇮🇷 ' + name;
                case lower.includes('drinks'):
                    return '🍹 ' + name;
                case lower.includes('biryani'):
                    return '🍚🌶️ ' + name;
                case lower.includes('middle-eastern') || lower.includes('middle eastern'):
                    return '🕌 ' + name;
                case lower.includes('cantonese'):
                    return '🥢🥟 ' + name;
                case lower.includes('brunch'):
                    return '🍳☕ ' + name;
                case lower.includes('bangladeshi'):
                    return '🇧🇩 ' + name;
                case lower.includes('baguettes'):
                    return '🥖 ' + name;
                case lower.includes('pancakes'):
                    return '🥞 ' + name;
                case lower.includes('dim-sum') || lower.includes('dim sum'):
                    return '🥟 ' + name;
                case lower.includes('nepalese'):
                    return '🇳🇵 ' + name;
                case lower.includes('health-and-beauty') || lower.includes('health and beauty'):
                    return '💄 ' + name;
                case lower.includes('seafood'):
                    return '🦞 ' + name;
                case lower.includes('peruvian'):
                    return '🇵🇪 ' + name;
                case lower.includes('tapas'):
                    return '🇪🇸🍢 ' + name;
                case lower.includes('portuguese'):
                    return '🇵🇹 ' + name;
                case lower.includes('fastfood') || lower.includes('fast food'):
                    return '🍟🍔 ' + name;
                case lower.includes('cakes'):
                    return '🎂 ' + name;
                case lower.includes('argentinian'):
                    return '🇦🇷 ' + name;
                case lower.includes('polish'):
                    return '🇵🇱 ' + name;
                case lower.includes('german'):
                    return '🇩🇪 ' + name;
                case lower.includes('icecream') || lower.includes('ice cream') || lower.includes('ice-cream'):
                    return '🍦 ' + name;
                case lower.includes('sri-lankan') || lower.includes('sri lankan'):
                    return '🇱🇰 ' + name;
                case lower.includes('taiwanese'):
                    return '🇹🇼 ' + name;
                case lower.includes('syrian'):
                    return '🇸🇾 ' + name;
                case lower.includes('filipino'):
                    return '🇵🇭 ' + name;
                case lower.includes('frozenyogurt') || lower.includes('frozen yogurt'):
                    return '🍦🥛 ' + name;
                case lower.includes('eastern-european') || lower.includes('eastern european'):
                    return '🏰 ' + name;
                case lower.includes('pan-asian') || lower.includes('pan asian'):
                    return '🥢🍲 ' + name;
                case lower.includes('australian'):
                    return '🇦🇺 ' + name;
                case lower.includes('bbq'):
                    return '🍖🔥 ' + name;
                case lower.includes('sweets'):
                    return '🍬 ' + name;
                case lower.includes('ukrainian'):
                    return '🇺🇦 ' + name;
                case lower.includes('brazilian') || lower.includes('brazilian-food'):
                    return '🇧🇷 ' + name;
                case lower.includes('ethiopian'):
                    return '🇪🇹 ' + name;
                case lower.includes('singapore'):
                    return '🇸🇬 ' + name;
                case lower.includes('malaysian'):
                    return '🇲🇾 ' + name;
                case lower.includes('south-indian') || lower.includes('south indian'):
                    return '🍛🇮🇳 ' + name;
                case lower.includes('latinamerican') || lower.includes('latin american'):
                    return '🌮🌯 ' + name;
                case lower.includes('indo-chinese-fusion') || lower.includes('indo chinese fusion'):
                    return '🇮🇳🇨🇳 ' + name;
                case lower.includes('ghanaian'):
                    return '🇬🇭 ' + name;
                case lower.includes('continental'):
                    return '🌍🍽️ ' + name;
                case lower.includes('spanish'):
                    return '🇪🇸 ' + name;
                case lower.includes('columbian') || lower.includes('colombian'):
                    return '🇨🇴 ' + name;
                case lower.includes('west-african') || lower.includes('west african'):
                    return '🌍🌴 ' + name;
                case lower.includes('crepes'):
                    return '🥞 ' + name;
                case lower.includes('indonesian'):
                    return '🇮🇩 ' + name;
                case lower.includes('roast-dinners') || lower.includes('roast dinners'):
                    return '🍗🔥 ' + name;
                case lower.includes('paninis'):
                    return '🥪 ' + name;
                case lower.includes('authentic-pizza') || lower.includes('authentic pizza'):
                    return '🍕👨‍🍳 ' + name;
                case lower.includes('business-lunch') || lower.includes('business lunch'):
                    return '💼🍽️ ' + name;
                case lower.includes('texmex') || lower.includes('tex-mex') || lower.includes('tex mex'):
                    return '🌮🇺🇸 ' + name;
                case lower.includes('flowers'):
                    return '💐 ' + name;
                case lower.includes('english-breakfast') || lower.includes('english breakfast'):
                    return '🇬🇧🍳 ' + name;
                case lower.includes('kurdish'):
                    return '🏔️ ' + name;
                case lower.includes('iranian'):
                    return '🇮🇷 ' + name;
                case lower.includes('allnightalcohol') || lower.includes('all night alcohol'):
                    return '🌙🍺 ' + name;
                case lower.includes('new'):
                    return '🆕 ' + name;
                case lower.includes('with_discounts') || lower.includes('with discounts'):
                    return '💯 ' + name;
                case lower.includes('favouritespersonalised') || lower.includes('favorites personalized'):
                    return '❤️ ' + name;
                case lower.includes('four_star') || lower.includes('four star'):
                    return '⭐⭐⭐⭐ ' + name;
                case lower.includes('collection'):
                    return '📚 ' + name;
                default:
                    return '' + name;
            }
        })
        .join(', '); // Join with a comma and space

    return '' + cuisinesString;
}
