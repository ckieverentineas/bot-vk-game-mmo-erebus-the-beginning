import { answerTimeLimit, timer_text } from "../../../";
import prisma from "../../prisma";
import { Context, Keyboard, KeyboardBuilder } from "vk-io";
import { Logger, Send_Message_Universal, Sleep } from "../../../module/fab/helper";
import { Printer_Person_Class, Selector_Person_Class, Selector_Person_Class_By_Name } from "../../../datacenter/person";
import { smile_list } from "../../../datacenter/icon_library";
import { Printer_Person_Stat_Info } from "../../../datacenter/character";
import { image_arrive_on_planet, image_evacuation, image_imposter_team, image_mothership, image_rubka, image_running_for_evacuation, image_sabbotash } from "../../../datacenter/image";

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
    await context.send(`✅ Для нормальной работы тебе нужно официальное приложение ВК или комп.\n💡 Когда клавиатуры нет, напишите команду [клава] без квадратных скобочек.\n\n ${smile_list.load.ico} загрузка истории, пожалуйста подождите пять секунд...`)
    await Sleep(5000)
    await Tutorial_Starting(context)
    //await Send_Message_Universal(chat_id, `⁉@id${save.idvk}(${save.name}) открывает свой бизнес по контракту UID: ${save.id}!`)
    //await User_Menu_Show(context, save)
}

export async function Tutorial_Starting(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.senderId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    console.log(`dd`)
    await Send_Message_Universal(context.senderId, ` ${smile_list.load.ico} Ты — член экипажа звездного крейсера "Эребус", последней надежды человечества на выживание.\n${smile_list.target.ico} Ваша миссия: колонизировать планету, известную как "Новая Эдем", в системе, где звезды светят ярче, чем когда-либо.\n${smile_list.message.ico} Но на пути к новой жизни вы сталкиваетесь с неведомым.`)
    await Sleep(5000)
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Отключить систему`, payload: { command: 'dialog', event: '0-0-1' }, color: 'secondary' }).row()
    .textButton({ label: `${smile_list.config.ico} Эвакуироваться`, payload: { command: 'dialog', event: '0-0-2' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer1 = await context.question(`${smile_list.load.ico} Корабль мчится сквозь космос, когда вдруг на экранах появляется сигнал тревоги. Неизвестный объект, похожий на гигантский черный кристалл, появляется из ниоткуда и начинает поглощать энергию вашего корабля. Вокруг вас раздаются крики команды, и вы понимаете, что это не просто случайность — это ловушка.\n
    \n•	${(await Selector_Person_Class_By_Name(person.name))?.name == 'Капитан' ? `Вы ${account.name} (Капитан)` : `Капитан (Саймон)`}: Храбрый и решительный, готовый на все ради спасения своей команды.\n• ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Пилот' ? `Вы ${account.name} (Пилот)` : `Первый офицер (Лиам)`}: Верный помощник, который всегда готов поддержать вас, но также и выражает сомнения в ваших решениях.\n• ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Инженер' ? `Вы ${account.name} (Инженер)` : `Инженер (Сара)`}: Гений, который может починить почти все, но ее страх перед неизвестным может стать проблемой.\n• ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Воин' ? `Вы ${account.name} (Воин)` : `Воин (Джек)`}: Опытный боец, готовый защищать команду любой ценой.\n• ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Исследователь' ? `Вы ${account.name} (Исследователь)` : `Исследователь (Эмили)`}: Охотник за тайнами, стремящийся разгадать загадки новой планеты.\n
    \n Что предпримите?\n• Попробовать отключить систему жизнеобеспечения, чтобы спасти энергию.\n• Собрать команду и эвакуироваться в спасательные капсулы.
    `, { keyboard: keyboard, attachment: image_mothership, answerTimeLimit })
    if (answer1.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer1.payload && answer1.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer1.payload.event)
    }
}

export async function Tutorial_Engine(context: Context, id_event: string) {
    const config: any = {
        '0-0-1': Tutorial_Starting_0_0_1,
        '0-0-2': Tutorial_Starting_0_0_2,
        '0-0-2-1': Tutorial_Starting_0_0_2_1,
        '0-0-2-2': Tutorial_Starting_0_0_2_2,
        '0-0-3': Tutorial_Starting_0_0_3,
        '0-0-4': Tutorial_Starting_0_0_4,
    }
    await config[id_event](context)
}
export async function Tutorial_Starting_0_0_1(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Эвакуироваться`, payload: { command: 'dialog', event: '0-0-2' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Инженер' ? `Вы отключили` : `Инженер (Сара) отключила `}систему обеспечения жизнедеятельности, но внезапно корабль начинает трястись, и все на борту понимают, что это не сработало. Взрывы сотрясают палубы, и контроль над кораблем теряется. Вам нужно быстро принимать решение! ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Пилот' ? `Вы переключаете ` : `Первый офицер (Лиам) переключает`} оставшиеся ресурсы энергии на защитные поля, поспешив к панели управления и вводя необходимые команды. Внезапно, экран начинает мигать, и вы слышите тревожные сигналы. Бортовой компьютер "Стелла-3000" сообщает всем о необходимости срочной эвакуации.`, {keyboard: keyboard, attachment: image_rubka, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}

export async function Tutorial_Starting_0_0_2(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Сразить предателя`, payload: { command: 'dialog', event: '0-0-2-1' }, color: 'secondary' }).row()
    .textButton({ label: `${smile_list.config.ico} Поговорить`, payload: { command: 'dialog', event: '0-0-2-2' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} в суматохе эвакуирования экипажа один из членов экипажа пытается саботировать процесс. Вам нужно решить, как с ним поступить. ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Воин' ? `Вы` : `Воин (Джек)`} предлагает устранить предателя, в то время как ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Исследователь' ? `Вы  настаиваете` : `Исследователь (Эмили) настаивает`} на том, чтобы попытаться понять его мотивы.`, {keyboard: keyboard, attachment: image_sabbotash, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}

export async function Tutorial_Starting_0_0_2_1(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog', event: '0-0-3' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} Разобравшись с предателем, вы отправились в спасательную капсулу...`, {keyboard: keyboard, attachment: image_running_for_evacuation, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}

export async function Tutorial_Starting_0_0_2_2(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog', event: '0-0-3' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} Вы попытались вступить с ним в контакт, но "засланный казачок" тут же показал свое истинное лицо, трансформировавшись в зловещую тень, полную агрессии и ненависти. Его глаза сверкнули красным светом, а тело стало покрыто черной броней, словно он был создан из самой тьмы. Вы понимаете, что это не просто член экипажа, а нечто гораздо более опасное. Вокруг вас раздаются крики команды, и вы осознаете, что время на раздумья уходит. Вся команда, стоя рядом, готовится к бою, кто-то из команды, в ужасе, пытается найти укрытие... со всех шелей шлюзов появляются его дружки. \n\nВдруг, согласно протоколу, бортовой компьютер "Стелла-3000" активирует выдвижные турели, скрытые в стенах корабля. С металлическим скрежетом и глухими ударами они вырываются на поверхность, готовые к бою. Турели начинают обстреливать зловещую тень и ее приспешников, выпуская мощные очереди энергии, которые разрывают воздух. С каждой секундой ситуация становится все более критической. Турели, на последних каплях энергии, устраивают настоящую мясорубку, снося врагов с ног и заставляя их отступать. Яркие вспышки света и глухие удары сливаются в хаосе, когда команда понимает, что это их единственный шанс на спасение.\n\n"Бежим к капсулам!" — кричит Лиам, и команда, не раздумывая, бросается к спасательным капсулам. Вы чувствуете, как адреналин зашкаливает, и, оглядываясь, видите, как турели продолжают сражаться, отстреливая врагов, но их энергия истощается. Вы и ваша команда, преодолевая страх, мчитесь к капсулам, слыша за спиной гул сражения. Ваша цель — выжить и покинуть этот ад, прежде чем зловещая тень и ее приспешники окончательно захватят корабль. Ваша жизнь теперь зависит от скорости и решимости.\n\nС последним усилием вы запрыгиваете в капсулу, и двери закрываются за вами с глухим щелчком. Внутри капсулы вы видите, как система запуска начинает активироваться, и вы понимаете, что это только начало вашего нового, опасного приключения.`, {keyboard: keyboard, attachment: image_imposter_team, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}

export async function Tutorial_Starting_0_0_3(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog', event: '0-0-4' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} Капсула вырывается в открытый космос, и вы ощущаете, как гравитация планеты притягивает вас к себе. Внутри капсулы вы видите, как метеоритный дождь обрушивается на поверхность, и в этот момент понимаете, что планета не просто новая колония — это арена, полная опасностей и тайн. ${(await Selector_Person_Class_By_Name(person.name))?.name == 'Инженер' ? `Вы предлагаете` : `Инженер (Сара) предлагает`}  использовать свои инженерные навыки, чтобы улучшить капсулу для приземления. После улучшений внутри капсулы обнаруживается старая запись, оставленная предыдущей экспедицией. На ней звучит дрожащий голос, полон страха и тревоги. "Мы не одни на этой планете," — говорит голос. "Здесь обитают существа, которые могут манипулировать разумом и эмоциями. Они могут принимать облик тех, кого вы знаете, и использовать ваши страхи против вас."\n\nЗапись продолжает: "Мы столкнулись с ними, когда начали исследовать эту землю. Они могут вызывать видения, заставляя вас сомневаться в своих товарищах. Не доверяйте никому, кроме себя. Если вы почувствуете, что кто-то из вашей команды ведет себя странно, действуйте быстро. Они могут быть среди вас."\n\nВы чувствуете, как холодок пробегает по спине. Это предупреждение заставляет вас задуматься о том, что вы не только должны выжить, но и быть на чеку, чтобы не стать жертвой манипуляций этих существ.\n${(await Selector_Person_Class_By_Name(person.name))?.name == 'Инженер' ? `Вы шепчече` : `Инженер (Сара) сидящая рядом, шепчет`}: "Мы должны быть осторожны. Если они могут принимать облик людей, нам нужно разработать план, чтобы выявить их."\n\nТеперь, когда вы знаете, что на планете могут быть враги, скрывающиеся под маской друзей, вы понимаете, что доверие — это роскошь, которую вы не можете себе позволить. Ваша команда должна быть сплоченной, но в то же время настороженной, чтобы не попасть в ловушку.`, {keyboard: keyboard, attachment: image_evacuation, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}

export async function Tutorial_Starting_0_0_4(context: Context) {
    const account = await prisma.user.findFirst({ where: { idvk: context.peerId } })
    if (!account) { return }
    const person = await prisma.person.findFirst({ where: { id_user: account.id } })
    if (!person) { return }
    const keyboard = new KeyboardBuilder()
    .textButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog', event: '0-0-5' }, color: 'secondary' }).row()
    .oneTime().inline()
    const answer = await context.question(`${smile_list.load.ico} С глухим ударом капсула врезается в землю, и вы открываете люк. Перед вами раскинулась дикая, неведомая природа, полная загадок и опасностей. Растения, светящиеся в темноте, излучают таинственный свет, словно сами звезды спустились с небес, чтобы осветить этот незнакомый мир. В воздухе витает запах чего-то древнего и опасного, смесь земли и разложения, которая вызывает у вас мурашки по коже.\nВдалеке слышен гул, который заставляет кровь стынуть в жилах — это не просто звук, а предвестие чего-то ужасного, что скрывается в тенях. Вы чувствуете, как ваше сердце бьется быстрее, а инстинкты подсказывают, что вы находитесь на грани чего-то великого и страшного.\n\nОкружающие вас растения могут быть как полезными, так и опасными. Некоторые из них, с яркими цветами и сочными плодами, манят вас, обещая ресурсы и пищу. Но другие, с шипами и ядовитыми листьями, кажутся готовыми напасть, если вы приблизитесь слишком близко. Вы замечаете странные символы на камнях, которые могут указывать на древнюю цивилизацию, оставившую свои следы в этом мире. Эти знаки, покрытые мхом и временем, шепчут о давно забытых тайнах и потерянных знаниях.\nВнезапно, из-за деревьев раздается треск, и вы видите, как что-то большое и темное движется в вашей стороне. Это может быть как дикая тварь, так и нечто более зловещее. Ваша команда, осознавая опасность, начинает собираться, готовясь к возможной атаке.\n\n"Мы должны быть осторожны," — говорит Лиам, его голос полон решимости. "Эта планета полна тайн, и нам нужно выяснить, что здесь происходит, прежде чем делать следующий шаг."\nВы понимаете, что это не просто новое начало — это испытание, которое проверит вашу команду на прочность. Ваша судьба теперь зависит от того, сможете ли вы разгадать загадки этого мира и выжить в условиях, полных опасностей и неизвестности...`, {keyboard: keyboard, attachment: image_arrive_on_planet, answerTimeLimit })
    if (answer.isTimeout) { return await context.send(`⏰ Время вышло, малец! Ты не успел ввести имя, и теперь у нас для тебя плохие новости!`) }
    if (answer.payload && answer.payload.command == 'dialog') { 
        await Tutorial_Engine(context, answer.payload.event)
    }
}