import { Person } from "@prisma/client";
import { smile_list } from "./icon_library";


export interface PersonClass {
    id: number;
    smile: string;
    name: string;
    system_name: string;
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

export const person_class: Array<PersonClass> = [
    { 
        id: 1, 
        smile: '⚓',
        name: 'Капитан', 
        system_name: 'captain',
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
        system_name: 'explorer',
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
        system_name: 'warrior',
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
        system_name: 'pilot',
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
        system_name: 'engineer',
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
export async function Printer_Person_Class(id: number): Promise<string> {
    const character = person_class.find(person => person.id === id);
    if (!character) {
        return `Персонаж с ID ${id} не найден.`;
    }

    return `
        ${character.smile} Класс: ${character.name}
        ${smile_list.message.ico} Описание: ${character.description}
        🎯 Активный навык: ${character.skill_active}
        🔒 Пассивный навык: ${character.skill_passive}
        ${smile_list.strength.ico} ${smile_list.strength.name}: ${character.strength}
        ${smile_list.endurance.ico} ${smile_list.endurance.name}: ${character.endurance}
        ${smile_list.health.ico} ${smile_list.health.name}: ${character.health}
        ${smile_list.erudition.ico} ${smile_list.erudition.name}: ${character.erudition}
        ${smile_list.charisma.ico} ${smile_list.charisma.name}: ${character.charisma}
        ${smile_list.synchronization.ico} ${smile_list.synchronization.name}: ${character.synchronization}
        ${smile_list.karma.ico} ${smile_list.karma.name}: ${character.karma}
        ${smile_list.intuition.ico} ${smile_list.intuition.name}: ${character.intuition}
        ${smile_list.psyche.ico} ${smile_list.psyche.name}: ${character.psyche}
        ${smile_list.stealth.ico} ${smile_list.stealth.name}: ${character.stealth}
    `;
}

export async function Printer_Person_Self(character: Person): Promise<string> {

    return `\n${smile_list.strength.ico} ${smile_list.strength.name}: ${character.strength}\n${smile_list.endurance.ico} ${smile_list.endurance.name}: ${character.endurance}\n${smile_list.health.ico} ${smile_list.health.name}: ${character.health}\n${smile_list.erudition.ico} ${smile_list.erudition.name}: ${character.erudition}\n${smile_list.charisma.ico} ${smile_list.charisma.name}: ${character.charisma}\n${smile_list.synchronization.ico} ${smile_list.synchronization.name}: ${character.synchronization}\n${smile_list.karma.ico} ${smile_list.karma.name}: ${character.karma}\n${smile_list.intuition.ico} ${smile_list.intuition.name}: ${character.intuition}\n${smile_list.psyche.ico} ${smile_list.psyche.name}: ${character.psyche}\n${smile_list.stealth.ico} ${smile_list.stealth.name}: ${character.stealth}
    `;
}

export async function Selector_Person_Class_By_Name(name: string): Promise <PersonClass | undefined> {
    const character = person_class.find(person => person.name.toLowerCase() === name.toLowerCase());
    if (!character) {
        return undefined;
    }
    return  character ? character : undefined;
}