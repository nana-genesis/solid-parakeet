// Classe de abstração (classe base)
class Veiculo {
    constructor(marca, modelo, ano) {
        // Validação para garantir que a classe abstrata não seja instanciada diretamente
        if (this.constructor === Veiculo) {
            throw new Error("Classe abstrata Veiculo não pode ser instanciada diretamente");
        }
        
        this._marca = marca;
        this._modelo = modelo;
        this._ano = ano;
        this._ligado = false;
        this._velocidade = 0;
    }

    // Métodos abstratos (devem ser implementados pelas classes filhas)
    acelerar() {
        throw new Error("Método acelerar() deve ser implementado pela classe filha");
    }

    frear() {
        throw new Error("Método frear() deve ser implementado pela classe filha");
    }

    tipoVeiculo() {
        throw new Error("Método tipoVeiculo() deve ser implementado pela classe filha");
    }

    // Métodos concretos
    ligar() {
        this._ligado = true;
        console.log(`${this._marca} ${this._modelo} ligado`);
    }

    desligar() {
        if (this._velocidade > 0) {
            console.log("Não é possível desligar o veículo em movimento");
            return;
        }
        this._ligado = false;
        this._velocidade = 0;
        console.log(`${this._marca} ${this._modelo} desligado`);
    }

    getInfo() {
        return `${this._marca} ${this._modelo} (${this._ano}) - Velocidade: ${this._velocidade} km/h - ${this._ligado ? 'Ligado' : 'Desligado'}`;
    }

    // Getters e Setters
    get velocidade() {
        return this._velocidade;
    }

    get ligado() {
        return this._ligado;
    }
}

// Primeira classe herdeira
class Carro extends Veiculo {
    constructor(marca, modelo, ano, portas) {
        super(marca, modelo, ano);
        this._portas = portas;
        this._tipo = "Carro";
    }

    acelerar() {
        if (!this._ligado) {
            console.log("Ligue o carro primeiro");
            return;
        }
        
        if (this._velocidade < 180) {
            this._velocidade += 15;
            console.log(`Carro acelerando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Velocidade máxima atingida!");
        }
    }

    frear() {
        if (this._velocidade > 0) {
            this._velocidade -= 10;
            if (this._velocidade < 0) this._velocidade = 0;
            console.log(`Carro freando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Carro já está parado");
        }
    }

    tipoVeiculo() {
        return `Carro ${this._portas} portas`;
    }

    abrirPortaMalas() {
        if (!this._ligado || this._velocidade === 0) {
            console.log("Porta-malas aberto!");
        } else {
            console.log("Pare o carro antes de abrir o porta-malas");
        }
    }
}

// Segunda classe herdeira
class Moto extends Veiculo {
    constructor(marca, modelo, ano, cilindradas) {
        super(marca, modelo, ano);
        this._cilindradas = cilindradas;
        this._tipo = "Moto";
        this._capacete = false;
    }

    acelerar() {
        if (!this._ligado) {
            console.log("Ligue a moto primeiro");
            return;
        }
        
        if (this._velocidade < 200) {
            this._velocidade += 20;
            console.log(`Moto acelerando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Velocidade máxima atingida!");
        }
    }

    frear() {
        if (this._velocidade > 0) {
            this._velocidade -= 12;
            if (this._velocidade < 0) this._velocidade = 0;
            console.log(`Moto freando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Moto já está parada");
        }
    }

    tipoVeiculo() {
        return `Moto ${this._cilindradas}cc`;
    }

    colocarCapacete() {
        this._capacete = true;
        console.log("Capacete colocado!");
    }

    empinar() {
        if (this._ligado && this._velocidade > 20 && this._capacete) {
            console.log("🏍️ Empinando a moto!");
        } else if (!this._capacete) {
            console.log("Use capacete antes de fazer manobras!");
        } else {
            console.log("Acelere um pouco mais para empinar");
        }
    }
}

// Terceira classe herdeira (opcional, para demonstrar mais uma variação)
class Caminhao extends Veiculo {
    constructor(marca, modelo, ano, capacidadeCarga) {
        super(marca, modelo, ano);
        this._capacidadeCarga = capacidadeCarga;
        this._cargaAtual = 0;
        this._tipo = "Caminhão";
    }

    acelerar() {
        if (!this._ligado) {
            console.log("Ligue o caminhão primeiro");
            return;
        }
        
        let incremento = Math.max(5, 12 - Math.floor(this._cargaAtual / 1000));
        if (this._velocidade < 120) {
            this._velocidade += incremento;
            console.log(`Caminhão acelerando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Velocidade máxima atingida!");
        }
    }

    frear() {
        if (this._velocidade > 0) {
            let decremento = Math.min(8, 5 + Math.floor(this._cargaAtual / 2000));
            this._velocidade -= decremento;
            if (this._velocidade < 0) this._velocidade = 0;
            console.log(`Caminhão freando... Velocidade: ${this._velocidade} km/h`);
        } else {
            console.log("Caminhão já está parado");
        }
    }

    tipoVeiculo() {
        return `Caminhão - Capacidade: ${this._capacidadeCarga}kg`;
    }

    carregar(quantidade) {
        if (this._velocidade === 0) {
            if (this._cargaAtual + quantidade <= this._capacidadeCarga) {
                this._cargaAtual += quantidade;
                console.log(`Carregado ${quantidade}kg. Carga total: ${this._cargaAtual}kg`);
            } else {
                console.log("Capacidade máxima excedida!");
            }
        } else {
            console.log("Pare o caminhão para carregar");
        }
    }
}

// Demonstração de uso - Criando três instâncias
console.log("=== DEMONSTRAÇÃO DO SISTEMA DE VEÍCULOS ===\n");

// Primeira instância - Carro
console.log("1. Instanciando um Carro:");
const meuCarro = new Carro("Honda", "Civic", 2022, 4);
console.log(meuCarro.getInfo());
console.log(`Tipo: ${meuCarro.tipoVeiculo()}`);
meuCarro.ligar();
meuCarro.acelerar();
meuCarro.acelerar();
meuCarro.abrirPortaMalas();
meuCarro.frear();
meuCarro.desligar();
console.log();

// Segunda instância - Moto
console.log("2. Instanciando uma Moto:");
const minhaMoto = new Moto("Yamaha", "MT-07", 2023, 689);
console.log(minhaMoto.getInfo());
console.log(`Tipo: ${minhaMoto.tipoVeiculo()}`);
minhaMoto.ligar();
minhaMoto.colocarCapacete();
minhaMoto.acelerar();
minhaMoto.acelerar();
minhaMoto.empinar();
minhaMoto.frear();
minhaMoto.desligar();
console.log();

// Terceira instância - Caminhão
console.log("3. Instanciando um Caminhão:");
const meuCaminhao = new Caminhao("Volvo", "FH 540", 2021, 25000);
console.log(meuCaminhao.getInfo());
console.log(`Tipo: ${meuCaminhao.tipoVeiculo()}`);
meuCaminhao.ligar();
meuCaminhao.carregar(15000);
meuCaminhao.acelerar();
meuCaminhao.acelerar();
meuCaminhao.frear();
meuCaminhao.desligar();
console.log();

// Demonstração de polimorfismo
console.log("=== DEMONSTRAÇÃO DE POLIMORFISMO ===");
const frota = [meuCarro, minhaMoto, meuCaminhao];

frota.forEach(veiculo => {
    console.log(`\n${veiculo.tipoVeiculo()}:`);
    console.log(veiculo.getInfo());
});

// Tentativa de instanciar classe abstrata (vai gerar erro)
console.log("\n=== TENTATIVA DE INSTANCIAR CLASSE ABSTRATA ===");
try {
    const veiculoGenerico = new Veiculo("Genérico", "Modelo", 2020);
} catch (error) {
    console.log("Erro capturado:", error.message);
}

console.log("\n=== EXERCÍCIO CONCLUÍDO ===");
console.log("Classes criadas: Veiculo (abstrata), Carro, Moto, Caminhao (herdeiras)");
console.log("Instâncias criadas: 3 objetos de classes diferentes");