class User { 
    name: string;
    shif: number;

    constructor(name:string, shif: number){
        this.name = name;
        this.shif = shif;
    }
}

class Cola<T> {
    private elements: T[] = [];

    enter(elemento: T): void {
        this.elements.push(elemento);
    }
    
    leave(): T | null {
        return this.elements.shift() ?? null;
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    getAll(): T[] {
        return [...this.elements];
    }
    
}
 
class UserSopport {
    private colaUsers = new Cola<User>();
    private currentShif: number = 1;

    registerUser(nombre: string): User {
        const user = new User(nombre, this.currentShif);
        this.colaUsers.enter(user);
        this.currentShif++;
        return user;
    }

    nextUser(): User | null {
        return this.colaUsers.leave();
    }

    waiting(): User[] {
        return this.colaUsers.getAll();
    }
}

// Ejemplo 

const soporte = new UserSopport();

const usuario1 = soporte.registerUser("Felipe");
const usuario2 = soporte.registerUser("Ana");
const usuario3 = soporte.registerUser("Maria")
const usuario4 = soporte.registerUser("Diego")

console.log("Usuarios en espera:");
soporte.waiting().forEach(u =>
    console.log(`- ${u.name} (Turno ${u.shif})`)
);

const treated = soporte.nextUser();
if (treated) {
    console.log(`Atendiendo a ${treated.name}, turno numero ${treated.shif}`);
}