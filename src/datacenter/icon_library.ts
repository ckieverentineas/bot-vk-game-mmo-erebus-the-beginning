type IconKey = 'save' | 'load' | 'time' | 'delete' | 'success' | 'attach' | 'question' |
               'cancel' | 'reconfig' | 'config' | 'help' | 'next' | 'message' |
               'card' | 'cardg' | 'medal' | 'person' | 'edit' | 'back' | 'warn' |
               'status' | 'work' | 'facult' | 'statistics' | 'alliance' | 'add' | 'date' |
               'converter' | 'run' | 'persons' | 'monitor' | 'limit' | 'like' | 'post' |
               'info' | 'lock' | 'change'
               | 'captain' | 'explorer' | 'warrior' | 'pilot' | 'engineer' |// классы
               'strength' | 'endurance' | 'health' | 'erudition' | 'charisma' | 'synchronization' | 'karma' | 'intuition' | 'psyche' | 'stealth' | // статы
               'target'|
               'coal' | 'iron_ore' | 'iron' | 'gold_ore' | 'artefact' | 'energy' |'gold' | // ресурсы
               "ammo" | //амуниция
               'planet';

export const smile_list: { [key in IconKey]: { ico: string, name: string } } = {
    //классы
    'captain': { name: 'Капитан', ico: '⚓' },
    'explorer': { name: 'Исследователь', ico: '🧭' },
    'warrior': { name: 'Воин', ico: '⚔️' },
    'pilot': { name: 'Пилот', ico: '🚀' },
    'engineer': { name: 'Инженер', ico: '🛠️' },

    //статы
    'strength': { name: 'Сила', ico: '💪' },
    'endurance': { name: 'Выносливость', ico: '🏃‍♂️' },
    'health': { name: 'Здоровье', ico: '❤️' },
    'erudition': { name: 'Эрудиция', ico: '📚' },
    'charisma': { name: 'Харизма', ico: '✨' },
    'synchronization': { name: 'Синхронизация', ico: '📡' },
    'karma': { name: 'Карма', ico: '☯️' },
    'intuition': { name: 'Интуиция', ico: '🔮' },
    'psyche': { name: 'Психика', ico: '🧠' },
    'stealth': { name: 'Скрытность', ico: '👤' },
    //материалы
    'iron': { name: 'Железо', ico: '📏'},
    'energy': { name: 'Энергия', ico: '⚡'},
    'gold': { name: 'Шекели', ico: '💰'},
    //ресурсы
    'coal': {name: 'Уголь', ico: '⬛'},
    //'gas': {name: 'Газ', ico: '⏹'},
    //'oil': {name: 'Нефть', ico: '🔲'},
    //'slate': {name: 'Сланец', ico: '🟪'},
    //'turf': {name: 'Торф', ico: '🟧'},
    //'uranium': {name: 'Ураниум', ico: '🟩'},
    'iron_ore': {name: 'Железная руда', ico: '⚪'},
    'gold_ore': {name: 'Золото', ico: '🟡'},
    'artefact': {name: 'Артефакт', ico: '⚱️'},
    //'crystal': {name: 'Караты', ico: '💎'},
    //'worker': { name: 'Рабочие', ico: '👥'},
    
    //'research': { name: 'Очки исследований', ico: '🧪'},
    //'crystal_dirt': { name: 'Караты неочищенные', ico: '💠'},
    //амуниция
    "ammo": { name: 'Патроны', ico: '🕋' },
    //
    'planet': { name: '', ico: '🌍' },
    'target': { name: '', ico: '🎯' },
    'save': { name: '', ico: '💾' },
    'add': { name: '', ico: '➕' },
    'edit': { name: '', ico: '✏' },
    'next': { name: '', ico: '→' },
    'back': { name: '', ico: '←' },
    'attach': { name: '', ico: '🧷' },
    'message': { name: '', ico: '💬' },
    'load': { name: '', ico: '⌛' },
    'time': { name: '', ico: '⏰' },
    'delete': { name: '', ico: '⛔' },
    'success': { name: '', ico: '✅' },
    'cancel': { name: '', ico: '🚫' },
    'reconfig': { name: '', ico: '🔧' },
    'config': { name: '', ico: '⚙' },
    'help': { name: '', ico: '💡' },
    'warn': { name: '', ico: '⚠' },
    'statistics': { name: '', ico: '📊' },
    'question': { name: '', ico: '⁉' },
    'converter': { name: '', ico: '⚖' },
    'run': { name: '', ico: '🚀' },
    'monitor': { name: '', ico: '🎥' },
    'limit': { name: '', ico: '🚧' },
    'like': { name: '', ico: '👍' },
    'post': { name: '', ico: '📰' },
    'date': { name: '', ico: '⚰' },
    'info': { name: '', ico: '📜' },
    'lock': { name: '', ico: '🔒' },
    'change': { name: '', ico: '🔃' },

    'alliance': { name: '', ico: '🌐' },
    'card': { name: '', ico: '💳' },
    'cardg': { name: '', ico: '🕯' },
    'medal': { name: '', ico: '🔘' },
    'person': { name: '', ico: '👤' },
    'persons': { name: '', ico: '👥' },
    'status': { name: '', ico: '👑' },
    'work': { name: '', ico: '🔨' },
    'facult': { name: '', ico: '🔮' }
};