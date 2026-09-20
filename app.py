from flask import Flask, render_template, request
from keisan import doryokutiyosou
from keisan import hpyosou
from keisan import kaihukuryouyosou
from pokemon_data import get_hp_stat
from pokemon_data import get_attack_stat
from pokemon_name import pokemon_dict
from fractions import Fraction

app = Flask(__name__)

@app.route("/")
def index():
    return render_template(
        "index.html",
        pokemon_names=list(pokemon_dict.keys())
    )


@app.route("/calculate/doryokuti", methods=["POST"])
def calculate_doryokuti():
    pokemon_name = request.form["pokemonName"]
    hpwariaimae = int(request.form["beforeHP"])
    hpwariaiato = int(request.form["afterHP"])
    nokorihp = int(request.form["nokoriHP"])
    
    hshuzokuti = get_hp_stat(pokemon_name)

    result = doryokutiyosou(
        hshuzokuti,
        hpwariaimae,
        hpwariaiato,
        nokorihp
    )
    print("努力値候補: ", result)
    return str(result)


@app.route("/calculate/hp", methods=["POST"])
def calculate_hp():
    pokemon_name = request.form["pokemonName2"]
    hdoryokuti = int(request.form["hdoryokuti"])
    hpwariai = int(request.form["hpwariai"])
    
    hshuzokuti = get_hp_stat(pokemon_name)
    
    result = hpyosou(
        hshuzokuti,
        hdoryokuti,
        hpwariai
    )
    print("残りHP:", result)
    return str(result)


@app.route("/calculate/kaihukuryou", methods=["POST"])
def calculate_kaihukuryou():
    pokemon_name = request.form["pokemonName3"]
    adoryokuti = int(request.form["adoryokuti"])
    ahosei = float(request.form["ahosei"])
    aranku = Fraction(request.form["aranku"])
    
    ashuzokuti = get_attack_stat(pokemon_name)
    
    result = kaihukuryouyosou(
        ashuzokuti,
        adoryokuti,
        ahosei,
        aranku
    )
    print("回復量:", result)
    return str(result)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/robots.txt")
def robots():
    return """User-agent: *
Allow: /
"""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
