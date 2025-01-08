import { smile_list } from "./icon_library";

export const person_stat_info = [
    { id: 1, smile: `${smile_list.strength.ico}`, name: 'Сила', description: 'Определяет физическую мощь персонажа и его способность наносить урон в бою.', system_name: 'strength' },
    { id: 2, smile: `${smile_list.endurance.ico}`, name: 'Выносливость', description: 'Отражает уровень физической выносливости и устойчивости к повреждениям.', system_name: 'endurance' },
    { id: 3, smile: `${smile_list.health.ico}`, name: 'Здоровье', description: 'Общее состояние здоровья персонажа, определяющее его жизненные силы.', system_name: 'health' },
    { id: 4, smile: `${smile_list.erudition.ico}`, name: 'Эрудиция', description: 'Уровень знаний персонажа, влияющий на его способность решать головоломки и использовать технологии.', system_name: 'erudition' },
    { id: 5, smile: `${smile_list.charisma.ico}`, name: 'Харизма', description: 'Способность персонажа влиять на других, улучшать отношения и вести переговоры.', system_name: 'charisma' },
    { id: 6, smile: `${smile_list.synchronization.ico}`, name: 'Синхронизация', description: 'Способность взаимодействовать с технологиями и окружающей средой.', system_name: 'synchronization' },
    { id: 7, smile: `${smile_list.karma.ico}`, name: 'Карма', description: 'Отражает моральные выборы персонажа и их влияние на мир вокруг.', system_name: 'karma' },
    { id: 8, smile: `${smile_list.intuition.ico}`, name: 'Интуиция', description: 'Способность предчувствовать опасности и находить скрытые пути.', system_name: 'intuition' },
    { id: 9, smile: `${smile_list.psyche.ico}`, name: 'Психика', description: 'Подчеркивает ментальное состояние и устойчивость к психологическим атакам', system_name: 'resilience' },
    { id: 10, smile: `${smile_list.stealth.ico}`, name: 'Скрытность', description: 'Способность оставаться незамеченным и проводить тайные операции.', system_name: 'stealth' }
];

export async function Printer_Person_Stat_Info(): Promise<string> {
    return person_stat_info.map(stat => `${stat.smile} ${stat.name}: ${stat.description}`).join('\n');
}