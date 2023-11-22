import { ElementRef } from '@angular/core';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';
import { COLUMNS } from '../models/report-headers.enum';

export class Utils {

    /**
     * Método para descargar un archivo
     * @param name 
     * @param data 
     * @param type 
     */
    static downLoadFile(name : string, data: any, type?: string) {
        let blob: Blob = new Blob([data]);
        if(type) {
            blob = new Blob([data], {type: type});
        }
        const url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.click();
    }

    /**
     * Método para subir un archivo json de configuración
     * @param event 
     * @returns 
     */
    static uploadConfig(event: any): FileReader {
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile, "UTF-8");
        return fileReader;
    }

    /**
     * Método para subir un archivo excel y convertirlo en datos en función del orden de las columnas (plantilla)
     * @param event 
     * @returns 
     */
    static async uploadFile(event: any) {
        const file: File = event.target.files[0];
        const fileData = await file.arrayBuffer();
        const workbook: WorkBook = read(fileData);
        const sheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
        return Utils._sheetToObject(sheet);
    }

    /**
     * Método para convertir una excel en json
     * @param sheet 
     * @returns 
     */
    static _sheetToObject(sheet: WorkSheet) {
        const charFirstRow: string = "1";
        const cells: string[] = Object.keys(sheet).filter((cell: string) => !cell.includes("!") && !Object.keys(COLUMNS).includes(cell));
        let obj: any = {};
        cells.forEach((cell: string) => {
            const cellLetter: string = this._getLetterFromCell(cell); //A
            const cellNumber: string = this._getNumberFromCell(cell); //2
            const property: string = COLUMNS[`${cellLetter}${charFirstRow}`];
            const value: string = sheet[cell].v;
            const hyperLink: string | undefined = sheet[cell].l?.Target;
            let newProperty: any = {};
            newProperty[property] = value;
            if(hyperLink) {
                newProperty[`${property}_hyperlink`] = hyperLink.replaceAll('amp;', '');
            }
            obj[cellNumber] = { ...obj[cellNumber], ...newProperty};
        });
        return Object.values(obj);
    }

    /**
     * Método para obtener la letra de una celda: A2 => A
     * @param cell 
     * @returns 
     */
    static _getLetterFromCell(cell: string) {
        return [...cell].filter((c: string) => isNaN(Number(c))).join('');
    }

    /**
     * Método para obtener el número de una celda: A2 => 2
     * @param cell 
     * @returns 
     */
    static _getNumberFromCell(cell: string) {
        return [...cell].filter((c: string) => !isNaN(Number(c))).join('');
    }

    /**
     * Método para limpiar el input de importar
     * @param input 
     */
    static cleanInput(input: ElementRef | undefined) {
		if(input) {
			input.nativeElement.value = null;
		}
	}

    /**
     * Método para convertir una excel en json sin tener en cuenta el orden de las columnas
     * @param event 
     * @returns 
     */
    static async uploadFileToJson(event: any) {
        const file: File = event.target.files[0];
        const fileData = await file.arrayBuffer();
        const workbook: WorkBook = read(fileData);
        let data: any = [];
        const sheets = workbook.SheetNames
        for (let i = 0; i < sheets.length; i++) {
            const sheet: WorkSheet = workbook.Sheets[workbook.SheetNames[i]];
            const cellsWithHyperlinks: any[] = Object.keys(sheet).map((cellName: string) => sheet[cellName]).filter((cell: any) => cell.l?.Target);
            const temp = utils.sheet_to_json(sheet)
            temp.forEach((res: any) => {
                data.push({...res, ...Utils._getHyperLink(cellsWithHyperlinks, res)});
            })
        }
        return data;
    }

    /**
     * Método para obtener el enlace de una celda
     * @param cellsWithHyperlinks 
     * @param data 
     * @returns 
     */
    static _getHyperLink(cellsWithHyperlinks: any[], data: any): any {
        let obj: any = {};
        Object.keys(data).forEach((key: string) => {
            const cell: any = cellsWithHyperlinks.find((c: any) => c.v === data[key]);
            if(cell?.l?.Target) {
                obj[`${key}_hyperlink`] = cell.l.Target.replaceAll('amp;', '');;
            }
        })
        return obj;
    }
}