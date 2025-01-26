import { Person, User } from "@prisma/client"
import { smile_list } from "../datacenter/icon_library"
import prisma from "../module/prisma"
import { Context, KeyboardBuilder } from "vk-io"
import { Printer_Person_Self, Selector_Person_Class_By_Name } from "../datacenter/person"
import { Logger, Send_Message_Universal } from "../fab/helper"

export async function Person_Menu(context: Context, user: User) {
    const person_get: Person | null | undefined = await prisma.person.findFirst({ where: { id_user: user.id } })
    if (!person_get) { return }
    const person_class = await Selector_Person_Class_By_Name(person_get.name)
    const event_logger = `${smile_list.message.ico} Данные об игроке ${user.name} экипажа космического межгалактического материнского корабля "Эребус":\n\n${person_class?.smile} Класс: ${person_get.name}${await Printer_Person_Self(person_get)}`
    const keyboard = new KeyboardBuilder()
    .callbackButton({ label: '🚫', payload: { command: "main_menu" }, color: 'secondary' }).inline().oneTime()
    await Logger(`(person) - got person info for view ~ by @${context.peerId}`)
    await Send_Message_Universal(user.idvk, event_logger, keyboard)
}