import { smile_list } from "./icon_library";

export interface PersonClass {
    id: number;
    name: string;
    description: string;
    skill_active: string;
    skill_passive: string;
    strength: number;
    endurance: number;
    health: number;
    erudition: number;
    charisma: number;
    synchronization: number;
    karma: number;
    intuition: number;
    psyche: number;
    stealth: number;
}

export const person_class = [
    { 
        id: 1, 
        smile: '⚓',
        name: 'Капитан', 
        description: 'Лидер команды, обладающий стратегическим мышлением и способностью вдохновлять других.', 
        skill_active: 'Тактическое командование: увеличивает эффективность команды в бою.', 
        skill_passive: 'Моральный дух: повышает мораль команды, уменьшая вероятность паники.', 
        strength: 2,
        endurance: 4,
        health: 3,
        erudition: 3,
        charisma: 5,
        synchronization: 3,
        karma: 0,
        intuition: 2,
        psyche: 4,
        stealth: 1
    },
    { 
        id: 2, 
        smile: '🧭',
        name: 'Исследователь', 
        description: 'Охотник за тайнами, стремящийся разгадать загадки и находить редкие артефакты.', 
        skill_active: 'Чувство приключения: увеличивает шансы на нахождение редких ресурсов.', 
        skill_passive: 'Разгадыватель тайн: позволяет быстрее решать головоломки.', 
        strength: 1,
        endurance: 4,
        health: 3,
        erudition: 3,
        charisma: 2,
        synchronization: 3,
        karma: 0,
        intuition: 5,
        psyche: 2,
        stealth: 4
    },
    { 
        id: 3, 
        smile: '⚔️',
        name: 'Воин', 
        description: 'Опытный боец, специализирующийся на ближнем бою и защите своей команды.', 
        skill_active: 'Мощный удар: увеличивает урон от атак в ближнем бою.', 
        skill_passive: 'Защитник: увеличивает защиту союзников в радиусе действия.', 
        strength: 5,
        endurance: 4,
        health: 3,
        erudition: 1,
        charisma: 2,
        synchronization: 3,
        karma: 0,
        intuition: 3,
        psyche: 4,
        stealth: 2
    },
    { 
        id: 4, 
        smile: '🚀',
        name: 'Пилот', 
        description: 'Эксперт в управлении космическими кораблями, способный маневрировать в бою.', 
        skill_active: 'Мастер маневров: увеличивает скорость и маневренность корабля.', 
        skill_passive: 'Точный выстрел: увеличивает вероятность попадания вражеских кораблей.', 
        strength: 1,
        endurance: 2,
        health: 3,
        erudition: 3,
        charisma: 4,
        synchronization: 5,
        karma: 0,
        intuition: 4,
        psyche: 3,
        stealth: 2
    },
    { 
        id: 5, 
        smile: '🛠️',
        name: 'Инженер', 
        description: 'Гений технологий и ремонта, способный создавать уникальные устройства.', 
        skill_active: 'Создатель: позволяет создавать уникальные устройства и модификации.', 
        skill_passive: 'Мастер на все руки: увеличивает скорость ремонта и эффективность использования ресурсов.', 
        strength: 1,
        endurance: 4,
        health: 3,
        erudition: 5,
        charisma: 2,
        synchronization: 3,
        karma: 0,
        intuition: 4,
        psyche: 3,
        stealth: 2
    }
];
export async function Selector_Person_Class(id: number | string): Promise< PersonClass | undefined> {
    const person = person_class.find(button => button.id === Number(id));
    return person ? person : undefined;
}

// Функция для вывода информации о персонаже
export function Printer_Person_Class(id: number): string {
    const character = person_class.find(person => person.id === id);
    if (!character) {
        return `Персонаж с ID ${id} не найден.`;
    }

    return `
        ${character.smile} Класс: ${character.name}
        ${smile_list.message.ico} Описание: ${character.description}
        🎯 Активный навык: ${character.skill_active}
        🔒 Пассивный навык: ${character.skill_passive}
        ${smile_list.strength.ico} Сила: ${character.strength}
        ${smile_list.endurance.ico} Выносливость: ${character.endurance}
        ${smile_list.health.ico} Здоровье: ${character.health}
        ${smile_list.erudition.ico} Эрудиция: ${character.erudition}
        ${smile_list.charisma.ico} Харизма: ${character.charisma}
        ${smile_list.synchronization.ico} Синхронизация: ${character.synchronization}
        ${smile_list.karma.ico} Карма: ${character.karma}
        ${smile_list.intuition.ico} Интуиция: ${character.intuition}
        ${smile_list.psyche.ico} Психика: ${character.psyche}
        ${smile_list.stealth.ico} Скрытность: ${character.stealth}
    `;
}

export async function Selector_Person_Class_By_Name(name: string): Promise <PersonClass | undefined> {
    const character = person_class.find(person => person.name.toLowerCase() === name.toLowerCase());
    if (!character) {
        return undefined;
    }
    return  character ? character : undefined;
}