import { builder_config } from "./builder";

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
export const blueprint_database: { [key in BlueprintKey]: BlueprintConfigItem } = {
    "mine": { id: 1, system_name: builder_config.mine.system_name, name: builder_config.mine.name, type: "build", lvl: 1 },
    "base": { id: 2, system_name: builder_config.base.system_name, name: builder_config.base.name, type: "build", lvl: 1 },
    "fabricator": { id: 3, system_name: builder_config.fabricator.system_name, name: builder_config.fabricator.name, type: "build", lvl: 1 },
    "cloning_station": { id: 4, system_name: builder_config.cloning_station.system_name, name: builder_config.cloning_station.name, type: "build", lvl: 1 },
    "turret": { id: 5, system_name: builder_config.turret.system_name, name: builder_config.turret.name, type: "build", lvl: 1 },
    "solar_panel": { id: 6, system_name: builder_config.solar_panel.system_name, name: builder_config.solar_panel.name, type: "build", lvl: 1 },
};