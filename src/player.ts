import { HearManager } from "@vk-io/hear";
import { chat_id, root, vk } from "./index";
import { IQuestionMessageContext } from "vk-io-question";
import prisma from "./module/prisma";
import { Corporation, User } from "@prisma/client";


export function registerUserRoutes(hearManager: HearManager<IQuestionMessageContext>): void {
    hearManager.hear(/!енотик/, async (context: any) => {
        if (context.senderId == root[0]) {
            await context.sendDocuments({ value: `./prisma/capital_galactic.db`, filename: `capital_galactic.db` }, { message: '💡 Открывать на сайте: https://sqliteonline.com/' } );
            await vk.api.messages.send({
                peer_id: Number(root[0]),
                random_id: 0,
                message: `‼ @id${context.senderId}(Admin) делает бекап баз данных capital_galactic.db.`
            })
        }
    })
    hearManager.hear(/!осмотреть|!Осмотреть/gm, async (context: any) => {
        if (context.forwards[0]?.senderId || context.replyMessage?.senderId) {
            const target = context.forwards[0]?.senderId || context.replyMessage?.senderId
            const user = await prisma.user.findFirst({ where: { idvk: target } })
            if (!user) { return }
            /*const counter_builder = await prisma.builder.count({ where: { id_user: user.id } })
            const counter_planet = await prisma.planet.count({ where: { id_user: user.id } })
            if (user) {
                const corp: Corporation | null = await prisma.corporation.findFirst({ where: { id: user.id_corporation } })
                //await context.send(`💬 Промышленный шпионаж показал, что это бизнес, ${user.name}:\n🌐 Корпорация: ${user.id_corporation == 0? 'Не в корпорации' : corp?.name}\n📈 Уровень: ${user.lvl}\n💰 Шекели: ${user.gold.toFixed(2)}\n⚡ Энергия: ${user.energy.toFixed(2)}\n${icotransl_list['iron'].smile} Железо: ${user.iron.toFixed(2)}\n⚒ Зданий: ${counter_builder}\n🌎 Планет: ${counter_planet}`)
            }*/
        }
        //console.log(context.forwards[0].senderId)
    })
    hearManager.hear(/!помощь|!Помощь/gm, async (context: any) => {
        await context.send(`💬 в данный момент доступны команды:\n~ [!осмотреть] -> пишется при пересыле на сообщение пользователя и позволяет через промышленный шпионаж узнать информацию о конкуренте\n~ [!передать х шекелей] -> команда для беседы, пишется при пересыле на сообщение пользователя и позволяет передавать другому игроку шекели, где х - количество шекелей, что спишутся с вашего счета\n~ [!стата] -> показывает топ-10 игроков в топе по добыче энергии\n~ [!основать корпорацию НАЗВАНИЕ] -> пишете !основать корпорацию и название ее следом\n~ [!вступить] -> пишется при пересыле на сообщение пользователя и позволяет вступить в корпорацию данного пользователя`)
        //console.log(context.forwards[0].senderId)
    })
    hearManager.hear(/!бан/, async (context) => {
        if (context.isOutbox == false && root.includes(String(context.senderId)) && context.text) {
            const target: number = Number(context.text.replace(/[^0-9]/g,"")) || 0
            if (target > 0) {
                const user: User | null = await prisma.user.findFirst({ where: { idvk: target } })
                if (user) {
                    const login = await prisma.user.update({ where: { id: user.id }, data: { status: "banned" } })
                    await context.send(`OK`)
                    await vk.api.messages.send({ peer_id: chat_id, random_id: 0, message: `☠ Для @id${login.idvk}(${login.name}) учетная запись приостановлена!`})
                    await vk.api.messages.send({ peer_id: login.idvk, random_id: 0, message: `☠ @id${login.idvk}(${login.name}) учетная запись приостановлена! Обращайтесь в тех поддержку: https://vk.com/fermatex`})
                    console.log(`Для @id${login.idvk}(${login.name}) учетная запись приостановлена!`)
                } else {
                    await context.send(`@id${target}(Пользователя) не существует`)
                    console.log(`@id${target}(Пользователя) не существует`)
                }
            }
        }
    })
    hearManager.hear(/!разбан/, async (context) => {
        if (context.isOutbox == false && root.includes(String(context.senderId)) && context.text) {
            const target: number = Number(context.text.replace(/[^0-9]/g,"")) || 0
            if (target > 0) {
                const user: User | null = await prisma.user.findFirst({ where: { idvk: target } })
                if (user) {
                    const login = await prisma.user.update({ where: { id: user.id }, data: { status: "player" } })
                    await context.send(`OK`)
                    await vk.api.messages.send({ peer_id: chat_id, random_id: 0, message: `✅ Для @id${login.idvk}(${login.name}) учетная запись возобновлена!`})
                    await vk.api.messages.send({ peer_id: login.idvk, random_id: 0, message: `✅ @id${login.idvk}(${login.name}) учетная запись возобновлена!`})
                    console.log(`Для @id${login.idvk}(${login.name}) учетная запись приостановлена!`)
                } else {
                    await context.send(`@id${target}(Пользователя) не существует`)
                    console.log(`@id${target}(Пользователя) не существует`)
                }
            }
        }
    })
    hearManager.hear(/!основать корпорацию/gm, async (context: any) => {
        const user: User | null = await prisma.user.findFirst({ where: { idvk: context.senderId } })
        if (user) {
            const corporation_check: Corporation | null = await prisma.corporation.findFirst({ where: { id: Number(user.id_corporation) } })
            if (corporation_check) {
                await context.send(`Вы уже состоите в корпорации ${corporation_check.name}`)
                return
            } else {
                const name_corp = context.text.replace('основать корпорацию ', '')
                if (name_corp.length < 3 || name_corp.length >= 100 ) { await context.send(`Длина названия корпорации не должна быть меньше 3 символов и больше 100 символов`); return }
                const name_check = await prisma.corporation.findFirst({ where: { name: name_corp } })
                if (name_check) { await context.send(`Корпорация с таким названием уже существует`); return }
                const corp = await prisma.corporation.create({ data: { name: name_corp, id_user: user.id }})
                if (corp) {
                    await prisma.user.update({ where: { id: user.id }, data: { id_corporation: corp.id}})
                    console.log(`Поздравляем с выходом на мировую арену новой корпорации: ${corp.name}`);
                    await context.send(`Поздравляем с выходом на мировую арену новой корпорации: ${corp.name}`)
                    await vk.api.messages.send({ peer_id: chat_id, random_id: 0, message: `Поздравляем с выходом на мировую арену новой корпорации: ${corp.name}` })
                }
            }
        }
    })
    hearManager.hear(/!вступить|!Вступить/gm, async (context: any) => {
        if ((context.forwards[0]?.senderId || context.replyMessage?.senderId) /*&& context.peerType == 'chat'*/) {
            let event_logger = ''
            const target = context.forwards[0]?.senderId || context.replyMessage?.senderId
            if (!target) { return }
            const user_from: User | null = await prisma.user.findFirst({ where: { idvk: context.senderId } })
            const user_to: User | null = await prisma.user.findFirst({ where: { idvk: target } })
            if ( !user_from || !user_to) { await context.send(`Вы или игрок не зарегестрированы!`); return }
            if ( user_from?.idvk == user_to?.idvk) { await context.send(`К самому себе второй смысла вступать нет!`); return }
            const corporation_check: Corporation | null = await prisma.corporation.findFirst({ where: { id: Number(user_from.id_corporation) } })
            if (corporation_check) {
                await context.send(`Вы уже состоите в корпорации ${corporation_check.name}`)
                return
            } else {
                const corporation_check_to: Corporation | null = await prisma.corporation.findFirst({ where: { id: Number(user_to.id_corporation) } })
                if (corporation_check_to && await prisma.user.count({ where: { id_corporation: user_to.id_corporation} }) < corporation_check_to.member ) {
                    await prisma.$transaction([
                        prisma.user.update({ where: { id: user_from.id }, data: { id_corporation: user_to.id_corporation } }),
                        prisma.user.findFirst({ where: { id: corporation_check_to.id_user } })
                    ]).then(([user_change_corp, owner]) => {
                        if (user_change_corp) {
                            event_logger += `Вы вступили в корпорацию ${corporation_check_to.name}`
                            console.log(`${user_from.idvk} вступил в корпорацию ${corporation_check_to.name}`);
                            vk.api.messages.send({ peer_id: owner!.idvk, random_id: 0, message: `@id${user_from.idvk}(${user_from.name}) вступает к вам в корпорацию!` })
                        }
                    })
                    .catch((error) => {
                        event_logger += `Ошибка при вступлении в корпорацию, попробуйте позже`
                        console.error(`Ошибка: ${error.message}`);
                    });
                } else {
                    await context.send(`В корпорации нет места для новых участников или игрок не состоит в корпорации!`)
                }
            }
            await context.send(`${event_logger}`)
        }
    })
}