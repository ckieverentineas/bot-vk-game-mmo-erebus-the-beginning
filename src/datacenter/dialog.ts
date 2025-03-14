import { KeyboardBuilder } from "vk-io";
import { smile_list } from "./icon_library";

export interface DialogElement {
    text: string;
    keyboard: KeyboardBuilder;
    image: string,
    event: string | null;
}

// Определяем тип для объекта dialog_engine
export interface DialogEngine {
    [key: string]: DialogElement;
}

export const dialog_engine: DialogEngine = {
    '0': { 
        text: `${smile_list.load.ico} Ты — член экипажа звездного крейсера "Эребус", последней надежды человечества на выживание.\n${smile_list.target.ico} Ваша миссия: колонизировать планету, известную как "Новая Эдем", в системе, где звезды светят ярче, чем когда-либо.\n${smile_list.message.ico} Но на пути к новой жизни вы сталкиваетесь с неведомым.\n\n${smile_list.load.ico} Корабль мчится сквозь космос, когда вдруг на экранах появляется сигнал тревоги. Неизвестный объект, похожий на гигантский черный кристалл, появляется из ниоткуда и начинает поглощать энергию вашего корабля. Вокруг вас раздаются крики команды, и вы понимаете, что это не просто случайность — это ловушка.\n\n•	Капитан (Саймон): Храбрый и решительный, готовый на все ради спасения своей команды.\n• Первый офицер (Лиам): Верный помощник, который всегда готов поддержать вас, но также и выражает сомнения в ваших решениях.\n• Инженер (Сара): Гений, который может починить почти все, но ее страх перед неизвестным может стать проблемой.\n• Воин (Джек): Опытный боец, готовый защищать команду любой ценой.\n• Исследователь (Эмили): Охотник за тайнами, стремящийся разгадать загадки новой планеты.\n\n Что предпримите?\n• Попробовать отключить систему жизнеобеспечения, чтобы спасти энергию.\n• Собрать команду и эвакуироваться в спасательные капсулы.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Отключить систему`, payload: { command: 'dialog_engine', id_event: '1' }, color: 'secondary' }).row()
        .callbackButton({ label: `${smile_list.config.ico} Эвакуироваться`, payload: { command: 'dialog_engine', id_event: '2' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240638',
        event: null
    },
    '1': { 
        text: `${smile_list.load.ico} Инженер (Сара) отключила систему обеспечения жизнедеятельности, но внезапно корабль начинает трястись, и все на борту понимают, что это не сработало. Взрывы сотрясают палубы, и контроль над кораблем теряется. Вам нужно быстро принимать решение! Первый офицер (Лиам) переключает оставшиеся ресурсы энергии на защитные поля, поспешив к панели управления и вводя необходимые команды. Внезапно, экран начинает мигать, и вы слышите тревожные сигналы. Бортовой компьютер "Стелла-3000" сообщает всем о необходимости срочной эвакуации.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Эвакуироваться`, payload: { command: 'dialog_engine', id_event: '2' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240639',
        event: null
    },
    '2': { 
        text: `${smile_list.load.ico} в суматохе эвакуирования экипажа один из членов экипажа пытается саботировать процесс. Вам нужно решить, как с ним поступить. Воин (Джек) предлагает устранить предателя, в то время как Исследователь (Эмили) настаивает на том, чтобы попытаться понять его мотивы.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Сразить предателя`, payload: { command: 'dialog_engine', id_event: '3' }, color: 'secondary' }).row()
        .callbackButton({ label: `${smile_list.config.ico} Поговорить`, payload: { command: 'dialog_engine', id_event: '4' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240644',
        event: null
    },
    '3': { 
        text: `${smile_list.load.ico} Разобравшись с предателем, вы отправились в спасательную капсулу...`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog_engine', id_event: '5' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240643',
        event: null
    },
    '4': { 
        text: `${smile_list.load.ico} Вы попытались вступить в контакт, но "засланный казачок" мгновенно трансформировался в зловещую тень, полную агрессии. Его глаза сверкнули красным, а тело покрылось черной броней. Вокруг раздаются крики команды, и вы осознаете, что время на раздумья уходит. Со всех шлейфов шлюзов появляются его приспешники.\n\nВдруг бортовой компьютер "Стелла-3000" активирует скрытые турели. С металлическим скрежетом они вырываются на поверхность и начинают обстреливать врагов мощными очередями энергии. Ситуация становится критической: турели, на последних каплях энергии, устраивают настоящую мясорубку, заставляя противников отступать.\n\n"Бежим к капсулам!" — кричит Лиам. Команда, преодолевая страх, мчится к спасательным капсулам, слыша за спиной гул сражения. Ваша жизнь теперь зависит от скорости и решимости.\n\nС последним усилием вы запрыгиваете в капсулу, и двери закрываются с глухим щелчком. Система запуска активируется, и вы понимаете, что это только начало вашего опасного приключения.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog_engine', id_event: '5' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240642',
        event: null
    },
    '5': { 
        text: `${smile_list.load.ico} Капсула вырывается в открытый космос, и гравитация планеты притягивает вас к себе. Метеоритный дождь обрушивается на поверхность, и вы осознаете, что эта планета — арена, полная опасностей. Инженер (Сара) предлагает улучшить капсулу перед приземлением.\n\nПосле доработок вы находите старую запись предыдущей экспедиции. Дрожащий голос предупреждает: "Мы не одни. Здесь существа, манипулирующие разумом, принимающие облик знакомых. Не доверяйте никому."\n\nХолодок пробегает по спине. Инженер (Сара) сидящая рядом, шепчет: "Мы должны быть осторожны. Если они могут принимать облик людей, нам нужен план."\n\nТеперь, зная о скрытых врагах, ваша команда должна быть сплоченной и настороженной, чтобы не попасть в ловушку.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog_engine', id_event: '6' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240641',
        event: null
    },
    '6': { 
        text: `${smile_list.load.ico} С глухим ударом капсула врезается в землю, и вы открываете люк. Перед вами раскинулась дикая природа, полная загадок и опасностей. Светящиеся растения излучают таинственный свет, а воздух наполняет запах древности и разложения.\n\nВдалеке слышен зловещий гул, предвестие чего-то ужасного. Ваше сердце колотится, инстинкты подсказывают, что вы на грани чего-то великого.\n\nОкружающие растения могут быть как полезными, так и смертоносными. Внезапно раздается треск, и вы видите огромного, но безобидного слизня, который, испугавшись, стремительно ускользает в кусты. Команда расслабляется, но бдительность не покидает вас.\n\n"Будьте осторожны," — говорит Лиам. "Эта планета полна тайн." Вы понимаете, что это испытание, которое проверит вашу команду на прочность. Ваша судьба зависит от того, сможете ли вы разгадать загадки этого мира и выжить в условиях, полных опасностей...`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Дальше`, payload: { command: 'dialog_engine', id_event: '7' }, color: 'secondary' }).row(),
        image: 'photo-207638246_457240640',
        event: 'event_generate_first_visit_planet'
    },
    '7': { 
        text: `${smile_list.load.ico} Внезапно на вашем запястье засиял браслет — портативный ИИ, активировавшийся в аварийном режиме. Его голос, холодный и механический, раздался в тишине: "Анализ окружающей среды завершен. Планета содержит высокую концентрацию ресурсов, но также и потенциальные угрозы."\n\nВы обводите взглядом дикие заросли, полные опасностей. "Рекомендуется разобрать спасательную капсулу на ресурсы для создания защитного оборудования и инструментов," — продолжает ИИ. "Это повысит ваши шансы на выживание."\n\nЭмили, сжимая кулаки, смотрит на вас и произносит: "Если мы не начнем действовать, эта планета нас поглотит."\n\n"Тогда разбираем капсулу," — решаете вы, и команда, полная решимости, приступает к работе. Металлические детали разлетаются в стороны, и вы чувствуете, как адреналин зашкаливает. Ваша судьба теперь зависит от того, насколько быстро и эффективно вы сможете подготовиться к неизведанным угрозам этого мира.`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Разбор капсулы`, payload: { command: 'dialog_engine', id_event: '8' }, color: 'primary' }).row(),
        image: 'photo-207638246_457240645',
        event: null
    },
    '8': { 
        text: `${smile_list.load.ico} Внезапно голос ИИ снова раздался, прерывая шум работы команды: Разбор спасательной капсулы завершен.\n\n"Эти ресурсы — ваша единственная надежда на выживание," — продолжал ИИ, его голос звучал как холодный ветер в пустыне. "Сейчас у вас есть возможность не только защитить себя, но и построить базу, которая станет вашим оплотом в этом враждебном мире."\n\nКоманда остановилась, осознавая, что теперь у них есть шанс не просто выжить, а взять судьбу в свои руки. "Это наш шанс," — произносите вы, чувствуя, как адреналин бурлит в крови. "Мы не просто будем защищаться — мы создадим свою крепость. Время действовать!"`,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Назад`, payload: { command: 'dialog_engine', id_event: '9' }, color: 'primary' }).row(),
        image: 'photo-207638246_457240646',
        event: 'event_destruct_escape_pod'
    },
    '9': { 
        text: ``,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Назад`, payload: { command: 'dialog_engine', id_event: '10' }, color: 'primary' }).row(),
        image: '',
        event: null
    },
    /*
    '7': { 
        text: ``,
        keyboard: new KeyboardBuilder().callbackButton({ label: `${smile_list.config.ico} Назад`, payload: { command: 'dialog_engine', id_event: '0-0' }, color: 'primary' }).row(),
        image: ''
    },*/
}