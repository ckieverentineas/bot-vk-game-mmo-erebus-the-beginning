type BuildKey = "mine" | "base" | "fabricator" | "cloning_station" | "turret" | "solar_panel";
// Определяем тип для стоимости
interface Cost {
    price: number;
    koef: number;
}

// Определяем тип для входных ресурсов
interface InputResource {
    income: number;
    koef: number;
    time: number;
}

// Определяем тип для хранения
interface Storage {
    count: number;
    limit: number;
    koef_limit: number;
}

// Определяем тип для требований
interface Requirement {
    people: {
        limit: number;
        koef: number;
    };
}

// Определяем тип для каждого элемента конфигурации
interface BuilderConfigItem {
    id: number;
    name: string;
    system_name: string;
    description: string;
    cost: {
        gold: Cost;
        iron: Cost;
    };
    input?: {
        [resource: string]: InputResource; // Входные ресурсы могут быть произвольными
    };
    storage?: { people: Storage }; // Хранение может быть опциональным
    require: Requirement;
}
export const builder_config: { [key in BuildKey]: BuilderConfigItem } = {
    "mine": {
        id: 1,
        name: "Шахта",
        system_name: "mine",
        description: "сооружения, необходимые для разработки ресурсов из недр планеты",
        cost: {
            gold: { price: 10, koef: 1.3 },
            iron: { price: 5, koef: 1 }
        },
        input: {
            coal: { income: 5, koef: 2, time: 3600000 },
            gold_ore: { income: 5, koef: 1.4, time: 3600000 },
            iron_ore: { income: 5, koef: 1.3, time: 3600000 },
            //gas: { name: "gas", income: 0.2, koef: 1.2, time: 3600000 },
            //oil: { name: "oil", income: 0.1, koef: 1.2, time: 3600000 },
            artefact: { income: 0.04, koef: 1.2, time: 3600000 },
            crystal_dirt: { income: 0.02, koef: 1.1, time: 3600000 },
            //uranium: { name: "uranium", income: 0.01, koef: 1, time: 3600000 },
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
    "base": {
        id: 2,
        name: "База",
        system_name: "base",
        description: "Универсальное бункерное сооружение, основа вашей колонии",
        cost: {
            gold: { price: 50, koef: 1.3 },
            iron: { price: 25, koef: 1.1 }
        },
        storage: {
            people: { count: 0, limit: 7, koef_limit: 0.66 },
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
    "fabricator": {
        id: 3,
        name: "Фабрикатор",
        system_name: "fabricator",
        description: "Универсальный 3D-принтер для обработки ресурсов и производства компонентов",
        cost: {
            gold: { price: 10, koef: 1.3 },
            iron: { price: 1, koef: 1.3 }
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
    "cloning_station": {
        id: 4,
        name: "Станция клонирования",
        system_name: "cloning_station",
        description: "сооружение для воскрешения, клонирования живых организмов",
        cost: {
            gold: { price: 75, koef: 1.3 },
            iron: { price: 1, koef: 1.1 }
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
    "turret": {
        id: 5,
        name: "Турель",
        system_name: "turret",
        description: "защитная установка для защиты базы",
        cost: {
            gold: { price: 1000, koef: 2 },
            iron: { price: 500, koef: 1.2 }
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
    "solar_panel": {
        id: 6,
        name: "Солнечная панель",
        system_name: "solar_panel",
        description: "Бесконечно создаёт энергию от солнца",
        cost: {
            gold: { price: 100000, koef: 1.3838 },
            iron: { price: 1000, koef: 1.3838 }
        },
        require: {
            people: { limit: 1, koef: 0.01 }
        }
    },
}
