import { answerTimeLimit, timer_text } from "../../../";
import prisma from "../../prisma";
import { Context, Keyboard, KeyboardBuilder } from "vk-io";
import { Logger, Send_Message_Universal, /*Sleep*/ } from "../../../module/fab/helper";
import { Printer_Person_Class, Selector_Person_Class } from "../../../datacenter/person";
import { smile_list } from "../../../datacenter/icon_library";
import { Printer_Person_Stat_Info } from "../../../datacenter/character";
import { dialog_engine, DialogElement } from "../../../datacenter/dialog";

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

export async function Dialog_Engine(context: Context) {
    const id_dialog: string = context.eventPayload.id_event
    const dialog: DialogElement = dialog_engine[`${id_dialog}`]
    await Send_Message_Universal(context.peerId, dialog.text, dialog.keyboard, dialog.image)
}