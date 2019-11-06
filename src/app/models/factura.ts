export interface Factura{
    _id: string,
    cliente: string,
    nit?:string,
    tel?:number,
    dir?:string,
    numero: string,
    fechaInicio: string,
    fechaFin: string,
    detalles: any[],
    desc: number
}