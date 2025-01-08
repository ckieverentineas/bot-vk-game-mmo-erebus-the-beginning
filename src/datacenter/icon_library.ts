type IconKey = 'save' | 'load' | 'time' | 'delete' | 'success' | 'attach' | 'question' |
               'cancel' | 'reconfig' | 'config' | 'help' | 'next' | 'message' | 'money' |
               'card' | 'cardg' | 'medal' | 'person' | 'edit' | 'back' | 'warn' |
               'status' | 'work' | 'facult' | 'statistics' | 'alliance' | 'add' | 'date' |
               'converter' | 'run' | 'persons' | 'monitor' | 'limit' | 'like' | 'post' |
               'info' | 'lock' | 'change'
               | 'captain' | 'explorer' | 'warrior' | 'pilot' | 'engineer' |// классы
               'strength' | 'endurance' | 'health' | 'erudition' | 'charisma' | 'synchronization' | 'karma' | 'intuition' | 'psyche' | 'stealth' | // статы
               'target';

export const smile_list: { [key in IconKey]: { ico: string } } = {
    //классы
    'captain': { ico: '⚓' },
    'explorer': { ico: '🧭' },
    'warrior': { ico: '⚔️' },
    'pilot': { ico: '🚀' },
    'engineer': { ico: '🛠️' },

    //статы
    'strength': { ico: '💪' },
    'endurance': { ico: '🏃‍♂️' },
    'health': { ico: '❤️' },
    'erudition': { ico: '📚' },
    'charisma': { ico: '✨' },
    'synchronization': { ico: '📡' },
    'karma': { ico: '☯️' },
    'intuition': { ico: '🔮' },
    'psyche': { ico: '🧠' },
    'stealth': { ico: '👤' },

    //
    'target': { ico: '🎯' },
    'save': { ico: '💾' },
    'add': { ico: '➕' },
    'edit': { ico: '✏' },
    'next': { ico: '→' },
    'back': { ico: '←' },
    'attach': { ico: '🧷' },
    'message': { ico: '💬' },
    'load': { ico: '⌛' },
    'time': { ico: '⏰' },
    'delete': { ico: '⛔' },
    'success': { ico: '✅' },
    'cancel': { ico: '🚫' },
    'reconfig': { ico: '🔧' },
    'config': { ico: '⚙' },
    'help': { ico: '💡' },
    'warn': { ico: '⚠' },
    'statistics': { ico: '📊' },
    'question': { ico: '⁉' },
    'converter': { ico: '⚖' },
    'run': { ico: '🚀' },
    'monitor': { ico: '🎥' },
    'limit': { ico: '🚧' },
    'like': { ico: '👍' },
    'post': { ico: '📰' },
    'money': { ico: '💰' },
    'date': { ico: '⚰' },
    'info': { ico: '📜' },
    'lock': { ico: '🔒' },
    'change': { ico: '🔃' },
    //'': { ico: '🔃' },

    'alliance': { ico: '🌐' },
    'card': { ico: '💳' },
    'cardg': { ico: '🕯' },
    'medal': { ico: '🔘' },
    'person': { ico: '👤' },
    'persons': { ico: '👥' },
    'status': { ico: '👑' },
    'work': { ico: '🔨' },
    'facult': { ico: '🔮' }
};