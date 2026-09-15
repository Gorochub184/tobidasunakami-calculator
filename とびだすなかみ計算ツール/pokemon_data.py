import requests

from pokemon_name import pokemon_dict


def get_base_stat(name, stat_index):

    english_name = pokemon_dict[name]

    url = f"https://pokeapi.co/api/v2/pokemon/{english_name}"

    data = requests.get(url).json()

    stat = data["stats"][stat_index]["base_stat"]

    return stat


def get_hp_stat(name):

    return get_base_stat(name, 0)


def get_attack_stat(name):

    return get_base_stat(name, 1)