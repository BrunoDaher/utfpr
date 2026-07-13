 
    interface MenuItem {
        readonly id: number; // apenas leitura
        name: string;
        price: number;
    }

 

    interface Beverage extends MenuItem {
        sizeMl: number;
        hasCaffeine?: boolean; // propriedade opcional
    }

    /*
     defina um Type Alias chamado NutritionalData contendo as propriedades calories (number) e vegan (boolean).
    */

    type NutritionalData = {
        calories: number;
        vegan: boolean;
    }

    /*
    Crie um novo Type Alias chamado Dessert que faz a interseção (utilizando o operador &) entre a interface MenuItem e o type NutritionalData.
    */

    type Dessert = MenuItem & NutritionalData;