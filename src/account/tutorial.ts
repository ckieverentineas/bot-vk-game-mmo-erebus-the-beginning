import { answerTimeLimit, timer_text } from "..";
import prisma from "../module/prisma";
import { Context, Keyboard, KeyboardBuilder } from "vk-io";
import { Logger, Send_Message_Universal, /*Sleep*/ } from "../fab/helper";
import { Printer_Person_Class, Selector_Person_Class } from "../datacenter/person";
import { smile_list } from "../datacenter/icon_library";
import { Printer_Person_Stat_Info } from "../datacenter/character";
import { dialog_engine, DialogElement } from "../datacenter/dialog";
import { User } from "@prisma/client";
import { Printer_Blueprint, Selector_Blueprint_By_System_Name } from "../datacenter/blueprint";
import { Randomizer_Float } from "../fab/random";

export async function User_Register(context: Context) {
    const account_temp = { name: null, class: 1 }
    //согласие на обработку
	const answer = await context.question(`🚀 Добро пожаловать в многопользовательскую онлайн игру "Эребус: Начало"!\nПодтвердите свою готовность отправиться в захватывающее космическое приключение, где СИСТЕМА вынудит вас стать членом материнского корабля "Эребус"?`,
        {	
            keyboard: Keyboard.builder()
            .textButton({ label: '•	Да, я готов(а) к приключениям!', payload: { command: 'access' }, color: 'positive' }).row()
            .textButton({ label: '•	Нет, я передумал(а).', payload: { command: 'denied' }, color: 'negative' }).oneTime(),
            answerTimeLimit
        }
    );
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел подтвердить согласие, и теперь ты тоже в нашем списке. Пора прощаться!`); }
    if (answer.payload.command != 'access') {
        return await context.send('😔 Понимаю, космос может быть пугающим местом. Если ты когда-нибудь решишься на приключение, просто напиши "Начать", и я буду здесь, чтобы помочь тебе!');
    }
    // вывод информации по характеристикам
    await context.send(`${await Printer_Person_Stat_Info()}`)
    // выбор класса
    let person_show = true
    while (person_show) {
        const visit = await context.question(`🔥 Отлично! Давай создадим твоего персонажа!\n Давай определимся, кто ты, сейчас выбран класс [${(await Selector_Person_Class(account_temp.class))?.name}]:\n\n${await Printer_Person_Class(account_temp.class)}`,
            { 	
                keyboard: Keyboard.builder()
                .textButton({ label: `${smile_list['captain'].ico} Капитан`, payload: { command: 1 }, color: 'positive' }).row()
                .textButton({ label: `${smile_list['explorer'].ico} Исследователь`, payload: { command: 2 }, color: 'positive' }).row()
                .textButton({ label: `${smile_list['warrior'].ico} Воин`, payload: { command: 3 }, color: 'positive' }).row()
                .textButton({ label: `${smile_list['pilot'].ico} Пилот`, payload: { command: 4 }, color: 'positive' }).row()
                .textButton({ label: `${smile_list['engineer'].ico} Инженер`, payload: { command: 5 }, color: 'negative' }).row()
                .textButton({ label: `✅ Подтвердить`, payload: { command: 'success' }, color: 'negative' }).row()
                .oneTime().inline(),
                answerTimeLimit
            }
        );
        if (visit.isTimeout) { return await context.send(`⏰ Время ожидания активности истекло!`) }
        if (visit.payload.command == 'success') {
            person_show = false
        } else {
            account_temp.class = Number(visit.payload.command)
        }
    }
    while (!account_temp.name) {
        const name_in = await context.question( `${smile_list['attach'].ico} Введите свой никнейм до 32 символов`, timer_text)
        if (name_in.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
        if (name_in.text.length <= 64) {
            account_temp.name = name_in.text
            if (name_in.text.length > 32) { await context.send(`⚠ Твои ФИО не влезают в бланк (32 символа)! Можем использовать расширенный бланк, но за каждый лишний символ придется отдать 1₪.`) }
        } else { await context.send(`⛔ Твои ФИО не влезают в расширенный бланк (64 символа), и вообще, это под запретом по закону! Выплати штраф в 30₪, или люди в черном быстро разберутся с тобой.`) }
    }
    const class_sel = await Selector_Person_Class(account_temp.class)
    if (!class_sel) { return }
    const account = await prisma.user.create({ data: { idvk: context.senderId, name: account_temp.name } })
    const person = await prisma.person.create({ data: 
        { 
            id_user: account.id, 
            idvk: context.senderId,
            name:class_sel.name,
            strength: class_sel.strength,
            endurance: class_sel.endurance,
            endurance_current: class_sel.endurance,
            health: class_sel.health,
            health_current: class_sel.health,
            erudition: class_sel.erudition,
            charisma: class_sel.charisma,
            synchronization: class_sel.synchronization,
            karma: class_sel.karma,
            intuition: class_sel.intuition,
            psyche: class_sel.psyche,
            stealth: class_sel.stealth,
        }
    })
    await Logger(`(user registation) - success create account and person by @${person.id_user}`)
    
    //await Send_Message_Universal(chat_id, `⁉@id${save.idvk}(${save.name}) открывает свой бизнес по контракту UID: ${save.id}!`)
    await Send_Message_Universal(context.senderId, `✅ Для нормальной работы тебе нужно официальное приложение ВК или комп.\n💡 Когда клавиатуры нет, напишите команду [клава] без квадратных скобочек.`, new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} В приключения!`, payload: { command: 'dialog_engine', id_event: '0' }, color: 'secondary' }).row()
    .oneTime().inline())
    //await User_Menu_Show(context, save)
}

export async function Dialog_Engine(context: Context, user: User) {
    const id_dialog: string = context.eventPayload.id_event
    const dialog: DialogElement = dialog_engine[`${id_dialog}`]
    const config: { [event: string]: (context: Context, user: User) => Promise<string> } = {
        'event_generate_first_visit_planet': Event_Generate_First_Visit_Planet,
        'event_destruct_escape_pod': Event_Destruct_Escape_Pod,
        
    }
    if (dialog.event) {
        dialog.text += await config[dialog.event](context, user)
    }
    await Send_Message_Universal(context.peerId, dialog.text, dialog.keyboard, dialog.image)
}

async function Event_Generate_First_Visit_Planet(context: Context, user: User) {
    let event_logger = ''
    const mulmin = 5
    const mulmax = 3
    const planet_check = await prisma.planet.findFirst({ where: { id_user: user.id } })
    if (planet_check) { return '' }
    const planet_init = await prisma.planet.create({ data: { 
        id_user: user.id, name: "Новый Эдем", 
        coal: await Randomizer_Float(1000000*mulmin, 1000000*mulmin*mulmax), 
        //gas: await Randomizer_Float(50000*mulmin, 50000*mulmin*mulmax), 
        //oil: await Randomizer_Float(25000*mulmin, 25000*mulmin*mulmax), 
        //uranium: await Randomizer_Float(1000*mulmin, 1000*mulmin*mulmax),
        iron_ore: await Randomizer_Float(1000000*mulmin, 1000000*mulmin*mulmax),
        gold_ore: await Randomizer_Float(1000000*mulmin, 1000000*mulmin*mulmax),
        artefact: Math.floor(await Randomizer_Float(100*mulmin, 100*mulmin*mulmax)),
        //crystal: Math.floor(await Randomizer_Float(1, 25)),
    } })
    await Logger(`(generate_first_visit_planet succes) - got planet for research ~ by @${context.peerId}`)
    event_logger = `\n\n${smile_list.planet.ico} Обнаружена новая планета: ${planet_init.name}\n\n`
    return event_logger
}
async function Event_Destruct_Escape_Pod(context: Context, user: User) {
    // начисляем ресурсы с разбора спасательной капсулы
    const iron_default = 500
    const gold_default = 5000
    const energy_default = 10000
    const ammo_turret_default = 1000
    let event_logger = `Получены и найдены следующие предметы:\n\n`
    let resource_check = await prisma.resource.findFirst({ where: { id_user: user.id } })
    if (!resource_check) {
        resource_check = await prisma.resource.create({ data: { id_user: user.id, gold: gold_default, iron: iron_default, energy: energy_default } })
        if (!resource_check) { return `${event_logger}\n\n ${smile_list.warn.ico} Произошла ошибка инициализации хранилища ресурсов` }
        event_logger += `${smile_list.gold.ico} Шекель: х${gold_default}\n${smile_list.iron.ico} Железо: х${iron_default}\n${smile_list.energy.ico} Энергия: х${energy_default}\n`
    }
    let ammo_check = await prisma.ammo.findFirst({ where: { id_user: user.id } })
    if (!ammo_check) {
        ammo_check = await prisma.ammo.create({ data: { id_user: user.id, ammo_turret: ammo_turret_default } })
        if (!ammo_check) { return `${event_logger}\n\n ${smile_list.warn.ico} Произошла ошибка инициализации хранилища патронов` }
        event_logger += `${smile_list.ammo.ico} Патроны для Турели: х${ammo_turret_default}\n`
    }
    // добавляем игроку чертежи строительства
    const mine = await Selector_Blueprint_By_System_Name('mine')
    if (!mine) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [mine] не был найден` }
    const bp_mine_add = await prisma.blueprint.create({ data: { id_user: user.id, system_name: mine.system_name, type: mine.type, lvl: mine.lvl } })
    if (!bp_mine_add) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [mine] не был добавлен` }
    event_logger += await Printer_Blueprint('mine')

    const fabricator = await Selector_Blueprint_By_System_Name('fabricator')
    if (!fabricator) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [fabricator] не был найден` }
    const bp_fabricator_add = await prisma.blueprint.create({ data: { id_user: user.id, system_name: fabricator.system_name, type: fabricator.type, lvl: fabricator.lvl } })
    if (!bp_fabricator_add) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [fabricator] не был добавлен` }
    event_logger += await Printer_Blueprint('fabricator')

    const base = await Selector_Blueprint_By_System_Name('base')
    if (!base) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [base] не был найден` }
    const bp_base_add = await prisma.blueprint.create({ data: { id_user: user.id, system_name: base.system_name, type: base.type, lvl: base.lvl } })
    if (!bp_base_add) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [base] не был добавлен` }
    event_logger += await Printer_Blueprint('base')

    const turret = await Selector_Blueprint_By_System_Name('turret')
    if (!turret) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [turret] не был найден` }
    const bp_turret_add = await prisma.blueprint.create({ data: { id_user: user.id, system_name: turret.system_name, type: turret.type, lvl: turret.lvl } })
    if (!bp_turret_add) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [turret] не был добавлен` }
    event_logger += await Printer_Blueprint('turret')

    const cloning_station = await Selector_Blueprint_By_System_Name('cloning_station')
    if (!cloning_station) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [cloning_station] не был найден` }
    const bp_cloning_station_add = await prisma.blueprint.create({ data: { id_user: user.id, system_name: cloning_station.system_name, type: cloning_station.type, lvl: cloning_station.lvl } })
    if (!bp_cloning_station_add) { return `${event_logger}\n\n ${smile_list.warn.ico} чертеж [cloning_station] не был добавлен` }
    event_logger += await Printer_Blueprint('cloning_station')

    await Logger(`(destroyed escaped pod succes) - got resources and blueprints ~ by @${context.peerId}`)
    return event_logger
}

