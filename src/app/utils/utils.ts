import { ElementRef } from '@angular/core';
import { read, utils, WorkBook, WorkSheet } from 'xlsx';

export class Utils {

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

    static uploadConfig(event: any): FileReader {
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(selectedFile, "UTF-8");
        return fileReader;
    }

    static async uploadFile(event: any) {
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

    static _getHyperLink(cellsWithHyperlinks: any[], data: any): any {
        let obj: any = {};
        Object.keys(data).forEach((key: string) => {
            const cell: any = cellsWithHyperlinks.find((c: any) => c.v === data[key]);
            if(cell) {
                obj[`${key}_hyperlink`] = cell.l.Target;
            }
        })
        return obj;
    }

    static cleanInput(input: ElementRef | undefined) {
		if(input) {
			input.nativeElement.value = null;
		}
	}
}