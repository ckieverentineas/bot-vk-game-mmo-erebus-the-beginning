import { Corporation, Planet, Resource, User } from "@prisma/client";
import { Context, KeyboardBuilder } from "vk-io";
import prisma from "../module/prisma";
import { Send_Message_Universal } from "../fab/helper";
import { smile_list } from "../datacenter/icon_library";

async function User_Info(user: User) {
	const corp: Corporation | null = await prisma.corporation.findFirst({ where: { id: user.id_corporation } })
	const planet: Planet | null = await prisma.planet.findFirst({ where: { id_user: user.id } })
	const resource: Resource | null = await prisma.resource.findFirst({ where: { id_user: user.id } })
    let event_logger = `${smile_list.message.ico} Игрок [${smile_list.person.ico} ${user.name}] вы сейчас находитесь на планете [${smile_list.planet.ico} ${planet?.name}]\n\n${smile_list.card.ico} UID карты: ${user.id}\n🌐 Корпорация: ${user.id_corporation == 0? 'Не в корпорации' : corp?.name}\n${smile_list.gold.ico} Шекели: ${resource?.gold.toFixed(2)}\n${smile_list.iron.ico} Железо: ${resource?.iron.toFixed(2)}\n${smile_list.energy.ico} Энергия: ${resource?.energy.toFixed(2)}\n`
	const keyboard = new KeyboardBuilder()
	keyboard.callbackButton({ label: `${smile_list.person.ico} Персонаж`, payload: { command: 'person_menu' }, color: 'secondary' })
	.callbackButton({ label: `${smile_list.corporation.ico} Корпорация`, payload: { command: 'main_menu_corporation' }, color: 'secondary' }).row()
	.callbackButton({ label: `${smile_list.inventory.ico} Инвентарь`, payload: { command: 'planet_control_multi' }, color: 'secondary' })
	.callbackButton({ label: `${smile_list.storehouse.ico} Склад`, payload: { command: 'main_menu_corporation' }, color: 'secondary' }).row()
	.callbackButton({ label: `${smile_list.build.ico} Здания`, payload: { command: 'planet_control_multi' }, color: 'secondary' })
	.callbackButton({ label: `${smile_list.persons.ico} Команда`, payload: { command: 'planet_control_multi' }, color: 'secondary' }).row()
	.callbackButton({ label: '❌', payload: { command: 'main_menu_close' }, color: 'secondary' }).row()
	.callbackButton({ label: `${smile_list.message.ico} В чат`, payload: { command: 'main_menu_corporation' }, color: 'secondary' })
	.urlButton({ label: '🍻 Об игре', url: 'https://vk.com/@capital_galaxy-dobro-pozhalovat-v-mnogopolzovatelskuu-onlain-igru-s-ekonomi' }).row()
	.callbackButton({ label: `${smile_list.research.ico} Исследовать`, payload: { command: 'main_menu_corporation' }, color: 'secondary' }).row().inline().oneTime() 
	return [keyboard, event_logger]
}
export async function User_Menu_Show(context: Context, user: User) {
	const [keyboard, event_logger] = await User_Info(user)
	if (!keyboard || typeof keyboard === 'string') { return }
	await Send_Message_Universal(context.senderId, `${event_logger}`, keyboard)
	/*await context.send(`⌛ Погода сегодня солнечная, но вы теперь не на заводе, владете заводом.`,
		{ 	
			keyboard: Keyboard.builder()
			.callbackButton({ label: 'Посмотреть бизнес', payload: { command: 'main_menu', security: `${user.idvk}${user.name}` }, color: 'positive' }).oneTime().inline()
		}
	);*/
}

export async function Main_Menu(context: Context, user: User) {
	const [keyboard, event_logger] = await User_Info(user)
	if (!keyboard || typeof keyboard === 'string') { return }
	await Send_Message_Universal(context.peerId, `${event_logger}`, keyboard)
    //await vk.api.messages.edit({peer_id: context.peerId, conversation_message_id: context.conversationMessageId, message: `${event_logger}`, keyboard: keyboard/*, attachment: attached.toString()*/ })
}
export async function Main_Menu_Close(context: Context, user: User) {
	const keyboard = new KeyboardBuilder()
	keyboard.textButton({ label: 'КЛАВА', payload: { command: 'planet_control', stat: "health"  }, color: 'secondary' }).row().inline().oneTime() 
	await Send_Message_Universal(context.peerId, `❄ Сессия успешно завершена, ${user.name}, чтобы начать новую, напишите [клава] без квадратных скобочек`, keyboard)
	//await vk.api.messages.edit({peer_id: context.peerId, conversation_message_id: context.conversationMessageId, message: `❄ Сессия успешно завершена, ${user.name}, чтобы начать новую, напишите [клава] без квадратных скобочек`, keyboard: keyboard/*, attachment: attached.toString()*/ })
}