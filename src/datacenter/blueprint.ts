import { builder_config } from "./builder";
import { smile_list } from "./icon_library";

export type BlueprintKey =
    "mine" |
    "base" |
    "fabricator" |
    "cloning_station" |
    "turret" |
    "solar_panel"

interface BlueprintConfigItem {
    id: number;
    name: string;
    system_name: string;
    lvl: number
    type: "build" | "upgrade";
}
export const blueprint_database: Array<BlueprintConfigItem> = [
    { id: 1, system_name: builder_config.mine.system_name, name: builder_config.mine.name, type: "build", lvl: 1 },
    { id: 2, system_name: builder_config.base.system_name, name: builder_config.base.name, type: "build", lvl: 1 },
    { id: 3, system_name: builder_config.fabricator.system_name, name: builder_config.fabricator.name, type: "build", lvl: 1 },
    { id: 4, system_name: builder_config.cloning_station.system_name, name: builder_config.cloning_station.name, type: "build", lvl: 1 },
    { id: 5, system_name: builder_config.turret.system_name, name: builder_config.turret.name, type: "build", lvl: 1 },
    { id: 6, system_name: builder_config.solar_panel.system_name, name: builder_config.solar_panel.name, type: "build", lvl: 1 },
];

export async function Selector_Blueprint_By_System_Name(name: string): Promise <BlueprintConfigItem | undefined> {
    const blueprint = blueprint_database.find(blueprint => blueprint.system_name.toLowerCase() === name.toLowerCase());
    if (!blueprint) {
        return undefined;
    }
    return  blueprint ? blueprint : undefined;
}

export async function Printer_Blueprint(system_name: BlueprintKey) {
    const blueprint = await Selector_Blueprint_By_System_Name(system_name)
    return `${smile_list.save.ico} Чертеж(B): ${blueprint?.name}-${blueprint?.lvl}: х1\n`
}